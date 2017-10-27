<template>
  <div class="user-index-root">
    <h3 class="main-titie">
  	    交易情况
  	</h3>
    <ul class="base-info">
      <li class="item">
        <div class="item-img">
          <img src="../../assets/images/user/icon1.png" height="64" alt="icon1">
        </div>
        <p class="money">￥1，234，567</p>
        <p class="remain">账户余额</p>
      </li>
      <li class="item">
        <div class="item-img">
          <img src="../../assets/images/user/icon5.png" height="64" alt="icon5">
        </div>
        <p class="money">￥1，234，567</p>
        <p class="remain">账户欠款</p>
      </li>
      <li class="item">
        <div class="item-img">
          <img src="../../assets/images/user/icon6.png" height="64" alt="icon6">
        </div>
        <p class="money">￥1，234，567</p>
        <p class="remain">历史收入</p>
      </li>
      <li class="item">
        <div class="item-img">
          <img src="../../assets/images/user/icon7.png" height="64" alt="icon7">
        </div>
        <p class="money">￥1，234，567</p>
        <p class="remain">历史支出</p>
      </li>
    </ul>
    <ul class="account-info">
      <li class="item">
        <div class="tit">
        	<img src="../../assets/images/user/icon8.png" width="44" heihgt="44" alt="icon8">
        	<span>账户保证金</span>
        </div>
        <div class="desc">
        	<span class="money">￥200，000</span><span class="promise">保证金</span><span class="time-box">缴费时间: 2017-10-13 20:20:20</span>
        </div>
      </li>
      <li class="item">
        <div class="tit">
        	<img src="../../assets/images/user/icon9.png" width="44" heihgt="44" alt="icon8">
        	<span>账户余额</span>
        </div>
        <div class="desc">
        	<span class="money">￥200，000</span><span class="promise">余额</span> 
        </div>
        <button class="sub-btn">充值</button>
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

    }
  }
}

</script>
<style scoped lang="scss">
.user-index-root { 
  .base-info {
    display: flex; 
    margin-bottom: 35px;
    .item {
      flex: 1; 
      height: 212px;
      background: #fff;
      border-radius: 3px;
      text-align: center;
      padding-top: 30px;
      box-sizing: border-box; 
      margin-right: 34px;
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
  .account-info { 
    display: flex;
    .item {
      flex: 1; 
    	height: 310px;
    	background: #fff; 
    	padding: 27px;
    	box-sizing: border-box;
    	position: relative;
    	&:first-child {
    		margin-right: 34px; 
    	}
    	&:last-child { 
    		.desc .money {
    			color: #FF4444;
    		}
    		.desc .promise {
    			color: #FFF;
    			background: #FF4444;
    		}
    	}
    	.sub-btn {
    		position: absolute;
    		width: 120px;
    		height: 50px;
    		font-size: 20px;
    		color: #fff;
    		bottom: 40px;
    		right: 50px;
    		background: #FF4444;
    		border-radius: 3px;
    	} 
    	.tit {
    		height: 44px;
    		line-height: 44px;
    		padding-bottom: 28px;
    		border-bottom: 1px solid #F2F2F2;
    		img {
    			display: inline-block;
    			vertical-align: top;
    		}
    		span {
    			font-size: 18px;
    			margin-left: 13px;
    			color: #C9CED7;
    		}
    	} 
    	.desc {
    		height: 210px;
    		line-height: 210px;
    		span{
    			display:inline-block;
    			vertical-align: middle;
    			font-size: 28px;
    		}
    		.money {
					color: #FABE00;
					margin-left: 23px;
    		}
    		.promise {
    			width: 72px;
    			height: 30px;
    			line-height: 30px;
    			border-radius: 15px;
    			font-size: 16px;
    			background: #FABE00;
    			color: #fff;
    			text-align: center;
    			margin-left: 14px;
    		}
    		.time-box {
          position: absolute;
          left: 56px;
          bottom: -53px;
    			font-size: 20px;
    			color: #C2C2C3;  
    		}  
    	}
    }
  }
}

</style>
