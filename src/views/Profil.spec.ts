import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import Profil from './Profil.vue'
import { useAuthenticationStore } from '@/stores/Auth'
import { useThemeStore } from '@/stores/App'
import { useProductsStore } from '@/stores/Products'

global.ResizeObserver = require('resize-observer-polyfill')

describe('Profil.vue', () => {
  let wrapper: VueWrapper<any>
  let authStore: ReturnType<typeof useAuthenticationStore>
  let themeStore: ReturnType<typeof useThemeStore>
  let productsStore: ReturnType<typeof useProductsStore>

  beforeEach(() => {
    const vuetify = createVuetify({ components, directives })
    const pinia = createTestingPinia({
      createSpy: vi.fn,
      stubActions: false
    })

    wrapper = mount(Profil, {
      global: {
        plugins: [pinia, vuetify],
        stubs: {
          Settings: true,
          UserInformations: true,
          PaymentCard: true,
          UserProducts: true
        }
      }
    })

    authStore = useAuthenticationStore()
    themeStore = useThemeStore()
    productsStore = useProductsStore()
  })

  it('rend le composant correctement', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it("affiche les informations de l'utilisateur correctement", async () => {
    authStore.currentUsers = {
      id: 1,
      username: 'johndoe',
      email: 'john.doe@example.com',
      firstName: 'John',
      lastName: 'Doe',
      gender: 'male',
      image: 'https://example.com/path/to/johndoe.jpg',
      phone: '+33 6 12 34 56 78',
      age: 35,
      university: 'Université de Paris',
      address: {
        address: '123 Rue de la Paix',
        city: 'Paris',
        country: 'France',
        state: 'Île-de-France',
        postalCode: '75001'
      },
      bank: {
        cardExpire: '06/2025',
        cardNumber: '4532 **** **** 1234',
        cardType: 'visa',
        currency: 'EUR',
        iban: 'FR76 3000 6000 0123 4567 8900 123'
      },
      company: {
        department: 'Développement',
        name: 'TechCorp',
        title: 'Ingénieur logiciel senior'
      },
      ssn: '1 23 45 67 890 123 45',
      accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
    }
    await wrapper.vm.$nextTick()
    console.log(wrapper.text())

    expect(wrapper.text()).toContain('John Doe')
    expect(wrapper.text()).toContain('Développement')
    expect(wrapper.find('img').attributes('src')).toBe('https://example.com/path/to/johndoe.jpg')
  })

  it('applique le thème correct en fonction du store', async () => {
    themeStore.theme = true
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.theme-off').exists()).toBe(true)

    themeStore.theme = false
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.theme-on').exists()).toBe(true)
  })

  it('affiche les composants enfants', () => {
    expect(wrapper.findComponent({ name: 'Settings' }).exists()).toBe(true)
    expect(wrapper.findComponent({ name: 'UserInformations' }).exists()).toBe(true)
    expect(wrapper.findComponent({ name: 'PaymentCard' }).exists()).toBe(true)
  })

  it("affiche un spinner de chargement quand les produits de l'utilisateur ne sont pas chargés", async () => {
    productsStore.userProducts = {
      userProduct: {
        id: 0,
        total: 0,
        products: []
      }
    }
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.v-progress-circular').exists()).toBe(true)
  })
})
