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
        <el-table-column prop="a" label="序号"></el-table-column>
        <el-table-column prop="b" label="报价日期"></el-table-column>
        <el-table-column prop="c" label="报价单号"></el-table-column>
        <el-table-column prop="d" label="报价批次"></el-table-column>
        <el-table-column prop="e" label="供货量"></el-table-column>
        <el-table-column prop="f" label="竞拍量"></el-table-column>
        <el-table-column prop="g" label="报价总额"></el-table-column>
        <el-table-column prop="h" label="竞拍类型"></el-table-column>
        <el-table-column prop="i" label="竞拍结果"></el-table-column>
        <el-table-column prop="j" label="竞拍详情">
          <template slot-scope="scope"> 
            <!-- <el-button type="text" @click="to"> 查看详情 </el-button> -->
            <button class="btn1" @click="to">查看详情</button>
          </template>
        </el-table-column>
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
      dataList: [{a:1,b:2,c:3,d:4,e:5,f:6,g:7,h:8,i:9,j:10},{a:1,b:2,c:3,d:4,e:5,f:6,g:7,h:8,i:9,j:10},{a:1,b:2,c:3,d:4,e:5,f:6,g:7,h:8,i:9,j:10},{a:1,b:2,c:3,d:4,e:5,f:6,g:7,h:8,i:9,j:10},{a:1,b:2,c:3,d:4,e:5,f:6,g:7,h:8,i:9,j:10},{a:1,b:2,c:3,d:4,e:5,f:6,g:7,h:8,i:9,j:10},{a:1,b:2,c:3,d:4,e:5,f:6,g:7,h:8,i:9,j:10},{a:1,b:2,c:3,d:4,e:5,f:6,g:7,h:8,i:9,j:10},{a:1,b:2,c:3,d:4,e:5,f:6,g:7,h:8,i:9,j:10},{a:1,b:2,c:3,d:4,e:5,f:6,g:7,h:8,i:9,j:10}],
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

    },
    to() {
      this.$router.push('/bidcenter/hddetail')
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
      width: 150px;
    }
    .data-select {
      width: 150px;
    }
  }
  .table-wrap {
    .btn1 {
      width: 100%;
      height: 30px;
      line-height: 30px;
      font-size: 13px;
      background: #2A9FFF;
      color: #fff;
      border-radius: 3px;
      vertical-align: middle;
    }
  }
}

</style>
