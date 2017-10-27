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
    <div class="searchdata">
      <div class="setdate">
        <el-select v-model="searchkeys.brand_id" placeholder="请选择">
            <el-option label="请搜索品牌" value=""></el-option>
            <el-option v-for="item in brandList" :label="item.label" :value="item.value" :key="item.value"></el-option>
        </el-select>
     
        <el-select v-model="searchkeys.product_id" placeholder="请选择">
            <el-option label="请搜索机型" value=""></el-option>
            <el-option v-for="item in productList" :label="item.label" :value="item.value" :key="item.value"></el-option>
        </el-select>
     
        <el-button @click="search">搜索</el-button>
      </div>
    </div>
    <h3>{{product}}</h3>
    <el-tabs type="border-card">
      <el-tab-pane label="机型维护">
        <el-table :data="dataList" stripe style="width: 100% ; min-height:300px">
            <el-table-column type="index" label="序号" width="80"></el-table-column>
            <el-table-column prop="pname" label="机型" ></el-table-column>
            <el-table-column prop="skudetail.color" label="颜色" ></el-table-column>
            <el-table-column prop="skudetail.ram" label="内存" ></el-table-column>
            <el-table-column prop="skudetail.version" label="版本" ></el-table-column>
            <el-table-column prop="skudetail.version" label="保修" ></el-table-column>
            <el-table-column prop="skudetail.version" label="制式" ></el-table-column>
            <el-table-column label="基准价/元" >
             <template slot-scope="scope">
                 <el-input v-model="scope.row.mprice" placeholder="价格" @blur="doEditPrice(scope.$index)" @focus="doFocusSet(scope.row.mprice)" type="number" ></el-input>
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
      </el-tab-pane>

      <el-tab-pane label="成色等级维护">
        <el-table :data="dataList1" stripe style="width: 100% ; min-height:300px">
            <el-table-column type="index" label="序号" width="80"></el-table-column>
            <el-table-column prop="pid" label="等级代号" width="120" ></el-table-column>
            <el-table-column prop="status1" label="等级描述" ></el-table-column>
            <el-table-column label="比例" width="200" >
             <template slot-scope="scope">
                <el-input v-model="scope.row.mrate" placeholder="%"   @blur="doEditRate(scope.$index)"     @focus="doFocusSet(scope.row.mrate)" type="number" ></el-input>
            </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination
              @size-change="handleSizeChange1"
              @current-change="handleCurrentChange1"
              :current-page="currentPage1"
              :page-sizes="[10, 20, 30, 40]"
              :page-size="10"
              layout="total, prev, pager, next, jumper"
              :total="total1">
            </el-pagination>
        </div>

      </el-tab-pane>
    </el-tabs>

   
</div>
</template>
	

<script>
import api from '../../api/api'
import util from '../../common/util'
export default {
	data() {
	    return {
            crumbs:[],

	    	product:'',
	    	dataList:[],
	    	dataList1:[],
            brandList:[],
	    	productList:[],
            
	    	pageIndex:'0',
        	pageSize:'10',
        	currentPage:1,
        	total:0,
        	priceinput:'',
            
	    	pageIndex1:'0',
        	pageSize1:'10',
        	currentPage1:1,
        	total1:0,
        	priceinput1:'',
            
            handlepriceedit:{
               "e_pro_id":'',
               "e_sku_id":'',
		       "e_setprice":"", 
            },
            handlerateedit:{
               "e_pro_id":'',
               "e_level_id":'',
		       "e_setratio":"", 
            },
        	oldvalue:'',
    
            
        	searchkeys:{
        		"brand_id":'',
		        "product_id":"",
		        "status":"",
                
                'pageIndex':'0',
				'pageSize':'9999'
        	},
            
        	searchkeys1:{
        		"brand_id":'',
		        "product_id":"",
		        "status":"",
                
                'pageIndex':'0',
				'pageSize':'9999'
        	},
        	
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
    
        this.product = this.$route.query.pid
		this.showList()
		this.showList1()
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
        doFocusSet(v) {
           this.oldvalue = v;
        },
        doEditPrice(index) {
       
            let data = this.dataList[index]
            if( (this.oldvalue == '0' && this.oldvalue != data.mprice ) || (typeof(this.oldvalue) == "undefined" && typeof(data.mprice) != 'undefined') || (this.oldvalue != '' && this.oldvalue != data.mprice) ){

              this.handlepriceedit.e_pro_id = data.pid 
              this.handlepriceedit.e_sku_id = data.sid 
              this.handlepriceedit.e_setprice = data.mprice 

              api.editMaintainDetail(this.handlepriceedit).then(res => {
			  	if (res.ret != '0') {
                      this.$layer.msg(res.retinfo)
                      return
                  }
                  this.oldvalue = ''
			  })
            }
        },
        doEditRate(index) {
            let data = this.dataList1[index]
            if( (typeof(this.oldvalue) == "undefined" && typeof(data.mrate) != 'undefined') || (this.oldvalue != ''  && this.oldvalue != data.mrate) ){
              this.handlerateedit.e_pro_id = data.pid 
              this.handlerateedit.e_level_id = data.lid 
              this.handlerateedit.e_setratio = data.mrate 
              api.editMaintainDetail(this.handlerateedit).then(res => {
			  	if (res.ret != '0') {
                      this.$layer.msg(res.retinfo)
                      return
                  }
                  this.oldvalue = ''
			  })
            }
        },
		handleSizeChange(val) {
	        console.log(`每页 ${val} 条`)
	    },
	    handleCurrentChange(val) {
	    	this.pageIndex = (val- 1)
	        this.showList()
	    },
		handleSizeChange1(val) {
	        console.log(`每页 ${val} 条`)
	    },
	    handleCurrentChange1(val) {
	    	this.pageIndex = (val- 1)
	        this.showList()
	    },
		showList:function(){
			let data = {
				"s_pro_id":this.product,
            
                'pageIndex':String(this.pageIndex),
				'pageSize':this.pageIndex
			}
			api.mapPriceList(data).then(res => {
                data.pageIndex = String(this.pageIndex)
                data.pageSize = String(this.pageIndex)
				if (res.ret != '0') {
                    this.$layer.msg(res.retinfo)
                    return
                }
                this.dataList = res.data.list
				this.total = Number(res.data.nums)
			})
		},
		showList1:function(){
            let data1 = {
				"s_pro_id":this.product,
            
				'pageIndex':String(this.pageIndex1),
				'pageSize':this.pageIndex1
			}
			api.mapPriceList(data1).then(res => {
				if (res.ret != '0') {
                    this.$layer.msg(res.retinfo)
                    return
                }
                this.dataList1 = res.data.list
				this.total1 = Number(res.data.nums)
			})
		},
		//search
		search:function(){
			this.pageIndex = '0'
			this.pageIndex1 = '0'
			this.showList()
			this.showList1()
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
    .searchdata{margin:1rem 0;display:block;width: 100%;}
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