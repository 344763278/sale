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
          <div class="setdate">
          竞拍时间 : 
          <el-date-picker  
           v-model="searchkeys.sdate"  
           type="date"  
           placeholder="选择开始日期"  
            prop="sdate"
            
           :picker-options="pickerobj0">  
         </el-date-picker> 
          <div class="line"></div>
         <el-date-picker  
          v-model="searchkeys.edate"  
          type="date"  
          placeholder="选择结束日期"  
          prop="edate"
 
          :picker-options="pickerobj1">  
        </el-date-picker>

           <div class="line"></div>

         <span class="searchTitle">竞拍类型：</span>
			<el-select v-model="searchkeys.bidtype" placeholder="请选择">
                <el-option label="全部" value=""></el-option>
                <el-option v-for="item in bidtype" :label="item.label" :value="item.value" :key="item.value"></el-option>
            </el-select>
         
           <div class="line"></div>

         <span class="searchTitle">竞拍结果：</span>
			<el-select v-model="searchkeys.status" placeholder="请选择">
                <el-option label="全部" value=""></el-option>
                <el-option v-for="item in status" :label="item.label" :value="item.value" :key="item.value"></el-option>
            </el-select>
            <el-button @click="search">搜索</el-button>
          </div>
			
		</div>

	
	<el-table :data="dataList" stripe style="width: 100% ; min-height:300px">
        <el-table-column type="index" label="序号" width="80"></el-table-column>
	    <el-table-column prop="stime" label="竞拍日期" width="200"></el-table-column>
	    <el-table-column prop="orderno" label="报价单号" ></el-table-column>
	    <el-table-column prop="orderno" label="商品批次号" ></el-table-column>
   
	    <el-table-column prop="bcount" label="供货量" ></el-table-column>
	    <el-table-column prop="mcount" label="竞拍量" ></el-table-column>
	    <el-table-column prop="total" label="报价总额" ></el-table-column>
	    <el-table-column prop="status" label="竞拍类型" ></el-table-column>
	    <el-table-column prop="status" label="竞拍结果" ></el-table-column>
        <el-table-column label="竞拍详情" >
            <template slot-scope="scope">
                <el-button type="primary" @click="hbDetail(scope.row)"  size="small">查看</el-button>
            </template>
        </el-table-column>
     
     
	</el-table>

    
	<div class="pagination">
	    <el-pagination
	      @size-change="handleSizeChange"
	      @current-change="handleCurrentChange"
	      :current-page="currentPage"
	      :page-sizes="[10, 20, 30, 40]"
	      :page-size="10"
	      layout="total, prev, pager, next, jumper"
	      :total="total">
	    </el-pagination>
	</div>
   
</div>
</template>
	

