import axios from 'axios'
import { baseUrl } from '@/url'

export const authenticationApi = (username, password, expiresInMins) => {
  const params = { username, password, expiresInMins }
  return axios.post(`${baseUrl}auth/login`, params).then((response) => response)
}

export const getCurrentUserApi = () => {
  return axios.get(`${baseUrl}auth/me`).then((response) => response)
}

export const refreshTokenApi = (refreshToken, expiresInMins) => {
  const params = { refreshToken, expiresInMins }
  return axios.post(`${baseUrl}auth/refresh`, params).then((response) => response)
}
