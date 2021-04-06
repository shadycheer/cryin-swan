/**
 *
 * @description:
 *
 * @author shadycheer
 *
 **/
import Store from '@/store'
import userService from '@/api/user-service'

export const userInfoUpdate = {}

userInfoUpdate.tokenSetter = async (token) => {
  await Store.dispatch('common/setToken', token)
  localStorage.setItem('token', token)
}

userInfoUpdate.tokenGetter = async () => {
  if (Store.state['common/token']) {
    return Store.state['common/token']
  } else if (localStorage.getItem('token')) {
    const token = localStorage.getItem('token')
    await Store.dispatch('common/setToken', token)
    return token
  } else {
    return ''
  }
}

userInfoUpdate.userInfoSetter = async (value) => {
  await Store.dispatch('common/setUserInfo', value)
  localStorage.setItem('userInfo', JSON.stringify(value))
}

userInfoUpdate.userInfoGetter = async () => {
  if (Store.state['common/userInfo']) {
    return Store.state['common/userInfo']
  } else if (localStorage.getItem('userInfo')) {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    await Store.dispatch('common/setUserInfo', userInfo)
    return userInfo
  } else {
    const userInfo = await userService.getUserInfo()
    await userInfoUpdate.userInfoSetter(userInfo)
    return userInfo
  }
}

userInfoUpdate.updateUserCharacter = async (id) => {
  await Store.dispatch('common/updateUserCharacter', id)
  let userInfo = JSON.parse(localStorage.getItem('userInfo'))
  userInfo.characterId = id
  localStorage.setItem('userInfo', JSON.stringify(userInfo))
}

userInfoUpdate.userCharacterGetter = async () => {
  if (Store.state.common.userInfo.characterId) {
    return Store.state.common.userInfo.characterId
  } else if (JSON.parse(localStorage.getItem('userInfo')).characterId) {
    return JSON.parse(localStorage.getItem('userInfo')).characterId
  } else {
    const userInfo = await userService.getUserInfo()
    await userInfoUpdate.userInfoGetter(userInfo)
    return userInfo.characterId
  }
}

export default userInfoUpdate
