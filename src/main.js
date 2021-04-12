/**
 *
 * @description:
 *
 * @author Shadycheer
 *
 **/
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import '@/components/base'
import './plugins/element.js'
import '@/assets/font/index.less'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#App')
