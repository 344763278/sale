import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home' 
import index from '@/components/index'
 

//竞价中心
import bid from '@/components/bidcenter/bid'
import historybid from '@/components/bidcenter/historybid'
import hddetail from '@/components/bidcenter/historybiddetail'
import myLogin from '@/components/Login1'

//竞价维护
import mermaintain from '@/components/bidcenter/mermaintain'
import priceUpdata from '@/components/bidcenter/priceUpdata'
import setmermaintain from '@/components/bidcenter/setmermaintain'

//商户  
import userinfo from '@/components/user/index'
import info from '@/components/user/userinfo'
import recharge from '@/components/user/recharge'
import forgetpwd from '@/components/user/forgetpwd'
import changepwd from '@/components/user/changepwd'




import util from '@/common/util'



// import UserList from '@/components/user/list'
// import UserChangePwd from '@/components/user/changepwd'
// import UserProfile from '@/components/user/profile'

// 懒加载方式，当路由被访问的时候才加载对应组件
const Login = resolve => require(['@/components/Login'], resolve)

Vue.use(Router)

// 公共访问
let common_url = ['/user/forgetpwd','/login','/user/changepwd']

let router = new Router({
  // mode: 'history',
  routes: [
    {
      path: '/login',
      name: '登录',
      component: Login
    },
    {
      path: '/login1',
      name: '登录1',
      component: myLogin
    },
    {
      path: '/user/forgetpwd',
      name: '忘记密码',
      component: forgetpwd
    },
    {
      path: '/user/changepwd',
      name: '修改密码',
      component: changepwd
    },
    {
      path: '/',
      name: 'home',
      // component: Home,
      // redirect: '/index',
      redirect: '/user/info',
      leaf: true, // 只有一个节点
      menuShow: false,
      iconCls: 'iconfont icon-home', // 图标样式class
      children: [
        {path: '/index', component: index, name: '首页', menuShow: true}
      ]
    }, 
    {
      path: '/',
      component: Home,
      name: '竞价中心',
      menuShow: true,
      iconCls: 'menu-icon3',
      children: [
        {path: '/bidcenter/bid', component: bid, name: '今日竞价', menuShow: true},
        {path: '/bidcenter/hddetail', component: hddetail, name: '详情', menuShow: true}, 
        {
            path: '/bidcenter/historybid',
            component: historybid,
            name: '历史报价',
            menuShow: true,
            //  children: [{path: 'hddetail', component: hddetail, name: 'hddetail'}]
        },
        
      ]
    },
    {
      path: '/',
      component: Home,
      name: '价格维护',
      menuShow: true,
      iconCls: 'menu-icon2',
      children: [
        {path: '/bidcenter/mermaintain', component: mermaintain, name: '机型清单', menuShow: true,},
        {path: '/bidcenter/priceUpdata', component: priceUpdata, name: '价格更新', menuShow: true,},
        {path: '/bidcenter/setmermaintain', component: setmermaintain, name: '机型|成色维护', menuShow: true}
        // {path: '/user/recordpower', component: RecordPower, name: '价格更新', menuShow: true},
      ]
    },
    {
      path: '/',
      component: Home,
      name: '商户中心',
      menuShow: true,
      iconCls: 'menu-icon1',
      children: [
        {path: '/user/index', component: userinfo, name: '收支记录', menuShow: true},
        {path: '/user/recharge', component: recharge, name: '充值中心'},
        {path: '/user/info', component: info, name: '商户信息', menuShow: true}
      ]
    }
  ]
})

// router.beforeEach((to, from, next) => {
//   if (typeof String.prototype.startsWith != 'function') { 
//     String.prototype.startsWith = function (prefix){ 
//       return this.slice(0, prefix.length) === prefix
//     }
//   }   
//   if (util.contains(common_url,to.path)) {
//     window.sessionStorage.removeItem('access-user')
//     next()
//   } else {
//     let user = window.document.cookie.match('(^|;) ?' + 'username' + '=([^;]*)(;|$)')
//     let session = window.sessionStorage.getItem('access-user')

//     // if (!user || !session) {
//     if (!session) {
//       next({path: '/login'})
//     } else {
//       next()
//     }
//   }   
// })

export default router
