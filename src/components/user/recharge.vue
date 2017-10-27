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
        <p class="money">￥1，234，567</p>
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
        <span class="input-btn " @click="to">收支记录</span><span class="balance-btn active" >充值</span>
      </div>
    </div>
    <ul class="submit-items">
      <li class="submit-item">
        <p class="name">充值金额</p>
        <input type="text" placeholder="请输入充值金额">
      </li>
      <li class="submit-item">
        <p class="name">充值账号</p>
        <input type="text" placeholder="请输入充值账号">
      </li>
      <li class="submit-item">
        <p class="name">充值时间</p>
        <input type="text" placeholder="请输入充值金额">
      </li>
      <li class="submit-item">
        <button class="sub-btn">提交审核</button>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dataList: [],
      currentPage: 0,
      total: 100,
      pageSize: 10
    }
  },
  methods: {
    handleCurrentChange() {

    },
    to() {
      this.$router.push('/user/index')
    }

  }
}

</script>
<style scoped lang="scss">
.user-index-root { 
  .base-info {
    // overflow: hidden;
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
  }
  .submit-items {
    // overflow: hidden;
    display: flex;
    .submit-item {
      flex: 1;
      // width: 360px;
      height: 155px;
      background: #fff;
      border-radius: 3px;
      // float: left;
      padding-left: 32px;
      padding-top: 6px;
      box-sizing: border-box;
      margin-right: 34px;
      position: relative;
      &:last-child {
        margin-right: 0;
      }
      .name {
        line-height: 73px;
        font-size: 18px;
        color: #788C9A;
      }
      input {
        width: 88%;
        height: 40px;
        padding: 0 12px;
        border-radius: 3px;
        border: 1px solid #C9CED7;
        box-sizing: border-box; 
      }
      &:last-child {
        background: #F4F5F8;
        .sub-btn {
          width: 120px;
          height: 50px;
          position: absolute;
          left: 0;
          bottom: 0;
          border-radius: 3px;
          color: #fff;
          background: #FF4444;
          font-size: 20px;
        }
      }
    }
  }
}

</style>
