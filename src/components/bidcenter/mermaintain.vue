<template>
  <div class="mermaintain-wrap">
    <div class="filter">
      <el-form inline>
        <el-select v-model="aa" placeholder="apple" class="select type">
          <el-option label="apple" value=""></el-option>
          <el-option v-for="item in orderList" :label="item.b_order_no" :value="item.bid" :key="item.bid"></el-option>
        </el-select>
        <el-select v-model="aa" placeholder="请搜索机型" class="select type">
          <el-option label="请搜索机型" value=""></el-option>
          <el-option v-for="item in orderList" :label="item.b_order_no" :value="item.bid" :key="item.bid"></el-option>
        </el-select>
        <el-select v-model="aa" placeholder="全部" class="select type">
          <el-option label="全部" value=""></el-option>
          <el-option v-for="item in orderList" :label="item.b_order_no" :value="item.bid" :key="item.bid"></el-option>
        </el-select>
        <button class="btn1">搜索</button>
      </el-form>
    </div>
    <div class="table-wrap">
      <el-table :data="dataList" stripe style="min-height:300px">
        <el-table-column prop="num" label="序号"></el-table-column>
        <el-table-column prop="date" label="品牌"></el-table-column>
        <el-table-column prop="name" label="机型"></el-table-column>
        <el-table-column prop="address" label="维护情况"></el-table-column>
        <el-table-column prop="price" label="基准价/元"></el-table-column>
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
      aa: '',
      orderList: [],
      dataList: [{
          num: '1',
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市',
          price: '2323'
        },
        {
          num: '1',
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市',
          price: '2323'
        },
        {
          num: '1',
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市',
          price: '2323'
        },
        {
          num: '1',
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市',
          price: '2323'
        },
        {
          num: '1',
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市',
          price: '2323'
        },
        {
          num: '1',
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市',
          price: '2323'
        },
        {
          num: '1',
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市',
          price: '2323'
        },
        {
          num: '1',
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市',
          price: '2323'
        },
        {
          num: '1',
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市',
          price: '2323'
        },
        {
          num: '1',
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市',
          price: '2323'
        }
      ]
    }
  },
  methods: {
    handleCurrentChange() {

    }
  }
}

</script>
<style scoped lang="scss"> 
// 表格的样式
.el-table__header-wrapper { 
  .el-table__header { 
    thead{
      tr{
        background: red!important;
      }
      
    }
  }
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
