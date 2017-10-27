<template>
<div>
    <div class="title">操作日志</div>
    <el-table
        :data="dataList"
        border
        style="width: 100% ; min-height:300px">
        <el-table-column width='200' prop="Fcreate_time" label="操作时间" ></el-table-column>
        <el-table-column width='200' prop="Ftype" label="操作对象" ></el-table-column>
        <el-table-column width='200' prop="Foperator_name" label="操作人" ></el-table-column>
        <el-table-column  prop="Faction_data" label="操作详情" ></el-table-column>
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
        	dataList:[],
            pageIndex:'0',
            pageSize:'10',
            currentPage:1,
            total:0
        }
    },
    mounted()  {
        this.showList()
    },
    methods:{
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`)
        },
        handleCurrentChange(val) {
            this.pageIndex = (val- 1)
            this.showList()
        },
        showList:function(){
            
            let data = {
                'pageIndex':String(this.pageIndex),
                'pageSize':this.pageSize
            }
            api.getPowerRecordList(data).then(res => {
                if (res.ret != '0') {
                    this.$layer.msg(res.retinfo)
                    return
                }
                this.dataList = res.data.list
                this.total = Number(res.data.nums)
            })
        }
        
    }


}
</script>
<style type="text/css">
    .pagination{text-align: right;margin: 20px 0}
    .tool{text-align: right;margin-bottom: 20px;}
</style>