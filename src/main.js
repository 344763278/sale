// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import '@/assets/iconfont.css'
import '@/assets/reset.css'
import router from './router'
import layer from 'vue-layer'
import func from './common/fun'

Vue.prototype.$layer = layer(Vue)
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(func)

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
