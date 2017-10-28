<template>
  <el-row class="container">
    <!--头部-->
    <el-col :span="24" class="topbar-wrap">
      <div class="topbar-logo topbar-btn">
        <h3 style="color:#fff;margin:0;line-height:3rem;height:100%;width: 200px;">竞拍平台</h3>
        <!-- <a href="/"><img src="../assets/logo.png" style="width:42px;margin-top: 5px;"></a> -->
      </div>
      <div class="topbar-title topbar-btn">
        <!-- <span>运营管理后台</span> -->
      </div>
      <div class="topbar-account topbar-btn">
        <el-dropdown trigger="click">
          <span class="el-dropdown-link userinfo-inner"><i class="iconfont icon-user"></i> {{sysUserName}}  <i class="iconfont icon-down"></i></span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>个人信息</el-dropdown-item>
            <el-dropdown-item>修改密码</el-dropdown-item>
            <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-col>

    <!--中间-->
    <el-col :span="24" class="main">
      <!--左侧导航-->
      <aside class="menu-expanded"> 
        
        <div class="logo-box">
          <p class="logo-title">回收宝</p>
          <span class="en-logo-title">huishoubao.com</span>
          <p class="logo-desc">竞拍平台</p>
        </div>
        
        <!--展开折叠开关-->
        <div class="menu-toggle" @click.self.prevent="collapse">  
            <el-menu v-show="!collapsed" default-active="0" @open="handleOpen" @close="handleClose" router >
              <template v-for="(item,index) in $router.options.routes" v-if="item.menuShow">
                <el-submenu v-if="!item.leaf" :index="index+''">
                  <template slot="title"><i :class="item.iconCls"></i>{{item.name}}</template>
                  <el-menu-item v-for="term in item.children" :key="term.path" :index="term.path" v-if="term.menuShow">
                    {{term.name}}
                  </el-menu-item>
                </el-submenu>
                <el-menu-item v-else-if="item.leaf&&item.children&&item.children.length" :index="item.children[0].path" class="el-submenu__title">
                  <i :class="item.iconCls"></i>{{item.children[0].name}}
                </el-menu-item>
              </template>
            </el-menu>
        </div> 

      </aside>

      <!--右侧内容区-->
      <section class="content-container right-container">
        <div class="grid-content bg-purple-light">
          <el-col :span="24" class="content-wrapper">
            <transition name="slide-fade" mode="out-in">
              <router-view></router-view>
            </transition>
          </el-col>
        </div>
      </section>
    </el-col>

  </el-row>
</template>

<script>
  import { bus } from '../bus.js'
  export default {
    name: 'home',
    created(){
      bus.$on('setUserName', (text) => {
        this.sysUserName = text
      })
    },
    data () {
      return {
        sysUserName: '',
        sysUserAvatar: '',
        collapsed: false,
      }
    },
    methods: {

      handleOpen() {
        //console.log('handleopen');
      },
      handleClose() {
        //console.log('handleclose');
      },
      //折叠导航栏
      collapse: function () {
        this.collapsed = !this.collapsed;
      },
      showMenu(i, status){
        this.$refs.menuCollapsed.getElementsByClassName('submenu-hook-' + i)[0].style.display = status ? 'block' : 'none';
      },
      logout(){
        var _this = this;
        this.$confirm('确认退出吗?', '提示', {
          //type: 'warning'
        }).then(() => {
          sessionStorage.removeItem('access-user');
          _this.$router.push('/login');
        }).catch(() => {

        });
      }
      
    },
    mounted() {
      var user = sessionStorage.getItem('access-user');
      if (user) {
        user = JSON.parse(user);
        this.sysUserName = user.name || user;
      }
    }
  }


