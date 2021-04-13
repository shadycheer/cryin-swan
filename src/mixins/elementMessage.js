/**
 *
 * @description:
 *
 * @author shadycheer
 *
 **/
import {
  CHOOSE_MODEL_ROUTE_NAME,
  ENTRY_ROUTE_NAME,
  GUIDE_ROUTE_NAME,
  MAINTAIN_ROUTE_NAME,
  MISSION_ONE_ROUTE_NAME,
  MISSION_THREE_ROUTE_NAME,
  MISSION_TWO_ROUTE_NAME
} from '@/router/constant'
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
          await userInfoUpdate.characterStatusSetter(this.objectInfo)
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
          info.data.characterId !== 0 ?
            this.$router.push({ name: ENTRY_ROUTE_NAME.ThreeFrame }) : this.$router.push({ name: CHOOSE_MODEL_ROUTE_NAME.Home })
        }
      })
    },
    $_openRegisterMessage (boolean) {
      let str = ''
      str = boolean ? '注册成功！' : '未知错误！'
      this.$alert(`${str}`, 'CRYIN-SWAN', {
        type: boolean ? 'success' : 'error',
        confirmButtonText: boolean ? '前往登录' : '返回'
      }).then(() => {
        this.togglePage()
      })
    },
    $_openGuideRouterMessage () {
      let msg = '检测到您尚未完成教学关卡，是否进入教学模式？'
      this.$confirm(`${msg}`, 'CRYIN-SWAN', {
        confirmButtonText: '进入教学关卡',
        cancelButtonText: '跳过',
      }).then(async () => {
        await userInfoUpdate.updateNextMissionShowSetter(GUIDE_ROUTE_NAME.Home, false)
        this.$router.push({ name: GUIDE_ROUTE_NAME.Home })
      }).catch(async () => {
        let statusCheck = await userService.updateStatus()
        console.log(statusCheck)
        if (statusCheck) await userInfoUpdate.updateUserStatus()
      })
    },

    $_logoutMessage () {
      let msg = '退出登录？'
      this.$confirm(`${msg}`, 'CRYIN-SWAN', {
        confirmButtonText: '退出',
        cancelButtonText: '取消',
      }).then(() => {
        userInfoUpdate.resetAllData()
        this.$router.push({ name: MAINTAIN_ROUTE_NAME.Home })
      }).catch(() => {
      })
    },

    $_chooseMissionMessage (mission) {
      let missionText
      let routerName
      switch (mission) {
        case 1:
          missionText = '第一关'
          routerName = MISSION_ONE_ROUTE_NAME.Home
          break
        case 2:
          missionText = '第二关'
          routerName = MISSION_TWO_ROUTE_NAME.Home
          break
        case 3:
          missionText = '第三关'
          routerName = MISSION_THREE_ROUTE_NAME.Home
          break
        default:
          break
      }
      let msg = `是否进入${missionText}?`
      this.$confirm(`${msg}`, 'CRYIN-SWAN', {
        confirmButtonText: '进入',
        cancelButtonText: '取消',
      }).then(async () => {
        await userInfoUpdate.updateNextMissionShowSetter(routerName, false)
        this.$router.push({ name: routerName })
      }).catch(() => {
      })
    },
    $_startGameMessage () {
      let msg = `开始游戏将从第一关开始，确定继续吗？`
      this.$confirm(`${msg}`, `CRYIN-SWAN`, {
        confirmButtonText: '进入',
        cancelButtonText: '取消'
      }).then(async () => {
        await userInfoUpdate.updateNextMissionShowSetter(MISSION_ONE_ROUTE_NAME.Home, true)
        this.$router.push({ name: MISSION_ONE_ROUTE_NAME.Home })
      })

    }

  }
}
