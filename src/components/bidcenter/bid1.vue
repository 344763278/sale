<template>
<div>
    <div class="crumbs">
	<el-breadcrumb separator='>>' >
        <el-breadcrumb-item v-for="item in crumbs" :key="item.id">
            {{item.name}}
        </el-breadcrumb-item>
    </el-breadcrumb>
    </div>

	<!--工具条-->
    <div class="searchItem">
        <span class="searchTitle">竞价单号: </span>
        <el-select v-model="searchkeys.bid" placeholder="请选择">
            <el-option label="全部" value=""></el-option>
            <el-option v-for="item in orderList" :label="item.b_order_no" :value="item.bid" :key="item.bid"></el-option>
        </el-select>
    
            <el-button @click="search">搜索</el-button>
    </div>

	<el-table :data="dataList" stripe style="width: 100% ; min-height:300px">
        <el-table-column type="index" label="序号" width="80"></el-table-column>
	    <el-table-column prop="pbatch" label="批次号" width="200"></el-table-column>
	    <el-table-column prop="sdesc" label="sku" ></el-table-column>
        
        <el-table-column label="成色等级">
          <template slot-scope="scope" >
            <el-popover trigger="hover" placement="bottom" >
              <p>{{scope.row.ldesc}}</p>
              <div slot="reference" class="name-wrapper" >
                {{scope.row.lid}}
              </div>
               
            </el-popover>
            
          </template>
        </el-table-column>
   
	    <el-table-column prop="snum" label="供货量/台" ></el-table-column>
	    <el-table-column prop="bnum" label="数量/台" ></el-table-column>
	    <el-table-column prop="bprice" label="基准价" ></el-table-column>
	    <el-table-column prop="lrate" label="成色比例(%)" ></el-table-column>
	    <el-table-column  prop="price" label="单价/元" ></el-table-column>
        <el-table-column label="操作" >
            <template slot-scope="scope" >
                <div v-if="scope.row.status == 1">
                    <el-button class='indexFunBtn' type="primary" @click="getEditData(scope.$index)"  size="small">编辑</el-button>
                </div>
            </template>
        </el-table-column>
     
     
	</el-table>

    <!-- 编辑 -->
	<el-dialog title="编辑" :visible.sync="editDialog">
        <el-form  :model="handelEdit" ref="handelEdit" label-width="100">
            <el-form-item label="数量/台:" filterable prop='e_cate_id' >
                <el-input v-model="handelEdit.e_num" :disabled="true"  :maxlength='40' placeholder='数量/台' ></el-input>
            </el-form-item>
            <el-form-item label="基准价:"  prop='e_bprice'>
                <el-input v-model="handelEdit.e_bprice"  :maxlength='40' placeholder='基准价' v-on:change="change" ></el-input>
            </el-form-item>
            <el-form-item label="成色比例(%):"  prop='e_lrate'>
                <el-input v-model="handelEdit.e_lrate"  :maxlength='100'  placeholder='成色比例(100) : 90(90%)' v-on:change="change" ></el-input>
            </el-form-item>
            <el-form-item label="单价/元:"  prop='e_price'>
                <el-input v-model="handelEdit.e_price":maxlength='100'  placeholder='单价/元'></el-input>
            </el-form-item>
            <el-form-item class='submitRight'>
                <el-button type="primary" @click="submitnow('handelEdit')">确认</el-button>
                <el-button @click="cancelnow">取消</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
    
    
    <el-row class="bidbottom">
      <el-col :span="24">
        
        <div class="el-form-item">
            <label class="el-form-item__label">批次号：</label>
            <div class="el-form-item__content" style="display:inline-block;margin-right:1rem;">201709151001 <span class="desc">统货竞拍时同一批次只有全部报价才可成功参与竞拍！</span></div>
            
        </div>
        <div class="el-form-item">
            <div style="display:inline-block"><label class="el-form-item__label">已报：</label>
            <div class="el-form-item__content" style="display:inline-block"><span>{{orderinfo.mcount}}</span> 台</div>
            </div>
       
            <div style="display:inline-block;margin-left:3rem;"><label class="el-form-item__label">总价：</label>
            <div class="el-form-item__content" style="display:inline-block"><span>{{orderinfo.total}}</span> 元</div></div>
            
        </div>
        <div class="el-form-item">
            <label class="el-form-item__label">仍有：</label>
            <div class="el-form-item__content"><span>{{num}}</span> 台未报价</div>
        </div>

      </el-col>
    </el-row>
</div>
</template>
	

