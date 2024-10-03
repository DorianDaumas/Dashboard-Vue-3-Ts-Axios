import { describe, expect, beforeEach, it, vi } from 'vitest'
import { routes } from '@/router/index'
import { flushPromises, mount, VueWrapper } from '@vue/test-utils'
import { createMemoryHistory, createRouter, type Router } from 'vue-router'
import { createTestingPinia } from '@pinia/testing'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import Sidenave from './Sidenave.vue'
import { useAuthenticationStore } from '@/stores/Auth'

global.ResizeObserver = require('resize-observer-polyfill')

describe('<Sidenave></Sidenave>', () => {
  let wrapper: VueWrapper<any>
  let router: Router
  let authStore: ReturnType<typeof useAuthenticationStore>

  const vuetify = createVuetify({
    components,
    directives
  })

  beforeEach(async () => {
    router = createRouter({
      history: createMemoryHistory(),
      routes: routes
    })

    const pinia = createTestingPinia({
      createSpy: vi.fn,
      initialState: {
        auth: {
          isLogged: true,
          currentUsers: {
            username: 'TestUser',
            image: 'test-image-url',
            company: { title: 'Test Company' }
          },
          logout: vi.fn()
        },
        app: {
          theme: false,
          drawer: true
        }
      }
    })

    authStore = useAuthenticationStore()

    wrapper = mount(Sidenave, {
      global: {
        plugins: [pinia, router, vuetify]
      },
      props: {
        device: true
      }
    })

    await router.isReady()
    await wrapper.vm.$nextTick()
  })

  it('affiche correctement le navigation drawer', async () => {
    const drawer = wrapper.find('[aria-label="navigation-drawer"]')
    expect(drawer.exists()).toBe(true)
    expect(drawer.isVisible()).toBe(true)
  })

  it("affiche les informations de l'utilisateur connecté", () => {
    const username = wrapper.find('.container-profil-sidenav-info')
    expect(username.text()).toBe('TestUser')

    const companyTitle = wrapper.find('.container-profil-sidenav-info + span')
    expect(companyTitle.text()).toBe('Test Company')
  })

  it('affiche les éléments de navigation pour un utilisateur connecté', () => {
    const dashboardSection = wrapper.find('.subheader-navigation')
    expect(dashboardSection.text()).toContain('Dashboard')

    const ecommerceSection = wrapper.find('.v-list-group')
    expect(ecommerceSection.exists()).toBe(true)
    expect(ecommerceSection.text()).toContain('E-commerce')
  })

  it("change de route lorsqu'un élément de navigation est cliqué", async () => {
    const navigationItem = wrapper.find('[aria-label="navigation-item"]')
    const goToRouteSpy = vi.spyOn(wrapper.vm, 'goToRoute')
    const routerPushSpy = vi.spyOn(router, 'push')

    await navigationItem.trigger('click')
    await wrapper.vm.$nextTick()
    expect(goToRouteSpy).toHaveBeenCalled()
    expect(routerPushSpy).toHaveBeenCalled()
  })

  it("se déconnecte lorsque l'option de déconnexion est cliquée", async () => {
    const mockLogout = vi.fn()
    authStore.logout = mockLogout
    const goToRouteSpy = vi.spyOn(wrapper.vm, 'goToRoute')
    const logoutItem = wrapper
      .findAll('.list-item-sidenav')
      .find((item) => item.text().includes('Deconnexion'))
    if (logoutItem) {
      await logoutItem.trigger('click')
      await flushPromises()
      await wrapper.vm.$nextTick()
      expect(goToRouteSpy).toHaveBeenCalledWith('Authentication')
      expect(mockLogout).toHaveBeenCalled()
    } else {
      throw new Error("L'élément de déconnexion n'a pas été trouvé")
    }
  })
})
