/*
 * @author: Shadycheer
 * @Date: 2021-01-16 02:31:06
 * @LastEditTime: 2021-01-16 02:40:22
 * @LastEditor: Shadycheer
 */
/*
 * @author: Shadycheer
 * @Date: 2021-01-16 02:31:06
 * @LastEditTime: 2021-01-16 02:39:59
 * @LastEditor: Shadycheer
 */
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#App')
