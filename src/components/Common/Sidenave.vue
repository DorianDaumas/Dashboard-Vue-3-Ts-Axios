<template>
  <v-card style="z-index: 9999 !important" color="#43908d">
    <v-layout>
      <v-navigation-drawer
        aria-label="navigation-drawer"
        :permanent="device ? true : false"
        :class="device ? 'sidenav-desktop' : 'sidenav-mobile'"
        :color="theme ? '#1c9558' : '#1c9558'"
        v-model="store.drawer"
        temporary
        :rail="!store.drawer"
        :expand-on-hover="device"
      >
        <div class="container-navigation">
          <v-list>
            <v-list-item>
              <template v-slot:prepend>
                <v-icon class="navigation-open" size="50" color="#0070c0">mdi-vuejs</v-icon>
              </template>
              <p style="color: white; font-size: 0.9rem; white-space: pre">Dashboard Template</p>
              <a
                href="https://dummyjson.com/docs"
                target="_blank"
                style="color: white; font-size: 0.8rem; white-space: pre; opacity: 0.8"
              >
                DummyJson.com API
              </a>
            </v-list-item>
          </v-list>

          <v-list>
            <v-divider color="white"></v-divider>
            <v-list-item @click="show = !show" class="profil-selector">
              <template v-slot:prepend>
                <v-avatar style="background: white; z-index: 999">
                  <v-img
                    v-if="checkLoggedUser.isLogged"
                    alt="Avatar"
                    :src="checkLoggedUser.currentUsers.image"
                  ></v-img>
                  <v-img
                    v-else
                    alt="Avatar"
                    src="https://placehold.co/600x400/orange/white"
                  ></v-img>
                </v-avatar>
              </template>
              <div
                v-if="checkLoggedUser.isLogged"
                style="display: flex; flex-direction: column; color: #2f2f2f; align-items: baseline"
              >
                <span class="container-profil-sidenav-info">{{
                  checkLoggedUser.currentUsers.username
                }}</span>
                <span style="font-size: 0.7rem">{{
                  checkLoggedUser.currentUsers.company.title
                }}</span>
              </div>

              <div
                v-else
                style="display: flex; flex-direction: column; color: #2f2f2f; align-items: baseline"
              >
                <span class="container-profil-sidenav-info">Invité</span>
              </div>

              <v-btn
                style="position: absolute; top: 0; right: 0; z-index: 1"
                variant="text"
                color="black"
                :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'"
              ></v-btn>
            </v-list-item>

            <v-expand-transition>
              <div v-show="show">
                <v-divider></v-divider>

                <v-card-text
                  :style="store.drawer ? '' : 'padding: 0'"
                  v-if="checkLoggedUser.isLogged"
                >
                  <v-list-item
                    aria-label="navigation-item"
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
                </v-card-text>

                <v-card-text :style="store.drawer ? '' : 'padding: 0'" v-else>
                  <v-list-item
                    class="list-item-sidenav"
                    v-for="(item, i) in navigation.navProfilLocked"
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
                </v-card-text>
              </div>
            </v-expand-transition>
            <v-divider color="white"></v-divider>
          </v-list>

          <div v-if="checkLoggedUser.isLogged">
            <v-list
              style="margin-top: 10px"
              :color="theme ? '#42b883' : '#27293d'"
              density="compact"
            >
              <v-list-subheader class="subheader-navigation">Dashboard</v-list-subheader>

              <v-list-item
                class="list-item-sidenav"
                v-for="(item, i) in navigation.navigation"
                :key="i"
                :value="item.value"
                @click="goToRoute(item.route)"
              >
                <template v-slot:prepend>
                  <v-icon
                    color="white"
                    size="small"
                    style="opacity: 1 !important"
                    :icon="item.icon"
                  ></v-icon>
                </template>

                <v-list-item-title style="color: white; font-size: 0.82475rem"
                  ><div class="container-name-dot">
                    <span>{{ item.title }}</span>
                    <span v-if="item.title === path" class="dot"></span>
                  </div>
                </v-list-item-title>
              </v-list-item>
              <br />
              <v-list-subheader class="subheader-navigation">Applications</v-list-subheader>

              <v-list-item
                class="list-item-sidenav"
                v-for="(item, i) in navigation.applicationNav"
                :key="i"
                :value="item.value"
                @click="goToRoute(item.route)"
              >
                <template v-slot:prepend>
                  <v-icon
                    color="white"
                    size="small"
                    style="opacity: 1 !important"
                    :icon="item.icon"
                  ></v-icon>
                </template>

                <v-list-item-title style="color: white; font-size: 0.82475rem"
                  ><div class="container-name-dot">
                    <span>{{ item.title }}</span>
                    <span v-if="item.title === path" class="dot"></span>
                  </div>
                </v-list-item-title>
              </v-list-item>

              <v-list v-model:opened="toggleEcommerceMenu">
                <v-list-group value="E-commerce">
                  <template v-slot:activator="{ props, isOpen }">
                    <v-list-item v-bind="props">
                      <template v-slot:prepend>
                        <v-icon
                          color="white"
                          size="small"
                          style="opacity: 1 !important"
                          icon="mdi-store-outline"
                        ></v-icon>
                      </template>

                      <template v-slot:append>
                        <v-icon
                          color="white"
                          size="small"
                          style="opacity: 1 !important"
                          :icon="isOpen ? 'mdi-chevron-up' : 'mdi-chevron-down'"
                        ></v-icon>
                      </template>

                      <v-list-item-title style="color: white; font-size: 0.82475rem"
                        ><div class="container-name-dot">
                          <span>E-commerce</span>
                        </div>
                      </v-list-item-title>
                    </v-list-item>
                  </template>
                  <v-list-item
                    class="list-item-sidenav"
                    :style="
                      store.drawer
                        ? 'padding-inline-start: 40px !important'
                        : 'padding-inline-start: 16px !important'
                    "
                    v-for="(item, i) in navigation.EcommerceNav"
                    :key="i"
                    :value="item.title"
                    @click="goToRoute(item.route)"
                  >
                    <template v-slot:prepend>
                      <v-icon
                        color="white"
                        size="small"
                        style="opacity: 1 !important"
                        :icon="item.icon"
                      ></v-icon>
                    </template>

                    <v-list-item-title style="color: white; font-size: 0.82475rem"
                      ><div class="container-name-dot">
                        <span>{{ item.title }}</span>
                        <span v-if="item.value === path" class="dot"></span>
                      </div>
                    </v-list-item-title>
                  </v-list-item>
                </v-list-group>
              </v-list>
              <br />
              <v-list-subheader class="subheader-navigation">Rôles et permissions</v-list-subheader>

              <v-list-item
                class="list-item-sidenav"
                v-for="(item, i) in navigation.rolesPermissionNav"
                :key="i"
                :value="item.value"
                @click="goToRoute(item.route)"
              >
                <template v-slot:prepend>
                  <v-icon
                    color="white"
                    size="small"
                    style="opacity: 1 !important"
                    :icon="item.icon"
                  ></v-icon>
                </template>

                <v-list-item-title style="color: white; font-size: 0.82475rem"
                  ><div class="container-name-dot">
                    <span>{{ item.title }}</span>
                    <span v-if="item.title === path" class="dot"></span>
                  </div>
                </v-list-item-title>
              </v-list-item>

              <v-divider></v-divider>
            </v-list>
          </div>
          <div v-else>
            <v-list
              style="margin-top: 10px"
              :color="theme ? '#42b883' : '#27293d'"
              density="compact"
            >
              <v-list-subheader class="subheader-navigation">Dashboard</v-list-subheader>

              <v-list-item
                class="list-item-sidenav"
                v-for="(item, i) in navigation.navigation"
                :key="i"
                :value="item.value"
                @click="goToRoute(item.route)"
              >
                <template v-slot:prepend>
                  <v-icon
                    color="white"
                    size="small"
                    style="opacity: 1 !important"
                    :icon="item.icon"
                  ></v-icon>
                </template>

                <v-list-item-title style="color: white; font-size: 0.82475rem"
                  ><div class="container-name-dot">
                    <span>{{ item.title }}</span>
                    <span v-if="item.title === path" class="dot"></span>
                  </div>
                </v-list-item-title>
              </v-list-item>
              <br />
              <v-list-subheader class="subheader-navigation">Applications</v-list-subheader>

              <v-list-item
                class="list-item-sidenav"
                v-for="(item, i) in navigation.applicationNavLocked"
                :key="i"
                :value="item.value"
                :disabled="item.icon === 'mdi-lock-outline'"
                @click="goToRoute(item.route)"
              >
                <template v-slot:prepend>
                  <v-icon
                    color="white"
                    size="small"
                    style="opacity: 1 !important"
                    :icon="item.icon"
                  ></v-icon>
                </template>

                <v-list-item-title style="color: white; font-size: 0.82475rem"
                  ><div class="container-name-dot">
                    <span>{{ item.title }}</span>
                    <span v-if="item.title === path" class="dot"></span>
                  </div>
                </v-list-item-title>
              </v-list-item>

              <br />
              <v-list-subheader class="subheader-navigation">Rôles et permissions</v-list-subheader>

              <v-list-item
                class="list-item-sidenav"
                v-for="(item, i) in navigation.rolesPermissionNavLocked"
                :key="i"
                :value="item.value"
                :disabled="item.icon === 'mdi-lock-outline'"
                @click="goToRoute(item.route)"
              >
                <template v-slot:prepend>
                  <v-icon
                    color="white"
                    size="small"
                    style="opacity: 1 !important"
                    :icon="item.icon"
                  ></v-icon>
                </template>

                <v-list-item-title style="color: white; font-size: 0.82475rem"
                  ><div class="container-name-dot">
                    <span>{{ item.title }}</span>
                    <span v-if="item.title === path" class="dot"></span>
                  </div>
                </v-list-item-title>
              </v-list-item>

              <v-divider></v-divider>
            </v-list>
          </div>
        </div>
      </v-navigation-drawer>
    </v-layout>
  </v-card>
  <div class="sidenav"></div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useThemeStore } from '@/stores/App'
