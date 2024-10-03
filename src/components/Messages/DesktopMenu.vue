<template>
  <v-card
    color="#27293d"
    :class="[
      storeTheme.theme ? 'data-table' : 'theme-on',
      mobile ? 'container-mail-detail align-mobile-menu' : 'container-mail-detail'
    ]"
  >
    <v-toolbar color="transparent">
      <template v-slot:prepend>
        <div style="display: flex; align-items: center; margin-left: 20px">
          <span>Messages</span>
          <v-avatar color="#4680ff" style="margin-left: 10px; font-weight: 400" size="30"
            >5</v-avatar
          >
        </div>
      </template>
    </v-toolbar>
    <v-divider></v-divider>

    <v-card-text
      :class="mobile ? 'container-message-user-chat-mobile' : 'container-message-user-chat'"
    >
      <div
        v-for="(item, index) in props.message?.message"
        :key="index"
        style="cursor: pointer"
        class="container-message-receive-sidenav"
      >
        <div style="display: flex; justify-content: space-between">
          <v-avatar size="36px">
            <v-img
              alt="Avatar"
              :src="`https://placehold.co/600x400/d04${item.user.id.toString().slice(0, 2)}b/white?text=${item.user.username.slice(0, 2)}`"
            ></v-img>
          </v-avatar>
          <div style="margin-left: 10px">
            <span
              style="
                text-transform: capitalize;
                display: flex;
                align-items: center;
                justify-content: space-between;
              "
              >{{ item.user.username }}
            </span>
            <div class="container-body-sidenav">{{ item.body.slice(0, 30) }}...</div>
          </div>
        </div>

        <div>
          <span style="font-size: 10px; white-space: pre"
            >il y a {{ item.user.id.toString().slice(0, 1) }} H</span
          >
        </div>
      </div>
    </v-card-text>

    <v-divider></v-divider>

    <v-card-actions style="margin-left: 15px">
      <v-avatar size="36px">
        <v-img alt="Avatar" :src="authStore.currentUsers.image"></v-img>
      </v-avatar>
      <span aria-label="test-username">{{ authStore.currentUsers.username }}</span>
      <v-spacer></v-spacer>
      <v-menu location="top right">
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" variant="text" icon="mdi-chevron-right"></v-btn>
        </template>

        <v-list :class="storeTheme.theme ? 'data-table' : 'theme-on'" style="background: #263240">
          <v-list-item
            aria-label="test-activity"
            hover
            v-for="(item, index) in activity"
            :key="index"
            :value="item"
          >
            <template v-slot:prepend>
              <span :style="{ background: couleur(item) }" class="activity"></span>
            </template>
            <v-list-item-title>
              <span style="font-weight: 400; font-size: 0.8rem">{{ item }}</span>
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-card-actions>
  </v-card>
</template>
<script setup lang="ts">
import type { messageType } from '@/components/Messages/messageType'
import { ref, type PropType } from 'vue'
import { useAuthenticationStore } from '@/stores/Auth'
import { useDisplay } from 'vuetify'
import { useThemeStore } from '@/stores/App'

const storeTheme = useThemeStore()
const authStore = useAuthenticationStore()
const activity = ref(['Actif', 'Absent', 'Ne pas déranger'])
const mobile = useDisplay().mdAndDown
const couleur = (val: string) => {
  if (val === 'Actif') {
    return 'green'
  } else if (val === 'Absent') {
    return 'orange'
  }
  return 'grey'
}
const props = defineProps({
  message: {
    type: Object as PropType<messageType>
  },
  drawer: Boolean
})
</script>
<style lang="scss" scoped>
.align-mobile-menu {
  margin: 10px;
  position: absolute;
  top: 50%;
  height: calc(100% - 80px);
  transform: translateY(-50%);
}
.activity {
  height: 10px;
  width: 10px;
  background: antiquewhite;
  display: inline-block;
  margin-right: 10px;
  border-radius: 50%;
}
.container-message-user-chat {
  height: calc(100vh - 425px);
  overflow: auto;
}
.container-message-user-chat-mobile {
  height: calc(100vh - 225px);
  overflow: auto;
}
.container-message-receive-sidenav {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid grey;
  margin: 10px 0px 10px 0px;
  padding-bottom: 10px;
}
.container-body-sidenav {
  color: #748892 !important;
  font-size: 0.75rem !important;
}
</style>
