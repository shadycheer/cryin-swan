/**
 *
 * @description:
 *
 * @author shadycheer
 *
 **/

const Guide = () => import(/* webpackChunkName: "chunk-guide" */'@/views/guide/Guide')

export default [{
  path: '/guide',
  name: 'guide-index',
  component: Guide
}]
