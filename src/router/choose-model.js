/**
 *
 * @description:
 *
 * @author shadycheer
 *
 **/
const ChooseModel = () => import(/* webpackChunkName: "chunk-entry" */ '@/views/choose-model/ChooseModel')

export default [{
  path: '/chooseModel',
  component: ChooseModel,
  name: 'choose-model-index'
}]
