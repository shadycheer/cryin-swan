/**
 *
 * @description:
 *
 * @author shadycheer
 *
 **/
import { CHOOSE_MODEL_ROUTE_NAME } from '@/router/constant'

export default {
  methods: {
    /**
     ** 选择人物提示框
     **/
    $_openChooseModelMessage (str) {
      this.$confirm(`是否选择${str}?`, '小小英雄选择器', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '选择成功！'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消选择'
        })
      })
    },
    $_openLoginMessage (boolean) {
      let str = ''
      str = boolean ? '欢迎回来。' : '账号或密码错误！'
      this.$alert(`${str}`, 'CRYIN-SWAN', {
        type: boolean ? 'success' : 'error',
        confirmButtonText: boolean ? '进入' : '返回'
      }).then(r => {
        boolean ? this.$router.push({ name: CHOOSE_MODEL_ROUTE_NAME.Home }) : r
      })
    },
    $_openRegisterMessage (boolean) {
      let str = ''
      str = boolean ? '注册成功！' : '未知错误！'
      this.$alert(`${str}`, 'CRYIN-SWAN', {
        type: boolean ? 'success' : 'error',
        confirmButtonText: boolean ? '前往登录' : '返回'
      }).then(r => {
        console.log(r)
      })
    }

  }
}
