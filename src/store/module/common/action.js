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
  setCharacterInfo ({ commit }, value) {
    commit(TYPES.CHARACTER_INFO, value)
  },
  updateUserCharacter ({ commit }, value) {
    commit(TYPES.USER_CHARACTER, value)
  },
  updateUserStatus ({ commit }, value) {
    commit(TYPES.USER_STATUS, value)
  },
  resetAllData ({ commit }) {
    commit(TYPES.RESET_ALL_INFO)
  },
  updateNextShow ({ commit }, value) {
    commit(TYPES.UPDATE_NEXT_SHOW, value)
  }
}
