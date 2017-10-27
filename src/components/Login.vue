<template>
  <el-form ref="AccountFrom" :model="account" :rules="rules" label-position="left" label-width="0px"
           class="demo-ruleForm login-container">
    <h3 class="title">竞拍平台</h3>
    <el-form-item prop="username">
      <el-input type="text" v-model="account.username" @keyup.13.native="enter($event)" auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="pwd">
      <el-input type="password" v-model="account.pwd" @keyup.13.native="enter($event)" auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    
    <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox> - 
    <router-link to="user/forgetpwd"><el-button type="text">忘记密码</el-button></router-link>
    
    <el-form-item style="width:100%;">
      <el-button type="primary" style="width:100%;" @click.native.prevent="handleLogin" :loading="logining">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import api from '../api/api'
  import util from '../common/util'
  export default {
    data() {
      return {
        logining: false,
        account: {
          username: '',
          pwd: ''
        },
        rules: {
          username: [
            {required: true, message: '请输入账号', trigger: 'blur'},
          ],
          pwd: [
            {required: true, message: '请输入密码', trigger: 'blur'},
          ]
        },
        checked: true
      }
    },
    mounted(){
        this.init()
        util.delCookie('username')
    },
    methods: {
        init(){
            let uName = util.getCookie('LoginName')
            let uPwd = util.getCookie('LoginPwd')
            if(uName){
                this.account.username = uName
                this.account.pwd = uPwd
            }
        },
        enter(ev){
            this.handleLogin()
        },
        handleLogin() {
            var self = this
            this.$refs.AccountFrom.validate((valid) => {
              if (valid) {

                this.logining = true
                var loginParams = { mer_username: this.account.username, mer_pwd: this.account.pwd }
                api.merLogin(loginParams).then(res => {

                    this.logining = false
                    if (res.ret != '0') {
                        this.$layer.msg(res.retinfo)
                        return
                    }
                    sessionStorage.setItem('access-user', JSON.stringify('admin'))
                    if(this.checked){
                        util.setCookie("LoginName", this.account.username, 60)
                        util.setCookie("LoginPwd", this.account.pwd, 60)
                    }else{
                        util.delCookie('LoginName')
                        util.delCookie('LoginPwd')
                    }
                    sessionStorage.setItem('token', res.data.login_token)
                    self.$router.push({ path: '/' })
                })

              } else {
                console.log('error submit!!')
                return false
              }
            })
        }
    }
  }

</script>
<style>
  body{
    background: #dfe9fb
  }
</style>
<style lang="scss" scoped>
  .login-container {
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 160px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;

    background: -ms-linear-gradient(top, #fff, #6495ed);        /* IE 10 */
    background:-moz-linear-gradient(top,#b8c4cb,#f6f6f8);/*火狐*/
    background:-webkit-gradient(linear, 0% 0%, 0% 100%,from(#b8c4cb), to(#f6f6f8));/*谷歌*/
    background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#fff), to(#6495ed));      /* Safari 4-5, Chrome 1-9*/
    background: -webkit-linear-gradient(top, #fff, #6495ed,#fff);   /*Safari5.1 Chrome 10+*/
    background: -o-linear-gradient(top, #fff, #6495ed);  /*Opera 11.10+*/

    .title {
      margin: 0px auto 40px auto;
      text-align: center;
      color: #505458;
    }
    .remember {
      margin: 0px 0px 35px 0px;
    }
  }
</style>
