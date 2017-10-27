import axios from 'axios'
// import qs from 'qs'
import router from '../router'
import util from '../common/util'

// import * as _ from '../util/tool'

// axios 配置
// axios.defaults.timeout = 5000;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
// axios.defaults.baseURL = 'http://10.0.30.51:8002/';

//POST传参序列化
axios.interceptors.request.use((config) => {
    // if(config.method  === 'post'){
    //     config.data = qs.stringify(config.data)
    // }
    return config
},(error) =>{
    return Promise.reject(error)
})

//返回状态判断
axios.interceptors.response.use((res) =>{
    if(res.status != 200){
        return Promise.reject(res)
    }
    return res.data.body
}, (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 403:
            router.push({ path: '/login' })
      }
    }
    return Promise.reject(error)
}) 
 
function get_cookie(Name) {
   var search = Name + "="//查询检索的值
   var returnvalue = "";//返回值
   if (document.cookie.length > 0) {
        var sd = document.cookie.indexOf(search)
        if (sd!= -1) {
            sd += search.length
            let end = document.cookie.indexOf(";", sd)
            if (end == -1)
                end = document.cookie.length
             //unescape() 函数可对通过 escape() 编码的字符串进行解码。
            returnvalue=unescape(document.cookie.substring(sd, end))
        }
   } 
   return returnvalue
} 

// export function fetchsale(Interface, params ) {

//     var time = parseInt(new Date().getTime()/1000)

//     var resParams = {
//     'head':{
//         'version':"0.01",
//         'msgtype':"request",
//         'interface': Interface,
//         'remark':""
//     },
//     'params':{
//      "system":'SALESAPP',
//         "time":time,
//     }
//     }
//     for(var i in params){
//         resParams.params[i] = params[i]
//     }
//     var signparams = {'head':{},'params':{}};

//     for(var i in resParams.head){
//        if ( resParams.head[i] != '' || resParams.head[i].length < 0 || resParams.head[i].length !== 0 ){
//            signparams.head[i] = resParams.head[i]
//        }
//     }
//     for(var i in resParams.params){
//        // if ( resParams.params[i] != null || resParams.params[i].length < 0 || resParams.params[i].length !== 0 ){
//        if ( resParams.params[i] != '0' && resParams.params[i] != '' ){
//            signparams.params[i] = resParams.params[i]
//        }
//     }
    
//     var sign = util.getSignMd5(signparams);
//     resParams.params['sign'] = sign
//     return new Promise((resolve, reject) => {
//       axios.post(util.apicc + '/index/index', resParams )
//         .then(response => {
//             if(response.retcode == 2001){
//                 window.location.href = response.url
//             }
//             resolve(response)
//         }, err => {
//             reject(err)
//         })
//         .catch((error) => {
//            reject(error)
//         })
//     })
// } 

export function fetchsale(Interface, params ) {

    var time = parseInt(new Date().getTime()/1000)

    if(Interface == 'sale_merlogin'){
       var resParams = {
        'head':{
            'version':"0.01",
            'msgtype':"request",
            'interface': Interface,
            'remark':""
        },
        'params':{
             "system":"SALESAPP",
                "time": time,
        }
       }
    }else{
       var resParams = {
        'head':{
            'version':"0.01",
            'msgtype':"request",
            'interface': Interface,
            'remark':""
        },
        'params':{
             "system":"SALESAPP",
               "login_token": sessionStorage.getItem('token'),
               "time":time,
        }
       }
    }
   
    for(var i in params){
        resParams.params[i] = params[i]
    }
    var signparams = {'head':{},'params':{}};

    for(var i in resParams.head){
       if ( resParams.head[i] != '' || resParams.head[i].length < 0 || resParams.head[i].length !== 0 ){
           signparams.head[i] = resParams.head[i]
       }
    }
    for(var i in resParams.params){
       if ( resParams.params[i] != '0' && resParams.params[i] != '' ){
           signparams.params[i] = resParams.params[i]
       }
    }
    
    var sign = util.getSignMd5(signparams);
    resParams.params['sign'] = sign
    return new Promise((resolve, reject) => {
        axios.post(util.apicc + '/index/index', resParams )
            .then(response => {
                resolve(response)
            }, err => {
                reject(err)
            })
            .catch((error) => {
               reject(error)
            })
    })
}

export default { 
    
/*******   销售     *******/
    merLogin(params) {return fetchsale('sale_merlogin', params)},// 商户登录
    merBidList(params) {return fetchsale('sale_merBidList', params)},// 商户 今日竞价列表
    orderList(params) {return fetchsale('sale_orderList', params)},// 今日竞价单列表
    editBidPrice(params) {return fetchsale('sale_editBidPrice', params)},// 商户 编辑竞价单价格
    historyBidList(params) {return fetchsale('sale_historyBidList', params)},// 历史报价
    historybiddetail(params) {return fetchsale('sale_historybiddetail', params)},//历史竞价 详情
    merBidDetailList(params) {return fetchsale('sale_merBidDetailList', params)},//竞价明细 列表
    getMerchantInfo(params) {return fetchsale('sale_getMerchantInfo', params)},//商户信息
    historyRecharge(params) {return fetchsale('sale_historyRecharge', params)},//商户信息
    historyPay(params) {return fetchsale('sale_historyPay', params)},//商户信息
    rechargeApply(params) {return fetchsale('sale_rechargeApply', params)},//商户信息
    moneyRecord(params) {return fetchsale('sale_moneyRecord', params)},//商户信息
    maintainList(params) {return fetchsale('sale_maintainList', params)},//商户信息
    editMaintainDetail(params) {return fetchsale('sale_editMaintainDetail', params)},//商户信息
    editLevelDetail(params) {return fetchsale('sale_editLevelDetail', params)},//商户信息
    mapPriceList(params) {return fetchsale('sale_mapPriceList', params)},//商户信息
    mapRateList(params) {return fetchsale('sale_mapRateList', params)},//商户信息
    
    getBrand(params) {return fetchsale('goods_getBrand', params)},//商户信息
    getProductList(params) {return fetchsale('goods_getModel', params)},//商户信息

    
    
}
