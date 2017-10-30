<template>
  <div class="user-index-root">
    <h3 class="main-titie">
  	    账户基本信息
  	</h3>
    <ul class="base-info">
      <li class="item">
        <div class="item-img">
          <img class="item-img" src="../../assets/images/user/icon1.png" height="64" width="64" alt="icon1">
        </div>
        <p class="money">￥1，234，567</p>
        <p class="remain">账户余额</p>
      </li>
      <li class="item">
        <div class="item-img">
          <img class="item-img" src="../../assets/images/user/icon2.png" height="64" width="64" alt="icon1">
        </div>
        <p class="money">￥1，234，567,1</p>
        <p class="remain">账户欠款</p>
      </li>
      <li class="item">
        <div class="item-img">
          <img class="item-img" src="../../assets/images/user/icon3.png" height="64" width="64" alt="icon1">
        </div>
        <p class="money">￥1，234，567</p>
        <p class="remain">历史收入</p>
      </li>
      <li class="item">
        <div class="item-img">
          <img class="item-img" src="../../assets/images/user/icon4.png" height="64" width="64" alt="icon1">
        </div>
        <p class="money">￥1，234，567</p>
        <p class="remain">历史支出</p>
      </li>
    </ul>
    <div class="record">
      <div class="input-balance">
      	<span class="input-btn active">收支记录</span><span class="balance-btn" @click="to">充值</span>
      </div>
      <div class="fitler">
      	 <el-form inline>
           <el-form-item label="报价时间">
             <el-form-item prop="date1">
               <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1"></el-date-picker>
             </el-form-item>
             <div class="line1">-</div>
             <el-form-item prop="date2">
               <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date2"></el-date-picker>
             </el-form-item>
           </el-form-item>
           <el-form-item label="类型">
             <el-select v-model="aa" placeholder="全部" class="select type">
               <el-option label="全部" value=""></el-option>
               <el-option v-for="item in orderList" :label="item.b_order_no" :value="item.bid" :key="item.bid"></el-option>
             </el-select>
           </el-form-item> 
           <button class="btn1">搜索</button>
         </el-form>
      </div>
      <div class="recharge-wrap">
        <div class="recharge">
          <div class="Income-total">
            <h4>总计收入</h4>
            <p>￥808080</p>
          </div>
          <div class="expenditure-total">
            <h4>总计收入</h4>
            <p>￥808080</p>
          </div>
        </div>
      </div>
    </div>
    <div class="index-table-wrap">
      <el-table :data="dataList" stripe style="min-height:280px">
        <el-table-column prop="num" label="时间"></el-table-column>
        <el-table-column prop="name" label="账户类型"></el-table-column>
        <el-table-column prop="date" label="账户名"></el-table-column>
        <el-table-column prop="address" label="收支类型"></el-table-column>
        <el-table-column prop="price" label="金额"></el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pageSize" layout="prev, pager, next" :total="total" size="small">
      </el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      orderList: [],
      currentPage: 0,
      total: 100,
      pageSize: 10,
      ruleForm: {
        date1: '',
        date2: ''
      },
      aa: '',
      dataList: [
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

    },
    to() {
      this.$router.push('/user/recharge')
    }
  }
}

</script>
<style scoped lang="scss">
.index-table-wrap .el-table tr {
  // height: 30px;
  height: 60px;
}
.user-index-root {  
  .base-info { 
    display: flex;
    .item {
      flex: 1;
      background: #fff; 
      height: 180px;
      text-align: center;
      padding-top: 30px;
      margin-right: 34px; 
      border-radius: 3px; 
      &:last-child {
        margin: 0;
      }
      .item-img {
        height: 64px;
        line-height: 64px;
        margin-bottom: 5px;
        img {
          display: inline-block;
        }
      }
      .money {
        line-height: 60px;
        font-size: 22px;
        color: #53526B;
      }
      .remain {
        line-height: 18px;
        font-size: 18px;
        color: #788C9A;
      }
    }
  }
  .record {
    .input-balance {
      margin: 16px 0;
      span{
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
    .fitler {
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
    }
    .recharge-wrap {
      background: #fff;
      .recharge {
        // width: 1444px;
        padding: 33px 0 45px 18px;
        margin: 0 auto;
        background: #fff;
        border-bottom: 1px solid #F6F7FA;
        overflow: hidden;
        .Income-total {
          width: 190px;
          height: 50px;
          float: left;
          border-right: 2px solid #F6F7FA;
          h4 {
            font-size: 18px;
            line-height: 18px;
            color: #99A7B1;
          }
          p {
            font-size: 20px;
            line-height: 32px;
            color: #FF4444;
          }
        }
        .expenditure-total {
          width: 190px;
          height: 50px;
          float: left;
          margin-left: 104px;
          h4 {
            font-size: 18px;
            line-height: 18px;
            color: #99A7B1;
          }
          p {
            font-size: 20px;
            line-height: 32px;
            color: #5FB870;
          }
        }
      }
    }
    .index-table-wrap {
      background: #fff;
    }
  }
  .pagination {
    text-align: right;
    padding: 0;
    margin-top: 10px;
  }
}

</style>
