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
            
			<el-select v-model="searchkeys.brand_id" placeholder="请选择">
                <el-option label="请搜索品牌" value=""></el-option>
                <el-option v-for="item in brandList" :label="item.fcategory_name" :value="item.fcategory_id" :key="item.fcategory_id"></el-option>
            </el-select>
         
			<el-select v-model="searchkeys.product_id" placeholder="请选择">
                <el-option label="请搜索机型" value=""></el-option>
                <el-option v-for="item in productList" :label="item.fproduct_name" :value="item.fproduct_id" :key="item.fproduct_id"></el-option>
            </el-select>
         
			<el-select v-model="searchkeys.status" placeholder="请选择">
                <el-option label="全部状态" value=""></el-option>
                <el-option v-for="item in status" :label="item.label" :value="item.value" :key="item.value"></el-option>
            </el-select>
            <el-button @click="search">搜索</el-button>
          </div>
			
		</div>

	
	<el-table :data="dataList" stripe style="width: 100% ; min-height:300px">
        <el-table-column type="index" label="序号" width="80"></el-table-column>
	    <el-table-column prop="bname" label="品牌" width="200"></el-table-column>
	    <el-table-column prop="pname" label="机型" ></el-table-column>
	    <el-table-column prop="status" label="状态" ></el-table-column>

        <el-table-column label="维护操作" >
            <template slot-scope="scope">
                <el-button type="primary" @click="editDetail(scope.row.mid,scope.row.pid)"  size="small">维护</el-button>
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
	    return {
            crumbs:[],

	    	dataList:[],
            brandList:[],
	    	productList:[],
            
	    	pageIndex:'0',
        	pageSize:'10',
        	currentPage:1,
        	total:0,
            
        	searchkeys:{
        		"brand_id":'',
		        "product_id":"",
		        "status":"",
                
                'pageIndex':'0',
				'pageSize':'9999'
        	},
            status: [{
              value: 1,
              label: '已完成'
            }, {
              value: 2,
              label: '未完成'
            }],
        	
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
		this.showList()
		this.loadBrand()
	},
    watch: {
        'searchkeys.brand_id': function(val, oldVal) {
            this.searchkeys.product_id = ''
            this.productList = []
            this.getBrandProduct(val)
        }
    },
	methods:{
		loadBrand(val) {
            let data = {}

			api.getBrand(data).then(res => {
				if (res.ret != '0') {
                    this.$layer.msg(res.retinfo)
                    return
                }
                this.brandList = res.data
				
			})
        },
		handleSizeChange(val) {
	        console.log(`每页 ${val} 条`)
	    },
	    handleCurrentChange(val) {
	    	this.pageIndex = (val- 1)
	        this.showList()
	    },
		showList:function(){
			// this.searchkeys.roleName = util.Trim(this.searchkeys.roleName)
			let data = {
		        "s_brand_id": this.searchkeys.brand_id,
				"s_product_id":this.searchkeys.product_id,
				"s_status":this.searchkeys.status,
    
				'pageIndex':String(this.pageIndex),
				'pageSize':this.pageSize
			}

			api.maintainList(data).then(res => {
				if (res.ret != '0') {
                    this.$layer.msg(res.retinfo)
                    return
                }

                this.dataList = res.data.list
				this.total = Number(res.data.nums)
			})
		},
		//search
		search:function(){
			this.pageIndex = '0'
			this.showList()
		},
        editDetail:function(mid,pid){
            this.$router.push({path: '/bidcenter/setmermaintain', query: {mid: mid,pid: pid}});
        },
        getBrandProduct:function(val){
	    	this.searchkeys.brand_id = val
            let data = { "fcategory_id": this.searchkeys.brand_id }
	    	api.getProductList(data).then(res => {
				if (res.ret != '0') {
                    this.$layer.msg(res.retinfo)
                    return
                }
                this.productList = res.data.list
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