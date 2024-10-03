// https://dummyjson.com/products/search?q=
import axios from 'axios'
import { baseUrl } from '@/url'

export const fetchProductCategorieApi = () => {
  return axios.get(`${baseUrl}products/categories`).then((response) => response)
}

export const fetchProductsApi = (search, itemPerPage, page, selectOrder) => {
  return axios
    .get(
      `${baseUrl}products/search?q=${search}&limit=${itemPerPage}&skip=${page}&sortBy=price&order=${selectOrder}`
    )
    .then((response) => response)
}

export const fetchProductsCategoryApi = (category, itemPerPage, page, selectOrder) => {
  return axios
    .get(
      `${baseUrl}products/category/${category}?limit=${itemPerPage}&skip=${page}&sortBy=price&order=${selectOrder}`
    )
    .then((response) => response)
}
