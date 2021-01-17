/**
 *
 * @description:
 *
 * @author Shadycheer
 *
 **/

const PageContainer = () => import(/* webpackChunkName: "chunk-entry" */'@/views/entry/page-container')
const ThreeFrame = () => import(/* webpackChunkName: "chunk-entry" */'@/views/entry/')

import {ENTRY_ROUTE_NAME} from '@/router/constant'

export default [{
  path: '/entry',
  component: PageContainer,
  children: [{
    path:'',
    redirect:to => {
      return 'home'
    }
  },{
    path: 'home',
    name: ENTRY_ROUTE_NAME.Home,
    meta: {
      keepAlive:true,
      pageSource: 'entry_home_page'
    }
  },{
    path: ''
  }]
}]
