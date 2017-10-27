<template>
<div>
    <!-- <div class="crumbs">
	<el-breadcrumb separator='>>' >
        <el-breadcrumb-item v-for="item in crumbs" :key="item.id" >
            {{item.name}}
        </el-breadcrumb-item>
    </el-breadcrumb>
    </div> -->
    <h3 class="main-titie">
        账户基本信息
    </h3> 
    <ul class="base-indo">
        <li class="item">
            <img class="item-img" src="" alt="">
            <p class="money">￥1，234，567</p>
            <p class="remain">账户余额</p>
        </li>
    </ul>
    <div class="article"> 
        <h3>基本信息</h3>
        <p><label for="name">账户名：</label>{{userdata.username}}</p>
        <p><label for="datetime">创建时间：</label>{{userdata.last_login_time}}</p>
        <h3>交易情况</h3>
        <div class="situation content-wrapper">
            <el-row :gutter="50">
              <el-col :span="6"><div class="grid-content bg-purple">{{userpay.Pay}} 元</div></el-col>
              <el-col :span="6"><div class="grid-content bg-purple">{{userrecharge.Recharge}} 元</div></el-col>
            </el-row>
        </div>
        <h3>账户余额</h3>
        <p><label for="money">余额：</label> <span class="money">{{userdata.balance}}</span> 元 <router-link to="recharge"><el-button type="primary">充值</el-button></router-link></p>
        
    </div>
  
</div>
</template>


<script>
import api from '../../api/api'
export default {
	data() {
	    return {
            crumbs:[],
            userdata:'',
            userrecharge: '',
            userpay: '',
            
            userctime:'',
  
            balance:'',
	    }
	},
    created(){
        //面包屑
        const first = this.$route.matched.filter(item => item.name);
        for(let i in first){
            if ( first[i] && (first[i].name !== '首页' || first[i].path !== '') ){
                this.crumbs = this.crumbs.concat([{ id: i, name: first[i].name, path: first[i].path }]);
            }
        }
    },
	mounted()  {
		this.loadInfo()
		//this.loadHistoryPay()
		// this.loadInfo()
	},
	methods:{
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
    .article {
        padding:0.5rem ;
    }
    .article label{
        width:200px;
        display: inline-block;
    }
    .situation .el-col .grid-content {
        padding:0.5rem ;
        border:1px solid #bbbbbb;
        height:100px;
        
    }
    .money {
        color:#ffb91d;
        font-weight: bold;
        width: 100px;
        display: inline-block;
        text-align: right;
    }
    .article .el-button {
        margin-left: 3rem;
    }
    
</style>