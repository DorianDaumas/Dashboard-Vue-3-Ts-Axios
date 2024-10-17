<template>
  <div class="header" :class="store.theme ? 'theme-header-off' : 'theme-header-on'">
    <div class="header-navigation">
      <div class="header-container-item-left">
        <v-btn
          variant="text"
          :icon="store.drawer ? 'mdi-menu-open' : 'mdi-menu'"
          @click.stop="toggleSidenav"
        ></v-btn>
        <span style="margin-left: 15px; font-size: 0.8rem; font-weight: 400">{{ path }}</span>
      </div>
      <div v-if="authStore.isLogged" class="header-container-item">
        <div class="container-bell">
          <v-menu width="400px" location="bottom right">
            <template v-slot:activator="{ props }">
              <v-badge bottom="calc(100% - 15px)" :content="59" dot color="orange">
                <v-btn icon="mdi-bell" variant="text" v-bind="props"></v-btn>
              </v-badge>
            </template>

            <v-list
              class="list-notifications"
              color="red"
              aria-label="testest"
              @click="goToChat"
              :bg-color="store.theme ? '#27293d' : '#8559df'"
            >
              <v-list-item v-for="(item, index) in items" :key="index">
                <v-container class="pa-0" fluid>
                  <v-row no-gutters>
                    <v-col md="2"
                      ><v-list-item-title style="display: flex">
                        <img height="50px" :src="item.avatar" /> </v-list-item-title
                    ></v-col>
                    <v-col md="10">
                      <v-list-item>
                        <span>{{ item.title }}</span
                        ><br /><br />
                        <span style="font-size: 0.9rem; opacity: 0.7">{{ item.content }}</span>
                      </v-list-item></v-col
                    >
                  </v-row>
                </v-container>
                <br />
                <v-divider></v-divider>
                <br />
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
        <div>
          <v-btn icon="mdi-theme-light-dark" @click="changeTheme" variant="text"></v-btn>
        </div>
        <div aria-label="testestse" style="margin-right: 30px">
          <v-menu>
            <template v-slot:activator="{ props }">
              <img class="profile-pic" v-bind="props" :src="authStore.currentUsers.image" />
            </template>

            <v-list>
              <v-list-item
                class="list-item-sidenav"
                v-for="(item, i) in navigation.navProfil"
                :key="i"
                @click="goToRoute(item.route)"
                :value="item.text"
              >
                <template v-slot:prepend>
                  <v-icon
                    color="white"
                    size="20px"
                    disabled
                    style="line-height: 24px; opacity: 1 !important"
                    :icon="item.icon"
                  ></v-icon>
                </template>

                <v-list-item-title style="color: white; font-size: 0.82475rem"
                  ><div class="container-name-dot">
                    <span>{{ item.text }}</span>
                    <span v-if="item.text === path" class="dot"></span>
                  </div>
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </div>
      <div class="connexion-btn" v-else>
        <v-btn to="/Authentication" outline color="#1c9558">Connexion</v-btn>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useThemeStore } from '@/stores/App'
import { useAuthenticationStore } from '@/stores/Auth'
import { useRouter } from 'vue-router'
import * as navigation from './Navigation.js'
import { useDisplay } from 'vuetify'

const router = useRouter()
const store = useThemeStore()
const authStore = useAuthenticationStore()
const { mdAndDown } = useDisplay()

const disconnected = useAuthenticationStore().logout

watch(mdAndDown, () => {
  if (mdAndDown.value) {
    store.drawer = false
  } else {
    store.drawer = true
  }
})

const goToRoute = (query: any) => {
  if (query === 'Authentication') {
    logout()
  }
  router.push(`/${query}`)
}

const goToChat = () => {
  router.push('/chat')
}

const changeTheme = () => {
  store.switchTheme()
}

const logout = () => {
  disconnected()
  router.push('/')
}

const route = useRoute()
const path = computed(() => route.name)

const toggleSidenav = () => {
  store.switchDrawer()
}

const items = ref([
  {
    avatar: 'https://dummyjson.com/icon/1/150',
    title: 'Lorem ipsum dolor sit amet',
    content:
      'Consectetur adipiscing elit, sed do eiusmod temporincididunt ut labore et dolore magna aliqua'
  },
  {
    avatar: 'https://dummyjson.com/icon/2/150',
    title: 'Lorem ipsum dolor sit amet',
    content:
      'Consectetur adipiscing elit, sed do eiusmod temporincididunt ut labore et dolore magna aliqua'
  },
  {
    avatar: 'https://dummyjson.com/icon/3/150',
    title: 'Lorem ipsum dolor sit amet',
    content:
      'Consectetur adipiscing elit, sed do eiusmod temporincididunt ut labore et dolore magna aliqua'
  },
  {
    avatar: 'https://dummyjson.com/icon/4/150',
    title: 'Lorem ipsum dolor sit amet',
    content:
      'Consectetur adipiscing elit, sed do eiusmod temporincididunt ut labore et dolore magna aliqua'
  },
  {
    avatar: 'https://dummyjson.com/icon/5/150',
    title: 'Lorem ipsum dolor sit amet',
    content:
      'Consectetur adipiscing elit, sed do eiusmod temporincididunt ut labore et dolore magna aliqua'
  }
])
</script>
<style>
.list-notifications {
  cursor: pointer;
}
.connexion-btn {
  margin-right: 30px;
}
.header {
  /* background: #222d51; */
  width: 100%;
  height: 60px;
  position: sticky;
  top: 0;
  z-index: 9999 !important;
}
.header-navigation {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
}
.header-container-item-left {
  margin-left: 20px;
}
.not-connected {
  margin-right: 30px;
}
.profile-pic {
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
}
.header-container-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  div {
    margin-right: 20px;
  }
  .container-bell {
    margin-right: 0px !important;
  }
  .container-bell .v-badge {
    margin-right: 0px !important;
  }
}
</style>
