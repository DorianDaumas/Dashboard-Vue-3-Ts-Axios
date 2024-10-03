import { describe, expect, beforeEach, it, vi } from 'vitest'
import { routes } from '@/router/index'
import { mount, shallowMount } from '@vue/test-utils'
import { createMemoryHistory, createRouter } from 'vue-router'
import { createTestingPinia } from '@pinia/testing'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import CardProfile from './CardProfile.vue'
import { selectUserSchema } from './selectUserType'

global.ResizeObserver = require('resize-observer-polyfill')
describe('<CardProfile></CardProfile>', () => {
  let router: any
  let wrapper: any

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
  it('Test toggle card profile ', async () => {
    const pinia = createTestingPinia()
    wrapper = await mount(CardProfile, {
      global: {
        plugins: [pinia, router, vuetify]
      },
      props: {
        userInfo: selectUserSchema.userInfo
      }
    })
    await wrapper.vm.$nextTick()
    const card = wrapper.find('[aria-label="card-profil"]')
    const contentHide = wrapper.find('[aria-label="show-content"]')
    expect(contentHide?.exists()).toBe(false)
    expect(card?.exists()).toBe(true)
    expect(wrapper.vm.show).toBe(false)
    const spyOnFirst = vi.spyOn(card, 'trigger')
    await card?.trigger('click')
    expect(spyOnFirst).toHaveBeenCalledOnce()
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.show).toBe(true)
    const contentShow = wrapper.find('[aria-label="show-content"]')
    expect(contentShow?.exists()).toBe(true)
  })

  it('Test computed selectUserLength ', async () => {
    const pinia = createTestingPinia()
    wrapper = await shallowMount(CardProfile, {
      global: {
        plugins: [pinia, router, vuetify]
      },
      props: {
        userInfo: selectUserSchema.userInfo
      }
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.selectUserLength).toBe(true)
    wrapper.vm.$props.userInfo.username = 'test'
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.selectUserLength).toBe(false)
  })
})
