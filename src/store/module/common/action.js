/**
 *
 * @description:
 *
 * @author shadycheer
 *
 **/
import * as TYPES from './constant'

export default {
  setToken ({ commit }, value) {
    commit(TYPES.TOKEN, value)
  },
  setUserInfo ({ commit }, value) {
    commit(TYPES.USER_INFO, value)
  },
  updateUserCharacter ({ commit }, value) {
    commit(TYPES.USER_CHARACTER, value)
  },
  updateUserStatus ({ commit }, value) {
    commit(TYPES.USER_STATUS, value)
  }
}
