import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import DesktopMenu from './DesktopMenu.vue'
import { createTestingPinia } from '@pinia/testing'
import { useThemeStore } from '@/stores/App'

global.ResizeObserver = require('resize-observer-polyfill')

describe('DesktopMenu', () => {
  let wrapper: VueWrapper<any>
  let themeStore: ReturnType<typeof useThemeStore>

  const vuetify = createVuetify({ components, directives })

  beforeEach(() => {
    const pinia = createTestingPinia({
      createSpy: vi.fn,
      initialState: {
        auth: {
          currentUsers: {
            username: 'TestUser',
            image: 'test-image-url'
          }
        },
        app: {
          theme: false
        }
      }
    })

    themeStore = useThemeStore()

    wrapper = mount(DesktopMenu, {
      global: {
        plugins: [pinia, vuetify]
      },
      props: {
        message: {
          message: [
            {
              read: false,
              id: 1,
              body: 'Test message body',
              postId: 1,
              likes: 0,
              user: { id: 123, username: 'User1', fullName: 'User1' }
            }
          ]
        },
        drawer: false
      }
    })
  })

  it('affiche correctement le titre "Messages"', () => {
    const title = wrapper.find('span')
    expect(title.text()).toBe('Messages')
  })

  it('affiche le nombre correct de messages non lus', () => {
    const unreadCount = wrapper.find('.v-avatar')
    expect(unreadCount.text()).toBe('5')
  })

  it('affiche correctement les messages', () => {
    const messageItems = wrapper.findAll('.container-message-receive-sidenav')
    expect(messageItems.length).toBe(1)
    expect(messageItems[0].text()).toContain('User1')
    expect(messageItems[0].text()).toContain('Test message body')
  })

  it("affiche les informations de l'utilisateur connecté", () => {
    const userAvatar = wrapper.findAll('.v-avatar').at(-1)
    expect(userAvatar?.find('img').attributes('src')).toBe('test-image-url')

    const username = wrapper.find('span[aria-label="test-username"]')
    expect(username.text()).toBe('TestUser')
  })

  it('applique la classe correcte en fonction du thème', async () => {
    expect(wrapper.classes()).toContain('theme-on')

    await themeStore.$patch({ theme: true })
    await wrapper.vm.$nextTick()

    expect(wrapper.classes()).toContain('data-table')
  })

  it('applique la classe mobile correctement', async () => {
    const mobileWrapper = mount(DesktopMenu, {
      global: {
        plugins: [createTestingPinia(), vuetify],
        mocks: {
          useDisplay: () => ({ mdAndDown: true })
        }
      },
      props: {
        message: { message: [] },
        drawer: false
      }
    })

    expect(mobileWrapper.classes()).toContain('align-mobile-menu')
    expect(mobileWrapper.find('.container-message-user-chat-mobile').exists()).toBe(true)
  })
})
