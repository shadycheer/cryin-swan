/**
 *
 * @description:
 *
 * @author shadycheer
 *
 **/
import { GUIDE_ROUTE_NAME } from '@/router/constant'

const PageContainer = () => import(/* webpackChunkName: "chunk-guide" */ '@/views/guide/index')
const Home = () => import(/* webpackChunkName: "chunk-guide" */ '@/views/guide/Guide')
export default [{
  path: '/guide',
  name: 'guide-index',
  component: PageContainer,
  children: [{
    path: '',
    redirect: to => 'home'
  }, {
    path: 'home',
    component: Home,
    name: GUIDE_ROUTE_NAME.Home
  }]
}]
