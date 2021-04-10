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
// import { MessageBox } from 'element-ui'
import MyMessageBox from '@/components/message-box/MessageBox.js'

Vue.config.productionTip = false
Vue.prototype.$confirm = MyMessageBox.confirm
Vue.prototype.$alert = MyMessageBox.alert
Vue.prototype.$message = MyMessageBox.message
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#App')
