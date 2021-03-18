/**
 *
 * @description:
 *
 * @author shadycheer
 *
 **/
import { CHOOSE_MODEL_ROUTE_NAME } from '@/router/constant'

const PageContainer = () => import(/* webpackChunkName: "chunk-entry" */ '@/views/choose-model/index')
const ChooseModel = () => import(/* webpackChunkName: "chunk-entry" */ '@/views/choose-model/ChooseModel')

export default [{
  path: '/chooseModel',
  component: PageContainer,
  name: CHOOSE_MODEL_ROUTE_NAME.PageContainer,
  children: [{
    path: '',
    redirect: to => 'home'
  }, {
    path: 'home',
    component: ChooseModel,
    name: CHOOSE_MODEL_ROUTE_NAME.Home
  }]
}]