<script>
import api from '../../api/api'
import util from '../../common/util'
export default {
	data() {
		// var validateName = (rule, value, callback) => {
        //     value = util.Trim(value)
        //     let len = value.gblen()
        //     if( len < 1|| len >40){
        //         callback(new Error('请输入40个以内字符'))
        //     }else if( util.checkSpecialWord(value)){
        //         callback(new Error('不能包含特殊字符'))
        //     }
        //     callback()
        // }
        // var validateDesc = (rule, value, callback) => {
        //     value = util.Trim(value)
        //     let len = value.gblen()
        //     if( len < 1|| len >100){
        //         callback(new Error('请输入100个以内字符'))
        //     }
        //     callback()
        // }
	    return {
            crumbs:[],
            pickerobj0:{},
            pickerobj1:{},
            
	    	dataList:[],
            
	    	pageIndex:'0',
        	pageSize:'10',
        	currentPage:1,
        	total:0,
            
        	searchkeys:{
        		"sdate":'',
		        "edate":"",
		        "bidtype":"",
		        "status":"",
        	},
            bidtype: [{
              value: 1,
              label: '中标单'
            }, {
              value: 2,
              label: '流拍单'
            }, {
              value: 3,
              label: '未报价单'
            }],
            status: [{
              value: 10,
              label: '中标'
            }, {
              value: 9,
              label: '流拍'
            }, {
              value: 3,
              label: '未报价'
            }, {
              value: 1,
              label: '竞价中'
            }],
        	// rules:{
        	// 	c_cate_id: [{  required: true,  message: '请选择所属分类'}],
            //     c_name: [{  required: true , validator: validateName, trigger: 'blur' }],
            //     c_desc: [{ required: true , validator: validateDesc, trigger: 'blur' }],
            // 
            //     e_cate_id: [{  required: true,  message: '请选择所属分类'}],
            //     e_name: [{  required: true , validator: validateName, trigger: 'blur' }],
            //     e_desc: [{ required: true , validator: validateDesc, trigger: 'blur' }]
            // }
	    }
	},
    created() {
        var vueIns = this
        vueIns.edatetime = vueIns.edate;
        this.pickerobj0 = {
                disabledDate(time) {
                //最多只能选择一年的  
                // let ayearAgo = Date.now() - 31536000000  
                let ayearAgo =  vueIns.edatetime - 356 * 24 * 60 * 60 * 1000 
                // return  time.getTime() > Date.now();
               return time.getTime() > Date.now() || time.getTime() < ayearAgo  || (vueIns.searchkeys.edate && vueIns.searchkeys.edate.getTime && (time.getTime() > vueIns.searchkeys.edate.getTime()))  
                }
            };
            
        this.pickerobj1 = {
              disabledDate(time) {
                  //最多只能选择一年的  
                  // let ayearAgo = Date.now() - 31536000000  
                  let ayearAgo = Date.now() - 356 * 24 * 60 * 60 * 1000
                 return time.getTime() > Date.now() || time.getTime() < ayearAgo  || (vueIns.searchkeys.sdate && vueIns.searchkeys.sdate.getTime && (time.getTime() < vueIns.searchkeys.sdate.getTime()))  
                }  
            };
            
        const first = this.$route.matched.filter(item => item.name);
        for(let i in first){
            if ( first[i] && (first[i].name !== '首页' || first[i].path !== '') ){
                this.crumbs = this.crumbs.concat([{ id: i,name: first[i].name, path: first[i].path }]);
            }
        }
    },
	mounted()  {
		this.showList()
		// this.loadInfo()
	},
	methods:{
		handleSizeChange(val) {
	        console.log(`每页 ${val} 条`)
	    },
	    handleCurrentChange(val) {
	    	this.pageIndex = (val- 1)
	        this.showList()
	    },
	    //关联上级状态 如上层为禁用，下层全为禁用
	    // relateFstatus:function(list){
	    // 	for(var i in list){
	    // 		if(list[i].cr_status != '1') list[i].Fstatus = '2',list[i].upStatus = true
	    // 	}
	    // 	return list
	    // },
	    // getEnableList:function(list){
	    // 	let Lists = []
	    // 	for(var i in list){
	    // 		if(list[i].Fstatus == '1') Lists.push(list[i])
	    // 	}
	    // 	return Lists
	    // },
	    //loadInfo:function(){
	    //	let data = {'pageSize':'9999'}
	    //	api.getCateRoleList(data).then(res =>{
	    //		if (res.ret != '0') {
        //            this.$layer.msg(res.retinfo)
        //            return
        //        }
        //        this.cateRoleList = res.data.list
        //        this.enableCateRoleList = this.getEnableList(res.data.list)
	    //	})
	    //},
		showList:function(){
			// this.searchkeys.roleName = util.Trim(this.searchkeys.roleName)
			let data = {
		        "s_stime": this.searchkeys.sdate,
				"s_etime":this.searchkeys.edate,
				"s_bidtype":this.searchkeys.bidtype,
				"s_status":this.searchkeys.status,
    
				'pageIndex':String(this.pageIndex),
				'pageSize':this.pageSize
			}

			api.historyBidList(data).then(res => {
				if (res.ret != '0') {
                    this.$layer.msg(res.retinfo)
                    return
                }

                this.dataList = res.data.list
				this.total = Number(res.data.nums)
			})
		},
		//设置状态
		// setStatus:function(id , status){
		// 	let data = {
		// 		"s_role_id":id,
        // 		"s_status": status == '1'?'2':'1'
		// 	}
		// 	api.changeRoleStatus(data).then(res => {
        //         if (res.ret != '0') {
        //             this.$layer.msg(res.retinfo)
        //             return
        //         }
        //         this.$layer.msg('成功！')
        //         this.showList()
        //     })
		// },
		//search
		search:function(){
			this.pageIndex = '0'
			// this.searchkeys.bidtype = util.Trim(this.searchkeys.bidtype)
			// this.searchkeys.status = util.Trim(this.searchkeys.status)
			this.showList()
		},
        hbDetail:function(mbid){
            this.$router.push({path: '/bidcenter/hddetail', query: {list: mbid}});
            //this.$router.push({
            //    name:'detailDealer2',
            //    query:{mbid:mbid}
            //})
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
    .setdate {
      
    }
    .setdate .datebutton{
        display:inline-block;
    }
    
    .setdate .line{
        display:inline-block;
        vertical-align: middle;
        width:2rem;
        height:2px;
        background-color:#C0CCDA;
    }
</style>