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
    state['common/userInfo'].status = value
  }
}

export default {
  namespaced: true,
  state: moduleState,
  mutations,
  actions
}
