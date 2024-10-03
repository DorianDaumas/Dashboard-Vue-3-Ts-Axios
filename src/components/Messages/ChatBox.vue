<template>
  <div style="background: transparent">
    <SidenavChat v-model="drawer" v-if="$vuetify.display.mdAndDown"></SidenavChat>

    <v-container fluid style="padding-top: 0">
      <v-row direction="column" style="height: 100%">
        <v-col v-if="drawer && $vuetify.display.lgAndUp" :md="3">
          <DesktopMenu :drawer="drawer" :message="props"></DesktopMenu>
        </v-col>

        <v-col :md="drawer && $vuetify.display.lgAndUp ? 9 : 12" height="100%">
          <v-card
            color="#27293d"
            :class="storeTheme.theme ? 'data-table' : 'theme-on'"
            class="container-mail-detail mx-auto"
          >
            <v-toolbar color="transparent">
              <template v-slot:prepend>
                <v-btn
                  @click.stop="drawer = !drawer"
                  :icon="drawer ? 'mdi-menu-open' : 'mdi-menu'"
                ></v-btn>
              </template>

              <v-toolbar-title class="text-h6">
                <div style="display: flex; align-items: center">
                  <v-avatar size="45px">
                    <v-img
                      alt="Avatar"
                      src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460"
                    ></v-img>
                  </v-avatar>
                  <div
                    style="
                      margin-left: 10px;
                      line-height: normal;
                      display: flex;
                      flex-direction: column;
                    "
                  >
                    <span style="font-size: 0.875rem">Pierre Fuxg</span>
                    <span style="font-size: 0.75rem !important; color: #748892 !important">
                      Developper
                    </span>
                  </div>
                </div>
              </v-toolbar-title>

              <template v-slot:append>
                <v-btn variant="text" icon="mdi-phone-outline"></v-btn>
                <v-btn variant="text" icon="mdi-camera-outline"></v-btn>
                <v-btn variant="text" icon="mdi-information-outline"></v-btn>
                <v-btn icon="mdi-dots-vertical"></v-btn>
              </template>
            </v-toolbar>
            <v-divider></v-divider>

            <v-card-text class="container-message-user-chat">
              <div class="container-message-receive">
                <div class="container-message-send">
                  <v-spacer></v-spacer>
                  <div class="container-message-text-send">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                    Ipsum has been the industry's standard dummy text ever since the 1500s.
                  </div>
                </div>
                <div style="display: flex">
                  <v-avatar size="36px">
                    <v-img
                      alt="Avatar"
                      src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460"
                    ></v-img>
                  </v-avatar>
                  <div style="margin-left: 10px">
                    <span>Pierre Fuxg <span style="font-size: 10px"> 11H23</span></span>
                    <div class="container-message-text-receive">
                      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                      Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
                    </div>
                  </div>
                </div>
              </div>
              <br />
              <div class="container-message-send">
                <v-spacer></v-spacer>
                <div class="container-message-text-send">
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                  Ipsum has been the industry's standard dummy text ever since the 1500s.
                </div>
              </div>
              <div style="display: flex">
                <v-avatar size="36px">
                  <v-img
                    alt="Avatar"
                    src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460"
                  ></v-img>
                </v-avatar>
                <div style="margin-left: 10px">
                  <span>Pierre Fuxg <span style="font-size: 10px"> 11H23</span></span>
                  <div class="container-message-text-receive">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                    Ipsum has been the industry's standard dummy text ever since the 1500s.
                  </div>
                  <br />
                  <div class="container-message-text-receive">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                    Ipsum has been the industry's standard dummy text ever since the 1500s.
                  </div>
                </div>
              </div>
            </v-card-text>

            <v-divider></v-divider>

            <div class="container-actions">
              <v-card-actions>
                <v-textarea
                  row-height="20"
                  rows="2"
                  clearable
                  variant="underlined"
                  placeholder="Ecrivez votre message"
                ></v-textarea>
              </v-card-actions>

              <v-divider></v-divider>

              <v-card-actions>
                <v-btn variant="text" icon="mdi-paperclip"></v-btn>
                <v-btn variant="text" icon="mdi-image-outline"></v-btn>
                <v-btn variant="text" icon="mdi-emoticon-outline"></v-btn>
                <v-btn variant="text" icon="mdi-volume-high"></v-btn>

                <v-spacer></v-spacer>
                <v-btn
                  style="transform: rotate(-45deg)"
                  color="primary"
                  icon="mdi-send-outline"
                ></v-btn>
              </v-card-actions>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script setup lang="ts">
import { defineProps, onMounted, ref } from 'vue'
import type { messageType } from '@/components/Messages/messageType'
import SidenavChat from './SidenavChat.vue'
import DesktopMenu from './DesktopMenu.vue'
import { provide } from 'vue'
import { useDisplay } from 'vuetify'
import { useThemeStore } from '@/stores/App'

const storeTheme = useThemeStore()
const props = defineProps<messageType>()
const drawer = ref<boolean>(true)
const device = useDisplay().mdAndDown

onMounted(() => {
  if (device.value) {
    drawer.value = false
  }
})

provide(/* key */ 'message', /* value */ props)
</script>
<style lang="scss">
.container-message-user-chat {
  height: calc(100vh - 425px);
  overflow: auto;
}
.container-message-text-receive {
  border: 1px solid grey;
  border-radius: 10px;
  padding: 10px;
  width: 70%;
}
.container-message-text-send {
  background: #4680ff;
  border-radius: 10px;
  margin: 0px 0px 0px auto;
  padding: 10px;
  width: 70%;
}
.container-actions {
  margin-left: 20px;
  margin-right: 20px;
}
.container-text-message {
  max-height: 100px;
  overflow: auto;
}
.container-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  div:last-child {
    font-size: 0.8rem;
  }
}
.container-mail-detail {
  border-radius: 15px;
  // height: 100%;
}

.container-message {
  overflow: auto;
  height: 500px;
  max-height: 500px !important;
  span {
    font-weight: 400;
    color: #748892 !important;
  }
}

.container-mail {
  max-width: 1200px;
  height: 860px;
  overflow: auto;
  margin: auto;
  border: 1px solid grey;
  border-radius: 10px;
}
</style>
