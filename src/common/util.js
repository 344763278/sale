var SIGN_REGEXP = /([yMdhsm])(\1*)/g
var DEFAULT_PATTERN = 'yyyy-MM-dd'
import md5 from '../md5.js'
// 字符长度验证  汉字2字符 英文1字符
String.prototype.gblen = function() {  
  var len = 0  
  for (var i=0; i<this.length; i++) {  
    if (this.charCodeAt(i)>127 || this.charCodeAt(i)==94) {  
       len += 2  
     } else {  
       len ++
     }  
   }  
  return len
}

function padding(s, len) {
  let l = len - (s + '').length
  for (var i = 0; i < l; i++) { s = '0' + s }
  return s
}

 
export default{
    apicc :  process.env.NODE_ENV == 'development'?'/pengkuan':'' ,
    // apicc :  process.env.NODE_ENV == 'development'?'http://dev-saleapi.huishoubao.com':'' ,
    // apiCross :  process.env.NODE_ENV == 'development'?'http://2bamc.com':'https://dev-amc-server.huanjixia.com' , //PHP本地 、
    // apiCross :  process.env.NODE_ENV == 'development'?'https://dev-amc-server.huanjixia.com':'https://dev-amc-server.huanjixia.com' ,  //开发环境(51测试环境)
    // apiCross :  process.env.NODE_ENV == 'development'?'https://dev-amc-server.huanjixia.com':'https://amc-server.huanjixia.com' ,//开发环境 、线上环境

    contains(arr, obj) {
        var i = arr.length;  
        while (i--) {  
            if (arr[i] === obj) {  
                return true;  
            }  
        }  
        return false;  
    },
    setCookie(name, value) {
        var Days = 30
        var exp = new Date()
        exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000)
        document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString()
    },
    getCookie(name){
        var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)")
        if(arr=document.cookie.match(reg))
        return unescape(arr[2])
        else
        return null
    },
    delCookie(name){
        var exp = new Date()
        exp.setTime(exp.getTime() - 1)
        var cval=this.getCookie(name)
        if(cval!=null)
        document.cookie= name + "="+cval+";expires="+exp.toGMTString()
    },
    beforeAvatarUpload1(file) {
        const isJpeg = file.type === 'image/jpeg'
        const isPng = file.type === 'image/png'
        const isJPG = file.type === 'image/jpg'
        const isLt1M = file.size / 1024 / 1024 < 1
        var flags
        if ((!isJpeg) && (!isPng) && (!isJPG)) {
            flags = false
            alert('只上传头像图片格式为.jpg .png .jpeg!')
        }
        if (!isLt1M) {
          this.$message.error('上传头像图片大小不能超过 1MB!')
        }
        return flags && isLt1M
    },
    combineCell:function(list) {
        for (var field in list[0]) {
            var k = 0
            while (k < list.length) {
                list[k][field + 'Span'] = 1
                list[k][field + 'Dis'] = false
                for (var i = k + 1; i <= list.length - 1; i++) {
                    if (list[k][field] == list[i][field] && list[k][field] != '') {
                        list[k][field + 'Span']++
                        list[k][field + 'Dis'] = false
                        list[i][field + 'Span'] = 1
                        list[i][field + 'Dis'] = true
                    } else {
                        break
                    }
                }
                k = i
            }
        }
        return list
    },
    // 获取对应城市
    getCitys: function(val , addrList) {
        if(!val) {
            addrList.citys = [] 
            return
        }
        let provinces = addrList.provinces
        for (var index in provinces) {
            if (provinces[index].strProvinceId == val) {
                addrList.citys = provinces[index].citys
            }
        }
    },
    // 获取对应区域
    getAreas: function(val , addrList) {
        if(!val) {
            addrList.areas = [] 
            return
        }
        let citys = addrList.citys
        for (var index in citys) {
            if (citys[index].strCityId == val) {
                addrList.areas = citys[index].areas
            }
        }
    },
    // 特殊字符串处理
    checkSpecialWord :function(val){ 
        var reg = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]")
        return reg.test(val)
        
    },
    ValidateValue: function(textbox){
        var IllegalString = "\`~@#;,.!#$%^&*()+{}|\\:\"<>?-=/。，。\'"
        var textboxvalue = textbox.value
        var index = textboxvalue.length - 1

        var s = textbox.value.charAt(index)

        if(IllegalString.indexOf(s)>=0)
        {
            s = textboxvalue.substring(0,index)
            textbox.value = s
        }
    },
    
    // 提交数据验证
    Validate :function(list){
        for(var index in list){
            if(!list[index].val) {
                alert(list[index].msg) 
                return false 
            }
        }
        return true
    },

    Trim: function(str) {
        if(!str) return str
        else return str.replace(/(^\s*)|(\s*$)/g, "")
    },

    getQueryStringByName: function(name) {
      var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
      var r = window.location.search.substr(1).match(reg)
      var context = ''
      if (r != null) { context = r[2] }
      reg = null
      r = null
      return context === null || context === '' || context === 'undefined' ? '' : context
    },
    formatDate: {

      format: function(date, pattern) {
        pattern = pattern || DEFAULT_PATTERN
        return pattern.replace(SIGN_REGEXP, function($0) {
          switch ($0.charAt(0)) {
            case 'y':
              return padding(date.getFullYear(), $0.length)
            case 'M':
              return padding(date.getMonth() + 1, $0.length)
            case 'd':
              return padding(date.getDate(), $0.length)
            case 'w':
              return date.getDay() + 1
            case 'h':
              return padding(date.getHours(), $0.length)
            case 'm':
              return padding(date.getMinutes(), $0.length)
            case 's':
              return padding(date.getSeconds(), $0.length)
          }
        })
      },
      parse: function(dateString, pattern) {
        var matchs1 = pattern.match(SIGN_REGEXP)
        var matchs2 = dateString.match(/(\d)+/g)
        if (matchs1.length === matchs2.length) {
          var _date = new Date(1970, 0, 1)
          for (var i = 0; i < matchs1.length; i++) {
            var _int = parseInt(matchs2[i])
            var sign = matchs1[i]
            switch (sign.charAt(0)) {
              case 'y':
                _date.setFullYear(_int);
                break
              case 'M':
                _date.setMonth(_int - 1);
                break
              case 'd':
                _date.setDate(_int);
                break
              case 'h':
                _date.setHours(_int);
                break
              case 'm':
                _date.setMinutes(_int);
                break
              case 's':
                _date.setSeconds(_int);
                break
            }
          }
          return _date
        }
        return null
      },
    },
    getSignMd5: function(data) {
        var signArr = [];
        var signJson = {};
        for (var i in data.head) {
            if (data.head[i] != '') {
                signArr.push(i);
                signJson[i] = data.head[i];
            }
        }
        for (var i in data.params) {
            if (data.params[i] != '') {
                signArr.push(i);
                signJson[i] = data.params[i];
            }
        }
        signArr.sort(function(a, b) {
            return a + '' > b + '';
        })

        var sign = ''

        // 按照顺序拼接
        for (var i = 0; i < signArr.length; i++) {
            sign += signArr[i];
            sign += '=';
            sign += signJson[signArr[i]];
            sign += '&';
        }

        var lastKey = 'key=m2cjgx46md5973n4ymeoxa4v195iwwmb'
        sign += lastKey;
        console.log(sign);
        sign = md5.hex_md5(sign);
        sign = sign.toLowerCase();

        return sign;
    }
    

}
