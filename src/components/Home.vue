<template>
  <div class="root">
    <div class="aside">
      <div class="logo-box">
        <p class="logo-img">
          <img src="../assets/images/aside-logo.png">
        </p>
        <p class="logo-title">回收宝</p>
        <span class="en-logo-title">huishoubao.com</span>
        <p class="logo-desc">竞拍平台</p>
      </div>
      <div class="avatar-box">
        <div class="avatar">
          <img src="../assets/images/avatar.png" height="64" width="64" alt="avatar">
        </div>
        <p class="name">齐天大圣</p>
        <p class="create-time">创建于：2017-09-09</p>
      </div>

      <div class="link-box">
        <div @click.self.prevent="collapse">
          <el-menu default-active="2-1" unique-opened @open="handleOpen" @close="handleClose" router class="menu">
            <template v-for="(item,index) in $router.options.routes" v-if="item.menuShow" class="menu-item-wrap">
              <el-submenu v-if="!item.leaf" :index="index+''"> 
                <template slot="title"><i :class="item.iconCls"></i>{{item.name}}</template>
                <el-menu-item v-for="term in item.children" :key="term.path" :index="term.path" v-if="term.menuShow" class="menu-item">
                  {{term.name}}
                  <span class="new-price" v-if="term.name=='价格更新'&&hasNewPriceUpdata==true">3</span>
                </el-menu-item>
              </el-submenu>
              <el-menu-item v-else-if="item.leaf&&item.children&&item.children.length" :index="item.children[0].path" class="el-submenu__title menu-item">
                <i :class="item.iconCls"></i>{{item.children[0].name}}23
              </el-menu-item>
            </template>
          </el-menu>
        </div> 
      </div>
			
			<div class="exit" @click="back">
				<span class="icon"></span>
				<span class="text">退出</span>
			</div>

    </div>
    <div class="main"> 
      <router-view></router-view> 
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      hasNewPriceUpdata: true,
      unique: 'false'
    }
  },
  methods: {
    handleOpen() {
       
    },
    handleClose() {

    },
    back() {
      this.$router.push('/login')
    }
  }
}

</script>
<style scoped lang="scss">
.el-submenu .el-menu-item{
  background: #fff!important;
  min-width: 150px;
}
.menu-icon1, .menu-icon2, .menu-icon3 {
  width: 22px;
  height: 22px;
  display:inline-block;
  vertical-align: top;
  margin-top: 15px;
  margin-right: 12px;
  background: url(../assets/images/menu-icon1.png) no-repeat;
}
.menu-icon2 {
  background: url(../assets/images/menu-icon2.png) no-repeat;
}
.menu-icon3 {
  background: url(../assets/images/menu-icon3.png) no-repeat;
}
.new-price {
  display: inline-block;
  width: 26px;
  height: 16px;
  font-size: 12px;
  color: #fff;
  background: #FABE00;
  border-radius: 8px;
  text-align: center;
  line-height: 16px;
  margin-left: 10px;
}
.root { 
  // display: flex;
  // display: box;
  // display: -moz-box;
  // display: -webkit-box;
  // display: -ms-flexbox;

  min-width: 1300px;
  height: 950px;
  
  position: relative;  
  .aside {
    // flex: 0 0 220px;
    // position: relative;
    position: absolute;
    left: 0;
    top: 0;
    box-sizing: border-box;
    height: 950px; 
    width: 220px; 
    background: #fff;
    padding-top: 34px; 
    .logo-box {
      text-align: center;
      color: #504F69;
      border-bottom: 1px solid #F2F2F2;
      .logo-img {
        height: 64px;
        line-height: 64px; 
        img {
          width: 48px;
          height: 48px;
          margin: 0 auto;
          vertical-align: middle;

        }
      }
      .logo-title {
        font-size: 23px;
        height: 30px;
        line-height: 30px;
        font-weight: normal;
      }
      .en-logo-title {
        font-size: 10px;
        height: 10px;
        line-height: 10px;
      }
      .logo-desc {
        height: 49px;
        line-height: 49px;
        font-size: 25px;
        margin-bottom: 30px;
      }
    }
    .avatar-box {
      border-bottom: 1px solid #F2F2F2;
      padding: 15px 0 11px 0;
      text-align: center;
      .avator {
        height: 64px;
        width: 64px;
        border-radius: 50%;
        margin-bottom: 8px;
      }
      .name {
        height: 16px;
        line-height: 16px;
        font-sizing: 16px;
        color: #504F69;
      }
      .create-time {
        line-height: 26px;
        font-size: 14px;
        color: #C9CED7;
      }
    }
    .link-box { 
      box-sizing: border-box;  
      padding-top: 40px;
      min-height: 505px;  
      .menu { 
        width: 150px; 
        background: #fff;
        margin: 0 auto; 
        .menu-item-wrap {
          padding: 0; 
        } 
        .menu-item {
          background: transparent;  
          &:hover {
            background: none;  
            // width: 100%!important;
          } 
        }
        &:hover { 
          .menu-item { 
            // background: transparent;
            width: 100%; 
          } 
        }
      }
    }
    .exit { 
    	width: 80%;
    	height: 80px;
    	line-height: 80px;
    	text-align: center;
    	border-top: 1px solid #F2F2F2;
    	margin: 0 auto; 
    	cursor: pointer;
    	.icon {
    		width: 16px;
    		height: 16px;
    		display: inline-block;
    		background: url(../assets/images/exit.png) 0 0 no-repeat;
    		vertical-align: middle;
    		margin-right: 6px;
    	}
    	.text {
				font-size: 12px;
				color: #AEB2B5;
				vertical-align: middle;
    	}
    }
  } 
  .main {
    // flex: 1; 
    // -webkit-box-flex: 1;       
    // -moz-box-flex: 1;

    position: absolute;
    left: 220px;
    top:0;
    right: 0;         
    background: #F4F5F8;  
    padding-left: 20px;
    padding-right: 20px;
    box-sizing: border-box;
    height: 950px;  
  }
}

</style>
