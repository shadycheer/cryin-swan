import 'element-ui/lib/theme-chalk/base.css'
// collapse 展开折叠
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition'
import { MessageBox } from 'element-ui'
import Vue from 'vue'
import {
  Button,
  Drawer,
  Progress,
  Tabs,
  TabPane
} from 'element-ui'

Vue
  .use(Button)
  .use(Drawer)
  .use(Progress)
  .use(Tabs)
  .use(TabPane)

Vue.component(CollapseTransition.name, CollapseTransition)
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$message = MessageBox
