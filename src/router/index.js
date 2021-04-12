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
import MissionOne from './mission-one'
import MissionTwo from './mission-two'
import MissionThree from './mission-three'

Vue.use(Router)

const routes = [
  ...Login, ...Entry, ...Guide, ...ChooseModel, ...MissionOne, ...MissionTwo, ...MissionThree, ...Base
]

const router = new Router({
  mode: 'hash',
  routes
})

router.beforeEach((to, from, next) => {
  next()
})

export default router
