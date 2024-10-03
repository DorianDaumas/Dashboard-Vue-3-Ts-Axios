import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import Authentication from '@/views/Authentication.vue'
import { createTestingPinia } from '@pinia/testing'
import { useAuthenticationStore } from '@/stores/Auth'
import { createRouter, createWebHistory } from 'vue-router'

describe('Authentication.vue', () => {
  let wrapper: VueWrapper<any>
  let authStore: ReturnType<typeof useAuthenticationStore>
  let router: any

  const vuetify = createVuetify({ components, directives })

  beforeEach(() => {
    router = createRouter({
      history: createWebHistory(),
      routes: [{ path: '/Profil', name: 'Profil', component: { template: '<div>Profil</div>' } }]
    })

    const pinia = createTestingPinia({
      createSpy: vi.fn
    })

    authStore = useAuthenticationStore()

    wrapper = mount(Authentication, {
      global: {
        plugins: [pinia, vuetify, router]
      }
    })
  })

  it('affiche le formulaire de connexion', () => {
    expect(wrapper.find('h1').text()).toBe('Fake Dashboard')
    expect(wrapper.find('input[aria-label="test-username"]').exists()).toBe(true)
    expect(wrapper.find('input[aria-label="test-password"]').exists()).toBe(true)
    expect(wrapper.find('button[type="submit"]').text()).toBe('Se connecter')
  })

  it('les inputs ont des champs pré-remplis et désactivés', () => {
    const usernameInput = wrapper.find('input[aria-label="test-username"]')
    const passwordInput = wrapper.find('input[aria-label="test-password"]')

    expect(usernameInput.element.getAttribute('value')).toBe('jacksone')
    expect(passwordInput.element.getAttribute('value')).toBe('jacksonepass')
    expect(usernameInput.element.getAttribute('disabled')).toBe('')
    expect(passwordInput.element.getAttribute('disabled')).toBe('')
  })

  it("appelle la méthode d'authentification du store lors de la soumission du formulaire", async () => {
    const authenticationSpy = vi.spyOn(authStore, 'authentication').mockResolvedValue({
      success: true,
      content: {} as any,
      status: 200
    })

    await wrapper.find('form').trigger('submit')

    expect(authenticationSpy).toHaveBeenCalledWith('jacksone', 'jacksonepass', 1)
  })

  it('redirige vers la page Profil après une authentification réussie', async () => {
    vi.spyOn(authStore, 'authentication').mockResolvedValue({
      success: true,
      content: {} as any,
      status: 200
    })

    const pushSpy = vi.spyOn(router, 'push')

    await wrapper.find('form').trigger('submit')

    expect(pushSpy).toHaveBeenCalledWith({ path: '/Profil' })
  })
})
