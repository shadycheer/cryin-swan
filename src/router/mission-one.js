/**
 *
 * @description:
 *
 * @author shadycheer
 *
 **/
import { MISSION_ONE_ROUTE_NAME } from '@/router/constant'

const PageContainer = () => import(/* webpackChunkName: "chunk-mission-one" */ '@/views/mission-one/index')
const Home = () => import(/* webpackChunkName: "chunk-mission-one" */ '@/views/mission-one/MissionOne')
export default [{
  path: '/missionOne',
  component: PageContainer,
  children: [{
    path: '',
    redirect: to => 'home'
  }, {
    path: 'home',
    component: Home,
    name: MISSION_ONE_ROUTE_NAME.Home
  }]
}]
