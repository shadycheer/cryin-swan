/**
 *
 * @description:
 *
 * @author shadycheer
 *
 **/
import NotFound from '@/views/base/404'

export default [
  {
    path: '/',
    redirect: '/entry'
  },
  {
    path: '/*',
    name: '404',
    component: NotFound
  }
]