<script>
import api from '../../api/api'
import util from '../../common/util'
export default {
	data() {
		var validateName = (rule, value, callback) => {
            value = util.Trim(value)
            let len = value.gblen()
            if( len < 1|| len >40){
                callback(new Error('请输入40个以内字符'))
            }else if( util.checkSpecialWord(value)){
                callback(new Error('不能包含特殊字符'))
            }
            callback()
        }
        var validateDesc = (rule, value, callback) => {
            value = util.Trim(value)
            let len = value.gblen()
            if( len < 1|| len >100){
                callback(new Error('请输入100个以内字符'))
            }
            callback()
        }
	    return {
            crumbs:[],
            orderList:[],
            orderinfo:{
        		'order_no' : '',
    			'total' : 0,
    			'bcount' : 0,
    			'mcount' : 0,
        	},
            dataList:[],
	    	addDialog:false,
	    	editDialog:false,
        	searchkeys:{
        		"bid":'',
        	},
        	handelEdit:{
        		'e_num' : '',
    			'e_price' : '',
    			'e_bprice' : '',
    			'e_lrate' : ''
        	},
            
        	rules:{
        	// 	c_cate_id: [{  required: true,  message: '请选择所属分类'}],
            //     c_name: [{  required: true , validator: validateName, trigger: 'blur' }],
            //     c_desc: [{ required: true , validator: validateDesc, trigger: 'blur' }],
            // 
            //     e_cate_id: [{  required: true,  message: '请选择所属分类'}],
            //     e_name: [{  required: true , validator: validateName, trigger: 'blur' }],
            //     e_desc: [{ required: true , validator: validateDesc, trigger: 'blur' }]
            }
	    }
	},
    created() {
        const first = this.$route.matched.filter(item => item.name);
        for(let i in first){
            if ( first[i] && (first[i].name !== '首页' || first[i].path !== '') ){
                this.crumbs = this.crumbs.concat([{ id: i,name: first[i].name, path: first[i].path }]);
            }
        }
    },
	mounted() {
        // this.showList()
		this.loadInfo()
	},
    computed: {
        num: function () {
            return this.orderinfo.bcount - this.orderinfo.mcount
        }
    },
	methods:{
        change:function (value) {
            this.handelEdit.e_price =  Math.ceil(this.handelEdit.e_bprice * this.handelEdit.e_lrate / 100)
        },
        
	    //关联上级状态 如上层为禁用，下层全为禁用
	    relateFstatus:function(list){
	    	for(var i in list){
	    		if(list[i].cr_status != '1') list[i].Fstatus = '2',list[i].upStatus = true
	    	}
	    	return list
	    },
	    getEnableList:function(list){
	    	let Lists = []
	    	for(var i in list){
	    		if(list[i].Fstatus == '1') Lists.push(list[i])
	    	}
	    	return Lists
	    },
	    loadInfo:function(){
	    	api.orderList().then(res =>{
	    		if (res.ret != '0') {
                    this.$layer.msg(res.retinfo)
                    return
                }
                this.orderList = res.data.list
               // this.enableCateRoleList = this.getEnableList(res.data.list)
	    	})
	    },
		showList:function(){
			let data = {
		        "s_b_id": this.searchkeys.bid,
		        "s_order_no": this.searchkeys.bid >0 ? this.orderList.find(item => item.bid ===  this.searchkeys.bid)['b_order_no'] : '',
			}
			api.merBidList(data).then(res => {
				if (res.ret != '0') {
                    this.$layer.msg(res.retinfo)
                    return
                } else if( res.data.list == '' ){
                   this.$layer.msg('当前订单没有数据!')
                }
                
                // this.dataList = this.relateFstatus(res.data.list)
                this.dataList = res.data.list
                this.orderinfo = res.data.orderinfo
                
			})
            
		},
		//设置状态
		setStatus:function(id , status){
			let data = {
				"s_role_id":id,
        		"s_status": status == '1'?'2':'1'
			}
			api.changeRoleStatus(data).then(res => {
                if (res.ret != '0') {
                    this.$layer.msg(res.retinfo)
                    return
                }
                this.$layer.msg('成功！')
                this.showList()
            })
		},

		getEditData:function(index){
       
			let merbidinfo = this.dataList[index]
			this.handelEdit.e_num = String(merbidinfo.bnum)
			this.handelEdit.e_bmd_id = merbidinfo.bmdid
			this.handelEdit.e_bid = merbidinfo.bid
			this.handelEdit.e_pro_batch = merbidinfo.pbatch
			this.handelEdit.e_order_no = merbidinfo.orderno
			this.handelEdit.e_bprice = merbidinfo.bprice
			this.handelEdit.e_lrate = merbidinfo.lrate
			this.handelEdit.e_price = merbidinfo.price
            this.editDialog = true
            
            console.log(merbidinfo.bid)
            console.log(merbidinfo.bmdid)
            
		},
		search:function(){
			this.showList()
		},
		/*****  编辑  *****/ 
		submitnow:function(formName){
             // this.handelEdit.e_num = util.Trim(this.handelEdit.e_num)
             // this.handelEdit.e_bprice = util.Trim(this.handelEdit.e_bprice)
             // this.handelEdit.e_lrate = util.Trim(this.handelEdit.e_lrate)
             // this.handelEdit.e_price = util.Trim(this.handelEdit.e_price)
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    api.editBidPrice(this.handelEdit).then(res => {
                        if (res.ret != '0') {
                            this.$layer.msg(res.retinfo)
                            return
                        }
                        this.$layer.msg('成功！')
                        this.showList()
                        this.editDialog = false
                    })
                } else {
                    console.log('error submit!!')
                    return false;
                }
            })
        
		},
		cancelnow:function(id){
			this.addDialog = false
			this.editDialog = false
		}
	}


}
</script>
<style type="text/css">

	.pagination{text-align: right;margin: 20px 0}
	.tool{text-align: right;margin-bottom: 20px;}
    .crumbs .el-breadcrumb{
        font-size:1rem;
        padding:0.8rem 0;
        background-color:#1F2D3D;
    }
    .crumbs .el-breadcrumb span{
        color:#fff;
    }
    .searchItem{margin:1rem 0;display:block;width: 100%;}
    
    .bidbottom{ 
        <!-- position: fixed; -->
        bottom: 0;
        background: #f9f9f9;
        padding: 0.6rem;
        width: 100%;
        border-top: 1px solid #eef1f6; 
    }
    .bidbottom .el-form-item__content{ 
        font-size: 1.3rem;
    }
    .bidbottom .el-form-item__content span{ 
        font-size: 1.2rem;color:#ffc20d;
    }
    .bidbottom .el-form-item__content span.desc { 
        font-size: 0.8rem;
    }
    
    .bidbottom .el-form-item { 
        margin-bottom:0.2rem;
    }
    
</style>