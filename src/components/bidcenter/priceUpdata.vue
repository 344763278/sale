<template>
  <div class="price-updata-wrap">
    <div class="filter">
      <el-form inline>
        <el-form-item label="">
          <el-select v-model="aa" placeholder="请选择" class="select type">
            <el-option label="全部" value=""></el-option>
            <el-option v-for="item in orderList" :label="item.b_order_no" :value="item.bid" :key="item.bid"></el-option>
          </el-select>
        </el-form-item>
        <button class="btn1">搜索</button>
      </el-form>
      
    </div>
    <div class="table-wrap">
      <el-table :data="dataList" stripe style="width: 100% ; min-height:300px">
        <el-table-column prop="system_id" label="序号"></el-table-column>
        <el-table-column prop="name" label="品牌"></el-table-column>
        <el-table-column prop="system_desc" label="SKU"></el-table-column>
        <el-table-column prop="system_desc" label="基准价状态"></el-table-column>
        <el-table-column prop="system_desc" label="源准价/元"></el-table-column>
        <el-table-column prop="system_desc" label="新基准价"></el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pageSize" layout="prev, pager, next" :total="total" size="small">
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
      dataList: [],
      currentPage: 0,
      total: 100,
      pageSize: 10,
      orderList: [],
      aa: ''
    }
  },
  methods: {
    handleCurrentChange() {

    }
  }
}

</script>
<style scoped lang="scss">
.price-updata-wrap {
  .filter {
    height: 70px;
    margin-top: 20px;
    margin-bottom: 20px;
    background: #fff;
    padding-top: 17px;
    padding-left: 20px;
    box-sizing: border-box;
    .btn1 {
      width: 100px;
      height: 36px;
      line-height: 36px;
      font-size: 15px;
      background: #2A9FFF;
      color: #fff;
      border-radius: 3px;
      vertical-align: middle;
    }
  }
}

</style>
