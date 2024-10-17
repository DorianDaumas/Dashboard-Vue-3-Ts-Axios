import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import Carts from './Carts.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from '@/router'

describe('Carts.vue', () => {
  let wrapper: VueWrapper<any>
  let router: any
  let mockLocalStorage: { [key: string]: string }

  beforeEach(() => {
    // Initialiser un mock pour localStorage
    mockLocalStorage = {}

    // Mocker les méthodes getItem et setItem de localStorage
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: vi.fn((key) => mockLocalStorage[key] || null),
        setItem: vi.fn((key, value) => {
          mockLocalStorage[key] = value.toString()
        }),
        removeItem: vi.fn((key) => {
          delete mockLocalStorage[key]
        })
      },
      writable: true
    })

    const vuetify = createVuetify({ components, directives })
    const router = createRouter({
      history: createWebHistory(),
      routes: routes
    })

    const pinia = createTestingPinia({
      createSpy: vi.fn,
      stubActions: false
    })

    wrapper = mount(Carts, {
      global: {
        plugins: [pinia, vuetify, router],
        stubs: {
          PaymentCard: true,
          TableCart: true
        }
      }
    })
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('rend le composant correctement', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('affiche un message quand le panier est vide', async () => {
    mockLocalStorage['cart'] = JSON.stringify([])
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.container-alert').exists()).toBe(true)
    expect(wrapper.text()).toContain('Votre panier est vide')
  })

  it("affiche le stepper quand le panier n'est pas vide", async () => {
    const mockCart = [{ id: 1, title: 'Test Product', price: 10, images: ['test.jpg'] }]
    mockLocalStorage['cart'] = JSON.stringify(mockCart)

    // Recréez le composant après avoir défini le nouveau localStorage
    wrapper = mount(Carts, {
      global: {
        plugins: [router],
        stubs: {
          PaymentCard: true,
          TableCart: true
        }
      }
    })

    await wrapper.vm.$nextTick()
    expect(wrapper.find('[aria-label="test-cart-stepper"]').exists()).toBe(true)
  })

  it('calcule correctement le total du panier', async () => {
    const mockCart = [
      { id: 1, title: 'Product 1', price: 10, images: ['test1.jpg'] },
      { id: 2, title: 'Product 2', price: 20, images: ['test2.jpg'] }
    ]
    mockLocalStorage['cart'] = JSON.stringify(mockCart)

    // Recréez le composant après avoir défini le nouveau localStorage
    wrapper = mount(Carts, {
      global: {
        plugins: [router],
        stubs: {
          PaymentCard: true,
          TableCart: true
        }
      }
    })
    await wrapper.vm.$forceUpdate()
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.totalCart).toBe(30)
  })

  it("ajoute une quantité d'un produit au panier", async () => {
    const mockCart = [{ id: 1, title: 'Test Product', price: 10, images: ['test.jpg'] }]
    mockLocalStorage['cart'] = JSON.stringify(mockCart)

    wrapper = mount(Carts, {
      global: {
        plugins: [router],
        stubs: {
          PaymentCard: true,
          TableCart: true
        }
      }
    })

    await wrapper.vm.$nextTick()

    const newItem = { id: 1, title: 'Test Product', price: 10, images: ['test.jpg'] }
    wrapper.vm.addToCart(newItem)

    await wrapper.vm.$nextTick()

    const updatedCart = JSON.parse(mockLocalStorage['cart'])
    expect(updatedCart).toHaveLength(2)
    expect(updatedCart).toContainEqual(newItem)
    expect(wrapper.vm.cart).toHaveLength(2)
    expect(wrapper.vm.cart).toContainEqual(newItem)
  })

  it('supprime une quantité du panier', async () => {
    const mockCart = [
      { id: 1, title: 'Product 1', price: 10, images: ['test1.jpg'] },
      { id: 1, title: 'Product 1', price: 10, images: ['test1.jpg'] }
    ]
    mockLocalStorage['cart'] = JSON.stringify(mockCart)

    wrapper = mount(Carts, {
      global: {
        plugins: [router],
        stubs: {
          PaymentCard: true,
          TableCart: true
        }
      }
    })

    await wrapper.vm.$nextTick()

    wrapper.vm.removeCartItem(1)

    await wrapper.vm.$nextTick()

    const updatedCart = JSON.parse(mockLocalStorage['cart'])
    expect(updatedCart).toHaveLength(1)
    expect(updatedCart[0].id).toBe(1)
    expect(wrapper.vm.cart).toHaveLength(1)
    expect(wrapper.vm.cart[0].id).toBe(1)
  })

  it('supprime un produit du panier', async () => {
    const mockCart = [{ id: 1, title: 'Product 1', price: 10, images: ['test1.jpg'] }]
    mockLocalStorage['cart'] = JSON.stringify(mockCart)

    wrapper = mount(Carts, {
      global: {
        plugins: [router],
        stubs: {
          PaymentCard: true,
          TableCart: true
        }
      }
    })

    await wrapper.vm.$nextTick()

    wrapper.vm.removeCartItem(1)

    await wrapper.vm.$nextTick()

    const updatedCart = JSON.parse(mockLocalStorage['cart'])
    expect(updatedCart).toHaveLength(0)
    expect(wrapper.vm.cart).toHaveLength(0)
  })
})
