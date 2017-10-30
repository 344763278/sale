<template>
  <div class="mermaintain-wrap">
    <div class="filter">
      <span class="text">状态</span>
      <el-select v-model="aa" placeholder="请选择" class="select">
          <el-option label="全部" value=""></el-option>
          <el-option v-for="item in orderList" :label="item.b_order_no" :value="item.bid" :key="item.bid"></el-option>
      </el-select>
      <button class="btn1">点击查找</button> 
    </div>
    <div class="table-wrap">
      <el-table
          :data="dataList"
          stripe
          style="width: 100% ; min-height:300px">
          <el-table-column prop="a" label="序号" ></el-table-column>
          <el-table-column prop="b" label="批次号" ></el-table-column>
          <el-table-column prop="c" label="SKU" ></el-table-column>  
          <el-table-column prop="d" label="成色等级" ></el-table-column>  
          <el-table-column prop="system_desc" label="供货量/台" >
            <template slot-scope="scope">
              <el-input v-model="input" class="inline-input"></el-input>
            </template>
          </el-table-column>  
          <el-table-column prop="system_desc" label="数量/台" >
            <template slot-scope="scope">
              <el-input v-model="input" class="inline-input"></el-input>
            </template>
          </el-table-column>  
          <el-table-column prop="system_desc" label="基准价" >
            <template slot-scope="scope">
              <el-input v-model="input" class="inline-input"></el-input>
            </template>
          </el-table-column>  
          <el-table-column prop="system_desc" label="成色比例" >
            <template slot-scope="scope">
              <el-input v-model="input" class="inline-input"></el-input>
            </template>
          </el-table-column>  
          <el-table-column prop="system_desc" label="单位/元" >
            <template slot-scope="scope">
              <el-input v-model="input" class="inline-input"></el-input>
            </template>
          </el-table-column>  
      </el-table>
    </div>
    <div class="pagination">
        <el-pagination 
          @current-change="handleCurrentChange"
          :current-page="currentPage" 
          :page-size="pageSize"
          layout="prev, pager, next"
          :total="total"
          size="small">
        </el-pagination>
    </div>
    <div class="info-box">
      <span class="num">批次号: 201705191001</span><span class="num-info">(提货只有同一批次才能啥啥啥啥的)</span>
      <span class="has">已报: <span>1234台</span></span>
      <span class="total">总价: <span>123456元</span></span>
      <span class="not">仍有<span>12</span>台未报价</span>
      <button class="btn1">点击查找</button>
    </div>
  </div>
</template>
<script>
import api from '../../api/api'
import util from '../../common/util'
export default {
  data() {
    return {
      dataList: [{a:1,b:2,c:3,d:4},{a:1,b:2,c:3,d:4},{a:1,b:2,c:3,d:4},{a:1,b:2,c:3,d:4},{a:1,b:2,c:3,d:4},{a:1,b:2,c:3,d:4},{a:1,b:2,c:3,d:4},{a:1,b:2,c:3,d:4},{a:1,b:2,c:3,d:4},{a:1,b:2,c:3,d:4},],
      currentPage: 0,
      total: 100,
      pageSize: 10,
      aa: '',
      orderList: [],
      input:''
    }
  },
  methods: {
    handleCurrentChange() {

    }
  }
}

</script>
<style scoped lang="scss">
  .mermaintain-wrap { 
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
    .filter {
      height: 70px;
      margin-top: 20px;
      margin-bottom: 20px;
      background: #fff; 
      line-height: 70px;
      .text {
        padding: 0 16px 0 21px;
        color: #788C9A;
      }
      .select {
        height: 40px;
        margin-right: 16px;
      }
    }
    .info-box {
      background: #fff;
      height: 103px;
      line-height: 103px;
      box-sizing: border-box;
      padding-left: 21px;
      .num {
        font-size: 20px;
        color: #504F69;
        margin-right: 12px; 
        vertical-align: middle;
      }
      .num-info {
        font-size: 14px;
        color: #788C9A;
        // margin-right: 68px;
        margin-right: 16px;
        vertical-align: middle;
      }
      .has{
        font-size: 20px;
        color: #504F69;
        // margin-right: 30px;
        margin-right: 16px;
        vertical-align: middle;
        span {
          color: #FF4444;
        }
      }
      .total {
        font-size: 20px;
        color: #504F69;
        margin-right: 70px;
        margin-right: 16px;
        vertical-align: middle;
        span {
          color: #FF4444;
        }
      }
      .not {
        color: #504F69;
        font-size: 20px;
        vertical-align: middle;
        // margin-right: 30px;
        margin-right: 16px;
        span {
          color: #2A9FFF;
        }
      } 
    }
  }

</style>
