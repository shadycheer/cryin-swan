/**
 *
 * @description:
 *
 * @author Shadycheer
 *
 **/
import { MAINTAIN_ROUTE_NAME } from '@/router/constant'

const Main = () => import(/* webpackChunkName: "chunk-maintain" */'@/views/maintain/index')
const Home = () => import(/* webpackChunkName: "chunk-maintain" */'@/views/maintain/Home')
const Login = () => import(/* webpackChunkName: "chunk-maintain" */ '@/views/maintain/Login')
const AboutUs = () => import(/* webpackChunkName: "chunk-maintain" */ '@/views/maintain/AboutUs')
export default [{
  path: '/main',
  component: Main,
  children: [{
    path: '',
    redirect: to => 'home'
  }, {
    path: 'home',
    name: MAINTAIN_ROUTE_NAME.Home,
    component: Home,
    meta: {
      index: 2,
      keepAlive: true
    }
  }, {
    path: 'login',
    name: MAINTAIN_ROUTE_NAME.Login,
    component: Login,
    meta: {
      index: 1,
      keepAlive: true
    }
  }, {
    path: 'aboutUs',
    name: MAINTAIN_ROUTE_NAME.AboutUs,
    component: AboutUs,
    meta: {
      index: 1,
      keepAlive: false
    }
  }]
}]
