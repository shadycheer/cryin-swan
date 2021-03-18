/**
 *
 * @description:
 *
 * @author Shadycheer
 *
 **/
import Vue from 'vue'
import Router from 'vue-router'
import Entry from './entry'
import Base from './base'
import Guide from './guide'
import ChooseModel from './choose-model'
import Login from './login'

Vue.use(Router)

const routes = [
  ...Login, ...Entry, ...Guide, ...ChooseModel, ...Base
]

const router = new Router({
  mode: 'hash',
  routes
})

router.beforeEach((to, from, next) => {
  next()
})

export default router
