<template>
  <div class="mermaintain-wrap">
    <div class="filter">
      <el-form inline>
        <el-form-item label="报价时间">
          <el-form-item prop="date1">
            <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" class="data-select"></el-date-picker>
          </el-form-item>
          <div class="line1">-</div>
          <el-form-item prop="date2">
            <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date2" class="data-select"></el-date-picker>
          </el-form-item>
        </el-form-item>
        <el-form-item label="竞拍类型">
          <el-select v-model="aa" placeholder="请选择" class="select type">
            <el-option label="全部" value=""></el-option>
            <el-option v-for="item in orderList" :label="item.b_order_no" :value="item.bid" :key="item.bid"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="竞拍结果">
          <el-select v-model="aa" placeholder="请选择" class="select type">
            <el-option label="全部" value=""></el-option>
            <el-option v-for="item in orderList" :label="item.b_order_no" :value="item.bid" :key="item.bid"></el-option>
          </el-select>
        </el-form-item>
        <button class="btn1">搜索</button>
      </el-form>
    </div>
    <div class="table-wrap">
      <el-table :data="dataList" stripe style="min-height:300px">
        <el-table-column prop="system_id" label="时间"></el-table-column>
        <el-table-column prop="name" label="账户类型"></el-table-column>
        <el-table-column prop="system_desc" label="账户名"></el-table-column>
        <el-table-column prop="system_desc" label="收支类型"></el-table-column>
        <el-table-column prop="system_desc" label="金额"></el-table-column>
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
      ruleForm: {
        date1: '',
        date2: ''
      },
      aa: '',
      orderList: []
    }
  },
  methods: {
    handleCurrentChange() {

    }
  }
}

</script>
<style scoped lang="scss">
input.el-input__inner {
  margin-top: 17px;
}

.mermaintain-wrap {
  .filter {
    height: 70px;
    margin-top: 20px;
    margin-bottom: 20px;
    background: #fff;
    padding-top: 17px;
    padding-left: 20px;
    box-sizing: border-box;
    .line1 {
      width: 10px;
      margin: 0 6px;
      display: inline-block;
    }
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
    .type {
      width: 160px;
    }
    .data-select {
      width: 160px;
    }
  }
}

</style>
