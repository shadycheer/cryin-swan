/**
 *
 * @description:
 *
 * @author Shadycheer
 *
 **/
import { ENTRY_ROUTE_NAME } from '@/router/constant'

const PageContainer = () => import(/* webpackChunkName: "chunk-entry" */'@/views/entry/page-container')
const ThreeFrame = () => import(/* webpackChunkName: "chunk-entry" */'@/views/entry/three-frame')

export default [{
  path: '/',
  component: PageContainer,
  children: [{
    path: '',
    redirect: to => {
      return 'home'
    }
  }, {
    path: 'home',
    name: ENTRY_ROUTE_NAME.Home,
    component: ThreeFrame,
    meta: {
      keepAlive: false
    }
  }, {
    path: ''
  }]
}]
