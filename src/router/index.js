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

Vue.use(Router)

const routes = [
  ...Entry
]

const router = new Router({
  mode: 'hash',
  routes
})

export default router
