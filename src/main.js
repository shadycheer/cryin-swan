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
import { MessageBox } from 'element-ui'

Vue.config.productionTip = false
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$message = MessageBox
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#App')
