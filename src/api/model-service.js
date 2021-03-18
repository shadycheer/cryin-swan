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

export const modelService = {}

modelService.fetchModelData = () => {
  return axios.get(CONSTANT.url + API_LIST.getModelList).then(res => res.data)
}

export default modelService
