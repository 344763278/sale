<template>
<div>
    <div class="crumbs">
	<el-breadcrumb separator='>>' >
        <el-breadcrumb-item v-for="item in crumbs" :key="item.id">
            {{item.name}}
        </el-breadcrumb-item>
    </el-breadcrumb>
    </div>
    <div class="article">
        <h3>账户基本信息</h3>
        <p><label for="name">账户名：</label>{{userdata.username}}</p>
        <p><label for="datetime">账户余额：</label><span class="money">{{userdata.balance}}</span> 元</p>
        <!-- <p><label for="datetime">账户欠费: </label><span class="money">1,000</span> 元</p> -->
        <p class="warp-breadcrum"></p>
        <p>
        <div class="situation content-wrapper">
            <el-row :gutter="50">
              <el-col :span="6"><label>历史收入：</label><span>{{userrecharge.Recharge}}</span>元</el-col>
              <el-col :span="6"><label>历史支出：</label><span>{{userpay.Pay}}</span>元</el-col>
            </el-row>
        </div>
        </p>
    </div>
    
    <div class="actionarticle">
    <el-tabs type="border-card">
      <el-tab-pane label="收支记录">
      
      <div class="setdate">
          时间 : 
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
        
        <span>类型 :</span>
        <el-select v-model="searchkeys.status" size=4rem placeholder="请选择">
            <el-option
              v-for="item in status"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
        </el-select>
         <el-button @click="search">搜索</el-button>
        <p>
        <div class="situation content-wrapper">
            <el-row :gutter="50">
              <el-col :span="6">
                <label>收入总计：</label><span class="money small">{{userhrecharge}}</span> 元</p>
              </el-col>
              <el-col :span="6">
                <label>支出总计：</label><span class="money small">{{userhpay}}</span> 元</p>
              </el-col>
            </el-row>
            
            <el-table
            :data="dataList"
            border
            style="width: 100% ; min-height:300px">
            <el-table-column prop="date" label="时间" ></el-table-column>
            <el-table-column prop="name" label="账户类型" ></el-table-column>
            <el-table-column prop="mer_username" label="账户名" ></el-table-column>
            <el-table-column prop="type" label="收支目名" ></el-table-column>
            <el-table-column prop="money" label="金额(元)" ></el-table-column>
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
        </p>   
      </div>
      </el-tab-pane>

      <el-tab-pane label="充值">
      
       <el-form  :model="handelAddRecharge"  ref="handelAddRecharge" label-width="100px" class="charege_form">
           <el-form-item label="充值金额："  prop='amount'>
                <el-input v-model="handelAddRecharge.amount" :maxlength='40'  placeholder='请输入金额'></el-input>
            </el-form-item>
            <el-form-item label="充值账号："  prop='account'>
                <el-input v-model="handelAddRecharge.account" :maxlength='40'  placeholder='请输入账号'></el-input>
            </el-form-item>
            <el-form-item label="充值时间："  prop='time'>
            <el-date-picker
              v-model="handelAddRecharge.time"
              type="date"
              placeholder="选择时间"
              :picker-options="pickerobj2">
            </el-date-picker>
            </el-form-item>
            <el-form-item><el-button type="primary" @click="submitnow('handelAddRecharge')">提交审核</el-button> </el-form-item>

      </el-form>
      </el-tab-pane>
    </el-tabs>
    </div>


    
    
    
  
</div>
</template>
	

<script>
import api from '../../api/api'
export default {
	data() {
    
	    return {
	    	crumbs:[],
            pickerobj0:{},
            pickerobj1:{},
            pickerobj2:{},

            dataList:[],
             
            userdata: '',
            userrecharge: 0,
            userpay: 0,
            
            userhpay: 0,
            userhrecharge: 0,
            
            handelAddRecharge:{
                amount:'',
                account:'',
                time:'',
            },
            
            searchkeys:{
        		"sdate": new Date,
		        "edate": new Date,
		        "status":"",
        	},
            
            status: [{
              value: 1,
              label: '充值'
            }, {
              value: 2,
              label: '消费'
            }],
            
            pageIndex:'0',
        	pageSize:'10',
        	currentPage:1,
        	total:0,
            
           
            
            edatetime: '',
      
          
        }
	},
    created()  {
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
        
        this.pickerobj2 = {
                 disabledDate(time) {
                    return time.getTime() < Date.now() - 8.64e7;
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
    
        this.loadInfo()
		this.showList()
	
	},
    watch: {
        edate: function (val) {
          this.edatetime = val;
        },
    },
	methods:{
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`)
        },
        handleCurrentChange(val) {
            this.pageIndex = (val- 1)
            this.showList()
        },
    
        loadInfo:function(){
	    	let data = {}
	    	api.getMerchantInfo(data).then(res =>{
	    		if (res.ret != '0') {
                    this.$layer.msg(res.retinfo)
                    return
                }
                this.userdata = res.data
	    	})
            
            api.historyRecharge(data).then(res =>{
	    		if (res.ret != '0') {
                    this.$layer.msg(res.retinfo)
                    return
                }
                this.userrecharge = res.data
	    	})
            
            api.historyPay(data).then(res =>{
	    		if (res.ret != '0') {
                    this.$layer.msg(res.retinfo)
                    return
                }
                this.userpay = res.data
	    	})
            
            
	    },
  
        showList:function(){
			// this.searchkeys.roleName = util.Trim(this.searchkeys.roleName)
			let data = {
		        "start_date": this.searchkeys.sdate,
				"end_date":this.searchkeys.edate,
                
				"type":this.searchkeys.status,
    
				'pageIndex':String(this.pageIndex),
				'pageSize':this.pageSize
			}

			api.moneyRecord(data).then(res => {
				if (res.ret != '0') {
                    this.$layer.msg(res.retinfo)
                    return
                }

                this.dataList = res.data.list
                this.userhrecharge = res.data.total_Recharge
                this.userhpay = res.data.total_Pay
				this.total = Number(res.data.nums)
			})
		},
        submitnow:function(formName){   
            this.$refs[formName].validate((valid) => { 
                if (valid) {
                    
                    let data = {
                        'recharge_money':this.handelAddRecharge.amount,
                        'recharge_no':this.handelAddRecharge.account,
                        'recharge_time':this.handelAddRecharge.time
                    }
                    api.rechargeApply(data).then(res => {
                        if (res.ret != '0') {
                            this.$layer.msg(res.retinfo)
                            return
                        }
                        this.$layer.msg('成功! 帐号:'+ this.handelAddRecharge.account)
                        this.handelAddRecharge = {
                            amount:'',
                            account:'',
                            time:'',
                        }
                    })
                } else {
                    console.log('error submit!!')
                    return false;
                }
            })

            
        },
        search:function(){
            this.showList()
        },
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
    .article {
        margin-top:0.4rem;
        padding:0.5rem ;
        border:1px solid #bbbbbb;
    }
    .article label{
        width:200px;
        display: inline-block;
    }
    .actionarticle label{
        width:120px;
        display: inline-block;
    }
    .charege_form .el-input{
        width:180px !important;
    }
    .situation .el-col .grid-content {
        padding:0.5rem ;
        border:1px solid #bbbbbb;
        height:100px;
        
    }
    .money {
        color:#ffb91d;
        font-weight: bold;
        display: inline-block;
    }
    .article .el-button {
        margin-left: 3rem;
    }
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