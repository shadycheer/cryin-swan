/**
 *
 * @description:
 *
 * @author shadycheer
 *
 **/
import axios from 'axios'
import CONSTANT from './constant'
import API_LIST from '@/api/api-list'
import userInfoUpdate from '@/common/user-info-update'

const url = CONSTANT.url
export const userService = {}

userService.getUserInfo = async () => {
  return axios.get(
    url + API_LIST.getUserInfo,
    {
      headers: {
        'Authorization': await userInfoUpdate.tokenGetter()
      }
    }
  ).then(res => res.data)
}

userService.updateModel = async (id) => {
  return axios.post(
    url + API_LIST.updateUserCharacter + id,
    {},
    {
      headers: {
        'Authorization': await userInfoUpdate.tokenGetter()
      }
    }
  ).then(res => res.data.status)
}

userService.updateStatus = async () => {
  return axios.post(
    url + API_LIST.updateStatus,
    {},
    {
      headers: {
        'Authorization': await userInfoUpdate.tokenGetter()
      }
    }
  ).then(res => res.data.status)
}

export default userService
