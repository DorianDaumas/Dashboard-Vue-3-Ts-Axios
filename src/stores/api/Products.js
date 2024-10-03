import axios from 'axios'
import { baseUrl } from '@/url'

export const fetchUnitProductApi = (productId) => {
  return axios.get(`${baseUrl}products/${productId}`).then((response) => response)
}

export const fetchOtherProductsApi = (skip) => {
  return axios.get(`${baseUrl}products?limit=5&skip=${skip}`).then((response) => response)
}

export const fetchUserProductApi = (userId) => {
  return axios.get(`${baseUrl}users/${userId}/carts`).then((response) => response)
}
