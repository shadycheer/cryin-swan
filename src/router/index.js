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

Vue.use(Router)

const routes = [
  ...Entry, ...Base
]

const router = new Router({
  mode: 'hash',
  routes
})

export default router
