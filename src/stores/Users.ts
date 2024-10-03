import { ref } from 'vue'
import { defineStore } from 'pinia'
import { fetchUsersApi } from './api/User'
import type { APIResponse } from './ApiType'
import { AxiosError } from 'axios'
import type { usersType } from '@/components/Users/usersType'
import { usersSchema } from '@/components/Users/usersType'

export const useUsersStore = defineStore('users', () => {
  const allUsers = ref<usersType>(usersSchema)
  const loadingUsers = ref(false)

  const fetchAllUsers = async (
    itemPerPage: number,
    page: number,
    search: string | undefined
  ): Promise<APIResponse<usersType>> => {
    loadingUsers.value = true
    try {
      const { status, data } = await fetchUsersApi(itemPerPage, page, search)
      if (status === 200) {
        allUsers.value.total = data.total
        allUsers.value.users = data.users
        loadingUsers.value = false
        return {
          success: true,
          content: data,
          status: 200
        }
      }
    } catch (error) {
      const _error = error as AxiosError<string>
      loadingUsers.value = false
      return {
        success: false,
        status: _error.status,
        content: allUsers.value
      }
    }
    loadingUsers.value = false
    return {
      success: true,
      content: allUsers.value
    }
  }

  return { allUsers, fetchAllUsers, loadingUsers }
})
