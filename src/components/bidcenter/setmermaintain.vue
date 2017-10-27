<template>
  <div class="setmermaintain-wrap">
    <div class="filter">
      <el-form inline>
        <el-form-item label="">
          <el-select v-model="aa" placeholder="请搜索品牌" class="select type">
            <el-option label="全部" value=""></el-option>
            <el-option v-for="item in orderList" :label="item.b_order_no" :value="item.bid" :key="item.bid"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="">
          <el-select v-model="aa" placeholder="请搜索机型" class="select type">
            <el-option label="全部" value=""></el-option>
            <el-option v-for="item in orderList" :label="item.b_order_no" :value="item.bid" :key="item.bid"></el-option>
          </el-select>
        </el-form-item>
        <button class="btn1">搜索</button>
      </el-form>
    </div>
    <div class="input-balance">
      <span class="input-btn " :class="{active:tabFlag==true}" @click="maintanceType(true)">机型维护</span><span class="balance-btn" :class="{active:tabFlag==false}" @click="maintanceType(false)">成色等级维护</span>
    </div>
    <div class="tab-box">
      <transition name="fade1">
        <div class="tab-box-1" v-show="tabFlag">
          <div class="table-wrap">
            <el-table :data="dataList1" stripe style="width: 100% ; min-height:300px">
              <el-table-column prop="a" label="序号"></el-table-column>
              <el-table-column prop="b" label="机型"></el-table-column>
              <el-table-column prop="c" label="颜色"></el-table-column>
              <el-table-column prop="d" label="内存"></el-table-column>
              <el-table-column prop="e" label="版本"></el-table-column>
              <el-table-column prop="f" label="保修"></el-table-column>
              <el-table-column prop="g" label="制式"></el-table-column>
              <el-table-column prop="h" label="基准价/元"></el-table-column>
            </el-table>
          </div>
          <div class="pagination">
            <el-pagination @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pageSize" layout="prev, pager, next" :total="total" size="small">
            </el-pagination>
          </div>
        </div>
      </transition>
      <transition name="fade2">
        <div class="tab-box-2" v-show="!tabFlag">
          <div class="table-wrap">
            <el-table :data="dataList" stripe style="width: 100% ; min-height:300px">
              <el-table-column prop="system_id" label="序号"></el-table-column>
              <el-table-column prop="name" label="等级"></el-table-column>
              <el-table-column prop="system_desc" label="等级描述"></el-table-column>
              <el-table-column prop="system_desc" label="比例"></el-table-column>
            </el-table>
          </div>
          <div class="pagination">
            <el-pagination @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pageSize" layout="prev, pager, next" :total="total" size="small">
            </el-pagination>
          </div>
        </div>
      </transition>
    </div> 
  </div>
</template>
<script>
import api from '../../api/api'
import util from '../../common/util'
export default {
  data() {
    return {
      tabFlag: true,
      dataList: [
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
      ],
      dataList1: [
        {a:1,b:2,c:3,d:4,e:5,f:5,g:6,h:7},
        {a:1,b:2,c:3,d:4,e:5,f:5,g:6,h:7},
        {a:1,b:2,c:3,d:4,e:5,f:5,g:6,h:7},
        {a:1,b:2,c:3,d:4,e:5,f:5,g:6,h:7},
        {a:1,b:2,c:3,d:4,e:5,f:5,g:6,h:7},
        {a:1,b:2,c:3,d:4,e:5,f:5,g:6,h:7},
        {a:1,b:2,c:3,d:4,e:5,f:5,g:6,h:7},
        {a:1,b:2,c:3,d:4,e:5,f:5,g:6,h:7},
        {a:1,b:2,c:3,d:4,e:5,f:5,g:6,h:7},
        {a:1,b:2,c:3,d:4,e:5,f:5,g:6,h:7} 
      ],
      currentPage: 0,
      total: 100,
      pageSize: 10,
      orderList: [],
      aa: '',
      activeName2: ''
    }
  },
  methods: {
    handleCurrentChange() {

    },
    maintanceType(flag) {
      this.tabFlag = flag
    }
  }
}

</script>
<style scoped lang="scss">
.setmermaintain-wrap {
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
  .input-balance {
    margin: 20px 0;
    span {
      width: 118px;
      height: 38px;
      line-height: 38px;
      display: inline-block;
      border: 1px solid #2A9FFF;
      text-align: center;
      color: #2A9FFF;
      cursor: pointer;
      user-select: none;
      &.active {
        background: #2A9FFF;
        color: #fff;
      }
    }
  }
  .tab-box {
    position: relative;
    width: 100%;
    min-height: 400px;
    .fade1-enter-active, .fade1-leave-active {
      transition: all .5s;
    }
    .fade1-enter, .fade1-leave-to {
      opacity: 0;
    }
    .fade2-enter-active, .fade2-leave-active {
      transition: all .5s;
    }
    .fade2-enter, .fade2-leave-to {
      opacity: 0; 
    }
    .tab-box-1,
    .tab-box-2 {
      width: 100%;
      min-height: 400px;
      position:absolute;
      left:0;
      top:0;
    }
  } 
  
}

</style>