</script>
<style>
  .unUseStatus{font-size: 12px;color:#ff6d6d;}
  .textRight{text-align: right;}
  .searchTitle{margin: 8px;color: #999;font-size: 13px}
  .mustStar>label:before{
    content: '*';
    color: #ff4949;
    margin-right: 4px;
  }
  .el-pagination__jump{color:#20a0ff;cursor: pointer;}
  .notify{z-index: 9999!important}
  .notify .notify-alert h2.notice-title{box-sizing: border-box;}
  .title{
    border-bottom: 1px solid #8391a5;
    height: 40px ;
    line-height: 40px;
    margin-bottom: 30px;
    padding-bottom: 6px
  }
  .searchTool{overflow: hidden;}
  .searchTool .el-button+.el-button{margin: 2px 0 0 6px}
  .searchItem{float: left;margin-right: 12px }
  .searchItem .el-input{width: auto}
  .el-checkbox{margin-right: 10px}
  .el-checkbox+.el-checkbox{margin-left: 0}
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button{
      -webkit-appearance: none !important;
      margin: 0; 
  }
  input[type="number"]{-moz-appearance:textfield;}
  button.indexFunBtn{margin: 8px 8px 8px 0 !important}
  .submitRight{text-align: right;margin:16px auto;}
  .submitRightNoM{text-align: right;}
  .tool{margin-top:16px;}
  /*.el-button+.el-button{margin : 8px 0 8px 12px;}*/
  .detail-addr-top{margin-top: 18px}
  .right-container{
    min-width: 1100px
  }
  .el-input{min-width: 100px!important}
  .el-menu-item, .el-submenu__title {
    color: #fff;
    text-align:left;
  }
  .el-submenu__title:hover {
    background-color: #00C1DE;
  }
  .el-submenu .el-menu-item {
    background-color: #333744
  }
  .el-submenu .el-menu-item:hover {
    background-color: #4A5064
  }
  .el-submenu .el-menu-item.is-active, .el-menu-item.is-active,
  .el-submenu .el-menu-item.is-active:hover, .el-menu-item.is-active:hover {
    background-color: #00C1DE;
    color: #fff;
  }
  .el-menu .iconfont{
    vertical-align: baseline;
    margin-right: 6px;
  }

  .warp-breadcrum{
    padding: 10px 0px;
    border-bottom: 1px solid #efefef;
  }
  .warp-main{
    padding-top: 20px;
  }
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .container {
    position: absolute;
    top: 0px;
    bottom: 0px;
    width: 100%;

    .topbar-wrap {
      height: 50px;
      line-height: 50px;
      background: #373d41;
      padding: 0px;

      .topbar-btn {
        color: #fff; 
      }
      .topbar-btn:hover {
        background-color: #4A5064;
      }
      .topbar-logo {
        float: left;
        text-align: center;
        width: auto;
        height: 100%;
        line-height: 26px;
      }
      .topbar-title {
        float: left;
        text-align: center;
        width: 129px;
      }
      .topbar-account {
        float: right;
        padding-right: 12px;
      }
      .userinfo-inner{
        cursor: pointer;
        color: #fff; 
        padding-left: 10px;
      }
    }
    .main {
      display: flex;
      position: absolute;
      top: 50px;
      bottom: 0px;
      overflow: hidden;
    }
    aside {
      overflow-y: auto;
      flex: 0 0 268px;
      // background-color: #333744;
      background-color: #fff;
      width: 268px;
      .el-menu {
        border-radius: 0px;
        // background-color: #333744;
        background-color: #fff; 
      }
      .collapsed {
        width: 50px; 
        .submenu {
          position: absolute;
          top: 0px;
          left: 50px;
          z-index: 9999;
          height: auto;
          display: none; 
        }
      }
    }
    .menu-collapsed {
      flex: 0 0 50px;
      width: 50px;
    }
    .menu-expanded {
      flex: 0 0 200px;
      width: 200px;
      .el-menu {
        width:100%!important;
      }
    }
    .menu-toggle {
      background: #4A5064;
      text-align: center;
      color: white; 
      height: 26px;
      line-height: 30px;  
    }
    .content-container {
      background: #fff;
      flex: 1;
      overflow-y: auto;
      padding: 10px;

      .content-wrapper {
        background-color: #fff;
        box-sizing: border-box;
      }
    }
    .logo-box{
        text-align:center;
        color: #504F69;
        border-bottom: 1px solid #F2F2F2;
        .logo-title{ 
          font-size:23px;
          height: 30px;
          line-height: 30px; 
          font-weight: normal; 
        }
        .en-logo-title{
            font-size: 10px;
            height: 10px;
            line-height: 10px;
          } 
      }
      .logo-desc{
        height: 49px;
        line-height: 49px;
        font-size: 25px;
        margin-bottom: 30px;
      }
    }
</style>
