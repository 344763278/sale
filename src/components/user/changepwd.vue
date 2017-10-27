
<template>

  <el-form ref="form" :model="form" :rules="rules" label-position="left" label-width="0px"
           class="login-container">
    <h3 class="title">重置密码</h3>
    
    <el-col :span="24" class="warp-main">
        <el-form-item>
          <el-input placeholder="手机号" v-model="phone" :disabled="isdisabled"></el-input>
        </el-form-item>
        <el-form-item prop="newPwd">
          <el-input v-model="form.newPwd" type="password" placeholder="新密码" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item  prop="confirmPwd">
          <el-input v-model="form.confirmPwd" type="password" placeholder="确认新密码" auto-complete="off"></el-input>
        </el-form-item>
    </el-col>
    

    
    <router-link to="../login"><el-button type="text" class="loginbutton">登录</el-button></router-link>
    
     <el-form-item style="width:100%;" >
         <el-button type="primary"  style="width:100%;" @click.native.prevent="check">确认</el-button>
     </el-form-item>
     
  </el-form>
</template>



<script>
  import api from '../../api/api'
  import util from '../../common/util'
  export default {
    data() {
      var validatePass = (rule, value, callback) => {
        
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.form.confirmPwd !== '') {
            this.$refs.form.validateField('confirmPwd');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.form.newPwd) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        isdisabled:true,
        phone:'',
        rules: {
         newPwd: [
           {required: true, trigger: 'blur',validator: validatePass},
         ],
         confirmPwd: [
           {required: true, trigger: 'blur',validator: validatePass2},
         ]
        },
        checked: true,
        form: {
          newPwd: '',
          confirmPwd: ''
        },
        sendMsgDisabled:false,
        time:60,
        code_by:'primary',
      }
    },
    mounted(){

        this.phone = this.$route.query.phone;
    },
    methods: {
        enter(ev){
            this.check()
        },
        check:function(){
        
            var self = this;
            this.$refs.form.validate((valid) => {
              if (valid) {
              
                var loginParams = { userid: this.account.username, password: this.account.pwd }
                api.Login(loginParams).then(res => {
                    this.logining = false
                    
                    if (res.ret != '0') {
                        this.$layer.msg(res.retinfo)
                        return
                    }

                    self.$router.push({ path: '/login' })
                })

              } else {
                console.log('error submit!!')
                return false
              }
            });
        
        },

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
    .remember,.loginbutton {
      margin: 0px 0px 35px 0px;
    }
  }
</style>
