<template>
  <div>
    <ChatBox :message="messages.message"></ChatBox>
  </div>
</template>
<script lang="ts" setup>
import ChatBox from '@/components/Messages/ChatBox.vue'
import { useMessageStore } from '@/stores/Messages'
import { ref, onMounted } from 'vue'
import { messageSchema, type messageType } from '@/components/Messages/messageType'

const storeMessage = useMessageStore()

const messages = ref<messageType>(messageSchema)

onMounted(() => {
  storeMessage.fetchMessages().then((val) => {
    messages.value.message = val.content.message
  })
})
</script>
<style lang=""></style>
