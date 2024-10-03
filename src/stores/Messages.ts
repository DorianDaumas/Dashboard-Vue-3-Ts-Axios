import { ref } from 'vue'
import { defineStore } from 'pinia'
import { messageSchema, type messageType } from '@/components/Messages/messageType'
import type { APIResponse } from './ApiType'
import { fetchMessagesApi } from './api/Messages'
import { AxiosError } from 'axios'

export const useMessageStore = defineStore('Message', () => {
  const messages = ref<messageType>(messageSchema)

  const fetchMessages = async (): Promise<APIResponse<messageType>> => {
    try {
      const { status, data } = await fetchMessagesApi()
      if (status === 200) {
        messages.value.message = data.comments
        return {
          success: true,
          content: messages.value,
          status: 200
        }
      }
    } catch (error) {
      const _error = error as AxiosError<string>

      return {
        success: false,
        status: _error.status,
        content: messages.value
      }
    }
    return {
      success: false,
      content: messages.value
    }
  }

  return { messages, fetchMessages }
})
