<template>
  <el-form ref="form" :model="account" :rules="rules" label-position="left" label-width="0px"
           class="demo-ruleForm login-container">
    <h3 class="title">忘记密码</h3>
    <el-form-item prop="phone">
      <el-input type="tel" v-model="account.phone" @keyup.13.native="check($event)" auto-complete="off" placeholder="手机号" ></el-input>
    </el-form-item>
    <el-form-item prop="code">
        <el-row :gutter="20">
          <el-col :span="16"><div class="grid-content bg-purple"> <el-input type="text" v-model="account.code" @keyup.13.native="check($event)" auto-complete="off" placeholder="验证码"></el-input></div></el-col>
          
          <el-col :span="8" v-show="sendMsgDisabled">
            <el-button :type="code_by" >{{time+'秒后获取'}}</el-button>
          </el-col>
          <el-col :span="8" v-show="!sendMsgDisabled">
            <el-button :type="code_by"  @click="getCode">{{element}}</el-button>
          </el-col>
          
        </el-row>
        
    </el-form-item>
    
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
        var validatePhone = (rule, value, callback) => {
            this.isphone = false;
            if( this.account.phone === '' ){
                callback(new Error('请输入手机号'));
            }else if(!(/^1[34578]\d{9}$/.test(this.account.phone))){
                callback(new Error('手机号错误'));
            }else{
                this.isphone = true;
                callback();
            }
        }
        var validateCode = (rule, value, callback) => {
            this.iscode = false;
            if( this.account.code === '' ){
                callback(new Error('请输入验证码'));
            }else if(!(/^[0-9]*$/.test(this.account.code))){
                callback(new Error('验证码错误'));
            }else{
                this.iscode = true;
                callback();
            }
        }
      return {
        account: {
          phone: '',
          code: '',
        },
        rules: {
          phone: [
            {required: true, trigger: 'blur',validator: validatePhone},
          ],
          code: [
            {required: true, trigger: 'blur',validator: validateCode},
          ]
        },
        element:'获取验证码',
        sendMsgDisabled:false,
        time:60,
        code_by:'primary',
        isphone:false,
        iscode:false,
      }
    },
    mounted(){
    
    },
    methods: {
        enter(ev){
            this.check()
        },
        getCode:function(){
            this.$layer.msg('',{time: 1000});
            if(this.isphone){
                let me = this;
                me.sendMsgDisabled = true;
                me.code_by = 'button';
                let interval = window.setInterval(function() {
                  if ((me.time--) <= 0) {
                    me.time = 60;
                    me.sendMsgDisabled = false;
                    window.clearInterval(interval);
                    me.code_by = 'primary';
                    this.element = '重新获取';
                  }
                }, 1000);
            }else{
                this.$refs.form.validateField('phone');
            }
        },
        check:function(){
        
            var self = this;
            this.$refs.form.validate((valid) => {
              if (valid) {
              
                var loginParams = { userid: this.account.phone, password: this.account.pwd }
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
        
        
            var self = this
            if(this.iscode && this.isphone){
   
                self.$router.push({ path: 'changepwd', query: { phone: this.account.phone } });
               // var findPwdParams = { phone: this.account.phone, code: this.account.code }
               // api.Login(findPwdParams).then(res => {
               // 
               //     if (res.ret != '0') {
               //         this.$layer.msg(res.retinfo)
               //         return
               //     }
               // 
               //     self.$router.push({ path: './changepwd' })
               // })
            }
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
