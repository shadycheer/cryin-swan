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

Vue.use(Router)

const routes = [
  ...Entry, ...Guide, ...ChooseModel, ...Base
]

const router = new Router({
  mode: 'hash',
  routes
})

export default router
