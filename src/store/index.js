import Vue from 'vue'
import Vuex from 'vuex'

import modules from './module'

Vue.use(Vuex)

export const Store = new Vuex.Store({
  modules,
  strict: false
})

export default Store
