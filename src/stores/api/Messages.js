import axios from 'axios'
import { baseUrl } from '@/url'

export const fetchMessagesApi = () => {
  return axios.get(`${baseUrl}comments?limit=10&skip=10`).then((response) => response)
}
