/*
 * @author: Shadycheer
 * @Date: 2021-01-16 03:11:58
 * @LastEditTime: 2021-01-16 03:36:51
 * @LastEditor: Shadycheer
 */

import axios from 'axios'
import CONSTANT from '@/api/constant'
import API_LIST from '@/api/api-list'
import qs from 'qs'

const url = CONSTANT.url

export const loginService = {}

loginService.checkUsernameIsAvailable = (username) => {
  return axios.post(
    url + API_LIST.checkUsername,
    qs.stringify({ 'username': username }),
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    },
  ).then(res => res.data)
}

loginService.userLogin = (username, password) => {
  return axios.post(
    url + API_LIST.userLogin,
    {
      'username': username,
      'password': password
    }
  ).then(res => res.data)
}

loginService.userRegister = (username, password) => {
  return axios.post(
    url + API_LIST.userRegister,
    {
      'username': username,
      'password': password
    }
  ).then(res => res.data)
}
