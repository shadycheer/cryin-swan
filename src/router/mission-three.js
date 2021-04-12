/**
 *
 * @description:
 *
 * @author shadycheer
 *
 **/
import { MISSION_THREE_ROUTE_NAME } from '@/router/constant'

const PageContainer = () => import(/* webpackChunkName: "chunk-mission-three" */ '@/views/mission-three/index')
const Home = () => import(/* webpackChunkName: "chunk-mission-three" */ '@/views/mission-three/MissionThree')
export default [{
  path: '/missionThree',
  component: PageContainer,
  children: [{
    path: '',
    redirect: to => 'home'
  }, {
    path: 'home',
    component: Home,
    name: MISSION_THREE_ROUTE_NAME.Home
  }]
}]
