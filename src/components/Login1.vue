<template>
  <div class="login-wrap">
    <div class="login-left"> 
    </div>
    <p class="copy-right">
      Copyright © 2012-2017，Huishoubao Tech，All Rights Reserved
    </p>
    <div class="login-box">
      <h3 class="tit">
        <img src="../assets/images/login-tit.png" height="52" width="329" alt="tit">
      </h3>
      <p class="p1">
        <input class="uername" type="text" autocomplete="off" placeholder="请输入账号" >
      </p>
      <p class="p2"> 
        <input class="password" type="password" autocomplete="off" placeholder="请输入密码" >
        <span class="psw-icon"></span>
      </p> 
      <p class="psw-info">
        <input class="checkBox" type="checkbox" id="re"><label for="re" class="rem-pws">记住密码</label>|<span class="forget-pws">忘记密码</span>
      </p>
      <p class="btn-box">
        <button class="login-btn">登录</button>
      </p> 
    </div>
  </div>
</template>
<script> 
</script> 
<style lang="scss" scoped> 
  body, html {
    background: #FFFFFF; 
    position: relative;
  } 
  ::-webkit-input-placeholder {
    color: #C9CED7;
  }
  :-moz-placeholder {
    color: #C9CED7;
  }
  ::-moz-placeholder {
    color: #C9CED7;
  }
  :-ms-input-placeholder {
    color: #C9CED7;
  }
  .login-wrap {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    background: #FFFFFF; 
  }
  .login-left {
    position: absolute;
    width: 170px;
    height: 51px;
    background:url(../assets/images/login-icon3.png) no-repeat 0 0;
    left: 48px;
    top: 32px;
  }
  .copy-right {
    position: absolute;
    bottom: 20px;
    left: 0;
    width:100%;
    text-align: center;
    font-size: 16px;
    height: 20px;
    line-height: 20px;
    color: #B7BBC2;
    user-select: none;


  }
  .login-box {
    width: 446px;
    height: 496px; 
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -223px;
    // margin-top: -248px;
    margin-top: -318px;
    .tit { 
      width: 446px;
      height: 134px;
      padding-top: 41px;
      box-sizing: border-box;
      user-select: none;
      img {
        display: block;
        margin: 0 auto;
      }
    }
    .p2{
      position: relative;  
      .psw-icon {
        position: absolute;
        width: 25px;
        height: 10px;
        bottom: 66px;
        right: 20px;
        background:url(../assets/images/login-icon.png);
        cursor: pointer;
      }
      .password {
        margin-bottom: 40px;
      }
    }
    .uername, .password {
      width: 446px;
      height: 64px;
      border: 1px solid #D0D4DC;
      color: #504F69;
      border-radius: 32px;
      box-sizing: border-box;
      padding: 0 26px;
      font-size: 23px; 
      margin-top: 40px; 
    }
    .psw-info {
      text-align: center;
      font-size: 15px;
      color: #C9CED7;
      * {
        vertical-align: middle;
      }
      .checkBox {
        width: 15px;
        height: 15px; 
      }
      .rem-pws {
        color: #8193A0;
        margin-right: 15px;
        cursor: pointer; 
        user-select: none;
      }
      .forget-pws {
        color: #8193A0;
        margin-left: 15px;
        cursor: pointer; 
        user-select: none;
      }
    }
    .btn-box {
      text-align: center;
      margin-top: 40px;
      .login-btn {
        width: 145px;
        height: 56px;
        font-size: 18px;
        color: #fff;
        border-radius: 3px;
        background: #FF4444;
        margin: 0 auto;
      }
    }
    
  }
</style>
