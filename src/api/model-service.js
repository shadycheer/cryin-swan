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

const url = CONSTANT.url

export const modelService = {}

modelService.fetchModelData = () => {
  return axios.get(url + API_LIST.getModelList).then(res => res.data)
}

modelService.fetchDefiniteModelData = (id) => {
  return axios.get(url + API_LIST.getDefiniteCharacterInfo + id).then(res => res.data.data)
}

export default modelService
