/**
 *
 * @description:
 *
 * @author shadycheer
 *
 **/

import * as TYPES from './constant'
import actions from './action'

const moduleState = {
  token: '',
  userInfo: {
    username: '',
    password: '',
    userId: 0,
    status: '',
    characterId: 0,
  },
  characterInfo: {
    characterId: 0,
    health: 0,
    dash: 0,
    jump: 0,
    speed: 0,
    modelUrl: ''
  }
}

const mutations = {
  [TYPES.TOKEN] (state, value) {
    state.token = value
  },
  [TYPES.USER_INFO] (state, value) {
    state.userInfo = value
  },
  [TYPES.USER_CHARACTER] (state, value) {
    state.userInfo.characterId = value
  },
  [TYPES.USER_STATUS] (state, value) {
    state.userInfo.status = value
  },
  [TYPES.CHARACTER_INFO] (state, value) {
    state.characterInfo = value
  },
  [TYPES.RESET_ALL_INFO] (state) {
    state.token = ''
    state.userInfo = {
      username: '',
      password: '',
      userId: 0,
      status: '',
      characterId: 0
    }
    state.characterInfo = {
      characterId: 0,
      health: 0,
      dash: 0,
      jump: 0,
      speed: 0,
      modelUrl: ''
    }
  }
}

export default {
  namespaced: true,
  state: moduleState,
  mutations,
  actions
}
