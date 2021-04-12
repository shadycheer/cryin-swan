/**
 *
 * @description:
 *
 * @author shadycheer
 *
 **/
import { MISSION_TWO_ROUTE_NAME } from '@/router/constant'

const PageContainer = () => import(/* webpackChunkName: "chunk-mission-two" */ '@/views/mission-two/index')
const Home = () => import(/* webpackChunkName: "chunk-mission-two" */ '@/views/mission-two/MissionTwo')
export default [{
  path: '/missionTwo',
  component: PageContainer,
  children: [{
    path: '',
    redirect: to => 'home'
  }, {
    path: 'home',
    component: Home,
    name: MISSION_TWO_ROUTE_NAME.Home
  }]
}]
