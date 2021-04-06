/**
 *
 * @description:
 *
 * @author Shadycheer
 *
 **/
import { ENTRY_ROUTE_NAME } from '@/router/constant'

const Entry = () => import(/* webpackChunkName: "chunk-entry" */'@/views/entry/Entry')
const ThreeFrame = () => import(/* webpackChunkName: "chunk-entry" */'@/views/entry/ThreeFrame')

export default [{
  path: '/entry',
  component: Entry,
  children: [{
    path: '',
    redirect: to => {
      return 'home'
    }
  }, {
    path: 'home',
    name: ENTRY_ROUTE_NAME.ThreeFrame,
    component: ThreeFrame
  }]
}]
