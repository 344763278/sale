<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default { 
  mounted() {
    // this.startRem() 
  },
  methods: {
    startRem() {
      let w = document.documentElement.getBoundingClientRect().width
      document.getElementsByTagName('html')[0].style.fontSize = w/16 + 'px' 
    }
  }
}
</script>

<style>
/*body{
  padding:0px;
  margin:0px auto;
}
a{
  text-decoration:none;
}
.el-pagination {
  padding: 10px 0;
  text-align: right;
}*/
/*.el-pagination li,.el-pagination button.btn-prev,.el-pagination button.btn-next, .el-pagination li.el-icon.more.btn-quickprev.el-icon-more {
  width: 50px;
  height: 50px;
  line-height: 50px;
  text-align: center;
}
.el-pagination li.el-icon-more {
  line-height: 50px;
}
*/
#app {
  width: 100%;
  height: 100%;
  overflow: hidden;
  font-family: Arial, Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
} 
/* 设置滚动条的样式 */
::-webkit-scrollbar {
width: 8px;
}
/* 滚动槽 */
::-webkit-scrollbar-track {
-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
border-radius: 8px;
}
/* 滚动条滑块 */
::-webkit-scrollbar-thumb {
border-radius: 8px;
background: rgba(206,206,206,0.1);
-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5);
}
</style>
