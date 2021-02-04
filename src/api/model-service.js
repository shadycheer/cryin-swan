/**
 *
 * @description:
 *
 * @author shadycheer
 *
 **/
import axios from 'axios'

export const modelService = {}
const url = 'http://localhost:8080'

modelService.fetchModelData = () => {
  return axios.get(url + '/character/list').then(res => res.data)
}

export default modelService
