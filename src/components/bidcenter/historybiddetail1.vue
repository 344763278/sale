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
        <div class="searchItem datainfo">
          {{info.stime}}
          <label>报价量：</label><span>{{info.mcount}}</span> 台 
          <label>报价总额：</label><span>{{info.total}}</span> 元
          <label>竞拍类型：</label>-统货竞价
          <label>结果：</label>{{info.status}}
		</div>
        <div class="tool">
            <el-button type="primary" size="small" @click="outfile(dealerid)">导出清单</el-button>
            <router-link to="historybid"><el-button size="small">返回列表</el-button></router-link>
        </div>
          
       

	<el-table :data="dataList" stripe style="width: 100% ; min-height:300px">
        <el-table-column type="index" label="序号" width="80" ></el-table-column>
	    <el-table-column prop="pbatch" label="批次号" width="200"></el-table-column>
	    <el-table-column label="sku"  width="500">
         <template slot-scope="scope" >
              <p>{{scope.row.pname}} {{scope.row.sdesc}}</p>
          </template>
        </el-table-column>
        <el-table-column label="成色等级" align="center">
          <template slot-scope="scope" >
            <el-popover trigger="hover" placement="bottom" >
              <p>{{scope.row.ldesc}}</p>
              <div slot="reference" class="name-wrapper" >
                {{scope.row.lid}}
              </div>
            </el-popover>
          </template>
        </el-table-column>
	    <el-table-column prop="bnum" label="供货量/台" align="center"></el-table-column>
	    <el-table-column prop="mnum" label="数量/台" align="center"></el-table-column>
	    <el-table-column prop="bprice" label="基准价" align="center" ></el-table-column>
	    <el-table-column label="成色比例" align="right">
            <template slot-scope="scope" >
                 {{scope.row.lrate}}%
            </template>
        </el-table-column>
	    <el-table-column prop="price" label="单价/元" align="center"></el-table-column>
	</el-table>
   
</div>
</template>
	

<script>
import api from '../../api/api'
import util from '../../common/util'
export default {
	data() {
	    return {
            crumbs:[],
            pickerobj0:{},
            pickerobj1:{},
	    	dataList:[],
	    	info:{},
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
	mounted()  {
        this.getInfo(),
		this.showList()
	},
	methods:{
        getInfo:function(){
            this.info = this.$route.query.list
        },
	
		showList:function(){
			let data = {
		        "s_mbid": this.info.mbid,
			}
			api.merBidDetailList(data).then(res => {
				if (res.ret != '0') {
                    this.$layer.msg(res.retinfo)
                    return
                }
                this.dataList = res.data.list
				this.total = Number(res.data.nums)
			})
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
    .searchItem{margin:1rem 0;display:block;width: 100%;}
    .datainfo{
      font-size:0.9rem;
      width: auto;
    }
    .datainfo label{
      margin-left:3rem;
    }
    .datainfo span{
      color:#ffc20d;
    }
 
</style>