import { useDisplay } from 'vuetify'
import { useAuthenticationStore } from '@/stores/Auth'
import * as navigation from './Navigation.js'

const store = useThemeStore()
const theme = computed(() => store.theme)
const toggleEcommerceMenu = ref(['E-commerce'])
const router = useRouter()
const route = useRoute()
const checkLoggedUser = useAuthenticationStore()
const show = ref(true)
const path = computed(() => route.name)
const device = useDisplay().mdAndUp
const disconnected = useAuthenticationStore()

const logout = () => {
  disconnected.logout()
}

const goToRoute = (query: any) => {
  if (query === 'Authentication') {
    logout()
  }
  router.push(`/${query}`)
}
</script>
<style>
.subheader-navigation {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: flex-start;
  column-gap: 0.625rem;
  .v-list-subheader__text {
    font-size: 13px;
    font-weight: 400 !important;
    color: white;
    text-transform: uppercase;
    letter-spacing: 0.7px;
  }
}
.subheader-navigation::after {
  border-block-end: 1px solid white;
  content: '';
  flex: 1 1 auto;
}
.subheader-navigation::before {
  border-block-end: 1px solid white;
  content: '';
  flex: 0 1 0.875rem;
  margin-inline-start: -0.75rem;
}
.profil-selector {
  cursor: pointer;
  background-color: white;
}
.container-profil-sidenav-info {
  font-weight: 600;
  line-height: 1.2;
  font-size: 0.875rem;
  margin-left: 10px;
}
.v-navigation-drawer__content {
  border-radius: 5px !important;
}
.list-item-sidenav {
  height: 50px;
}
.list-item-sidenav .v-list-item__overlay {
  background: white !important;
}
.sidenav-desktop {
  top: 80px !important;
  left: 25px !important;
  transform: translateX(0) !important;
  height: calc(100% + -110px) !important;
  border-radius: 5px !important;
  border-right: 0;
}
.sidenav-mobile {
  top: 80px !important;
  height: calc(100% + -80px) !important;
  left: 0px !important;
  border-radius: 0px !important;
}
</style>
<style lang="scss" scoped>
.container-name-dot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  span {
    font-weight: 300 !important;
  }
}
.dot {
  height: 10px;
  width: 10px;
  text-align: right;
  background-color: white;
  border-radius: 50%;
  display: inline-block;
}
.navigation-open {
  margin-left: -12px;
  opacity: 1;
}
.container-toggle-sidenav {
  position: absolute;
  right: -17px;
  top: 14px;
}
.sidenav {
  span {
    color: #b9bbc0 !important;
    margin-top: 10px;
  }
}
.container-navigation {
  color: #b9bbc0;
}
.container-interact-profil {
  background: #2e3035;
  margin-top: 20px;
  li {
    padding: 10px;
  }
}
.container-profil {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.container-identity {
  display: flex;
  align-items: center;
  span {
    margin-left: 15px;
  }
}
.profile-pic {
  border-radius: 50%;
  height: 50px;
  margin-left: 3px;
}
</style>
