import { describe, expect, beforeEach, it } from 'vitest'
import { routes } from '@/router/index'
import { shallowMount } from '@vue/test-utils'
import Header from '@/components/Common/Header.vue'
import { createMemoryHistory, createRouter } from 'vue-router'
import { createTestingPinia } from '@pinia/testing'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { useAuthenticationStore } from '@/stores/Auth'

global.ResizeObserver = require('resize-observer-polyfill')

describe('<Header></Header>', () => {
  let router: any

  const vuetify = createVuetify({
    components,
    directives
  })

  beforeEach(async () => {
    router = createRouter({
      history: createMemoryHistory(),
      routes: routes
    })
    router.push('/')
    await router.isReady()
  })
  it("Affiche le header si l'utilisateur est connecté", async () => {
    const pinia = createTestingPinia()

    const wrapper = shallowMount(Header, {
      vuetify,
      global: {
        plugins: [router, vuetify, pinia]
      }
    })
    const authStore = useAuthenticationStore()
    authStore.isLogged = true
    await wrapper.vm.$nextTick()

    const showHeader = wrapper.find('.header-container-item')
    expect(showHeader.exists()).toBe(true)
    expect(wrapper.html()).toMatchInlineSnapshot(`
      "<div class="header">
        <div class="header-navigation">
          <div class="header-container-item-left">
            <v-btn-stub symbol="Symbol(vuetify:v-btn-toggle)" flat="false" icon="mdi-menu-open" block="false" slim="false" stacked="false" ripple="true" border="false" density="default" disabled="false" loading="false" tile="false" replace="false" exact="false" size="default" tag="button" variant="text"></v-btn-stub><span style="margin-left: 15px; font-size: 0.8rem; font-weight: 400;">Home</span>
          </div>
          <div class="header-container-item">
            <div class="container-bell">
              <v-menu-stub width="400px" submenu="false" attach="false" closeonback="true" contained="false" disabled="false" noclickanimation="false" modelvalue="false" persistent="false" scrim="false" zindex="2000" activatorprops="[object Object]" openonhover="false" closeoncontentclick="true" closedelay="250" opendelay="300" eager="false" locationstrategy="connected" location="bottom right" origin="auto" scrollstrategy="reposition" transition="[object Object]"></v-menu-stub>
            </div>
            <div>
              <v-btn-stub symbol="Symbol(vuetify:v-btn-toggle)" flat="false" icon="mdi-theme-light-dark" block="false" slim="false" stacked="false" ripple="true" border="false" density="default" disabled="false" loading="false" tile="false" replace="false" exact="false" size="default" tag="button" variant="text"></v-btn-stub>
            </div>
            <div aria-label="testestse" style="margin-right: 30px;">
              <v-menu-stub submenu="false" attach="false" closeonback="true" contained="false" disabled="false" noclickanimation="false" modelvalue="false" persistent="false" scrim="false" zindex="2000" activatorprops="[object Object]" openonhover="false" closeoncontentclick="true" closedelay="250" opendelay="300" eager="false" locationstrategy="connected" origin="auto" scrollstrategy="reposition" transition="[object Object]"></v-menu-stub>
            </div>
          </div>
        </div>
      </div>"
    `)
  })

  it("Affiche le button de connexion si l'utilsateur est deconnecté", async () => {
    const pinia = createTestingPinia()

    const wrapper = shallowMount(Header, {
      vuetify,
      global: {
        plugins: [router, vuetify, pinia]
      }
    })
    const authStore = useAuthenticationStore()
    authStore.isLogged = false
    await wrapper.vm.$nextTick()

    const showHeader = wrapper.find('.header-container-item')
    expect(showHeader.exists()).toBe(false)

    expect(wrapper.html()).toMatchInlineSnapshot(`
      "<div class="header">
        <div class="header-navigation">
          <div class="header-container-item-left">
            <v-btn-stub symbol="Symbol(vuetify:v-btn-toggle)" flat="false" icon="mdi-menu-open" block="false" slim="false" stacked="false" ripple="true" border="false" density="default" disabled="false" loading="false" tile="false" replace="false" exact="false" size="default" tag="button" variant="text"></v-btn-stub><span style="margin-left: 15px; font-size: 0.8rem; font-weight: 400;">Home</span>
          </div>
          <div class="connexion-btn">
            <v-btn-stub to="/Authentication" color="#1c9558" symbol="Symbol(vuetify:v-btn-toggle)" flat="false" icon="false" block="false" slim="false" stacked="false" ripple="true" border="false" density="default" disabled="false" loading="false" tile="false" replace="false" exact="false" size="default" tag="button" variant="elevated" outline=""></v-btn-stub>
          </div>
        </div>
      </div>"
    `)
  })
})
