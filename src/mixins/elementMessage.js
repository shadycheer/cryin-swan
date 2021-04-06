/**
 *
 * @description:
 *
 * @author shadycheer
 *
 **/
import { CHOOSE_MODEL_ROUTE_NAME, ENTRY_ROUTE_NAME } from '@/router/constant'
import userInfoUpdate from '@/common/user-info-update'
import { mapState } from 'vuex'
import userService from '@/api/user-service'

export default {
  computed: {
    ...mapState('common', ['token', 'userInfo'])
  },
  methods: {
    /**
     ** 选择人物提示框
     **/
    $_openChooseModelMessage (object) {
      this.$confirm(`是否选择${object.name}?`, '小小英雄选择器', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
          let res = await userService.updateModel(object.characterId)
          if (res) await userInfoUpdate.updateUserCharacter(object.characterId)
          this.$router.push({ name: ENTRY_ROUTE_NAME.ThreeFrame })
        }
      ).catch((e) => {
        console.log(e)
        this.$message({
          type: 'info',
          message: '已取消选择'
        })
      })
    },
    async $_openLoginMessage (res) {
      console.log(res)
      console.log(res.data)
      let str = res.status ? '欢迎回来。' : '账号或密码错误！'
      if (res.status) await userInfoUpdate.tokenSetter(res.data)
      this.$alert(`${str}`, 'CRYIN-SWAN', {
        type: res.status ? 'success' : 'error',
        confirmButtonText: res.status ? '进入' : '返回'
      }).then(async () => {
        if (res.status) {
          let info = await userService.getUserInfo()
          console.log(info)
          await userInfoUpdate.userInfoSetter(info.data)
          this.$router.push({ name: CHOOSE_MODEL_ROUTE_NAME.Home })
        }
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