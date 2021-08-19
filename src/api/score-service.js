/**
 *
 * @description:
 *
 * @author shadycheer
 *
 **/
import axios from 'axios'
import CONSTANT from '@/api/constant'
import API_LIST from '@/api/api-list'
import userInfoUpdate from '@/common/user-info-update'

const url = CONSTANT.url

export const scoreService = {}

scoreService.fetchMyselfData = async () => {
  return axios.get(
    url + API_LIST.getSelfScore,
    {
      headers: {
        'Authorization': await userInfoUpdate.tokenGetter()
      }
    }
  ).then(res => res.data.data)
}

scoreService.fetchAllData = async (type) => {
  return axios.get(url + API_LIST.getAllScore + type,).then(res => res.data.data)
}

scoreService.updateUserScore = async (type, characterId, score) => {
  return axios.post(
    url + API_LIST.updateScore,
    {
      characterId,
      score,
      type
    },
    {
      headers: {
        'Authorization': await userInfoUpdate.tokenGetter()
      }
    }
  ).then(res => res.data)
}
