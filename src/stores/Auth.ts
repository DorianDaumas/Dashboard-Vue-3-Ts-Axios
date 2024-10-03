import { ref } from 'vue'
import { defineStore } from 'pinia'
import { authenticationApi, getCurrentUserApi, refreshTokenApi } from './api/Auth'
import type { APIResponse } from './ApiType'
import { currentUserSchema, type profilType } from '@/components/Profil/profilType'
import { AxiosError } from 'axios'
import type { tokenInterface } from './TokenType'

export const useAuthenticationStore = defineStore('auth', () => {
  const currentUsers = ref<profilType>(currentUserSchema)

  const isLogged = ref(JSON.parse(localStorage.getItem('token')!))

  const getCurrentUser = async (): Promise<APIResponse<profilType>> => {
    try {
      const { status, data } = await getCurrentUserApi()
      if (status === 200) {
        currentUsers.value = data
        isLogged.value = true
        return {
          success: true,
          content: currentUsers.value,
          status: 200
        }
      }
    } catch (error) {
      const _error = error as AxiosError<string>
      if (_error.status === 401) {
        isLogged.value = true
      }
      return {
        success: false,
        status: _error.status,
        content: currentUsers.value
      }
    }
    return {
      success: false,
      content: currentUsers.value,
      status: 400
    }
  }

  const refreshToken = async (
    refreshToken: string,
    expiresInMins: number
  ): Promise<APIResponse<tokenInterface>> => {
    let token = {
      accessToken: '',
      refreshToken: ''
    }
    try {
      const { status, data } = await refreshTokenApi(refreshToken, expiresInMins)
      if (status === 200) {
        token = {
          accessToken: data.accessToken,
          refreshToken: data.refreshToken
        }
        return {
          success: true,
          content: data,
          status: 200
        }
      }
    } catch (error) {
      const _error = error as AxiosError<string>
      return {
        success: false,
        status: _error.status,
        content: token
      }
    }
    return {
      success: false,
      content: token,
      status: 400
    }
  }

  const authentication = async (
    username: string,
    password: string,
    expiresInMins: number
  ): Promise<APIResponse<profilType>> => {
    try {
      const { status, data } = await authenticationApi(username, password, expiresInMins)
      if (status === 200) {
        isLogged.value = true
        const token = {
          accessToken: data.accessToken,
          refreshToken: data.refreshToken
        }
        localStorage.setItem('token', JSON.stringify(token))
        getCurrentUser()
        return {
          success: true,
          content: currentUsers.value,
          status: 200
        }
      }
    } catch (error) {
      const _error = error as AxiosError<string>
      return {
        success: false,
        status: _error.status,
        content: currentUsers.value
      }
    }
    return {
      success: false,
      content: currentUsers.value
    }
  }

  const logout = () => {
    currentUsers.value = {
      id: 0,
      username: '',
      email: '',
      firstName: '',
      lastName: '',
      gender: '',
      image: '',
      phone: '',
      age: 0,
      university: '',
      address: {
        address: '',
        city: '',
        country: '',
        state: '',
        postalCode: ''
      },
      bank: {
        cardExpire: '',
        cardNumber: '',
        cardType: '',
        currency: '',
        iban: ''
      },
      company: {
        department: '',
        name: '',
        title: ''
      },
      ssn: '',
      accessToken: '',
      refreshToken: ''
    }
    localStorage.removeItem('token')
    isLogged.value = false
  }

  return { currentUsers, authentication, getCurrentUser, refreshToken, isLogged, logout }
})
