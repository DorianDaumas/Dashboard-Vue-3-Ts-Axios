import axios from 'axios'
import { baseUrl } from '@/url'

export const fetchUsersApi = (itemPerPage, page, search) => {
  return axios
    .get(`${baseUrl}users/search?q=${search}&limit=${itemPerPage}&skip=${page}`)
    .then((response) => response)
}

export const fetchPermissionsListApi = () => {
  return axios.get(`${baseUrl}c/0afc-edfb-48c4-9800`).then((response) => response)
}
