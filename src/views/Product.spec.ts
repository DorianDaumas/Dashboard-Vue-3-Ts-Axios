import { describe, it, expect, beforeEach, vi } from 'vitest'
import { flushPromises, mount, VueWrapper } from '@vue/test-utils'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import Product from '@/views/Product.vue'
import { createTestingPinia } from '@pinia/testing'
import { useProductsStore } from '@/stores/Products'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from '@/router'

describe('Product.vue', () => {
  let wrapper: VueWrapper<any>
  let productsStore: ReturnType<typeof useProductsStore>
  let router: any

  const vuetify = createVuetify({ components, directives })

  beforeEach(async () => {
    router = createRouter({
      history: createWebHistory(),
      routes: routes
    })

    const pinia = createTestingPinia({
      createSpy: vi.fn,
      stubActions: false,
      initialState: {
        products: {
          product: { productDetail: {} },
          otherProducts: { otherProducts: { otherProductsDetail: [], limit: 0 } },
          loadingProducts: false,
          loadingOtherProducts: false
        },
        app: {
          theme: false
        }
      }
    })

    productsStore = useProductsStore()
    vi.spyOn(productsStore, 'fetchUnitProduct')
    vi.spyOn(productsStore, 'fetchOtherProducts')
    wrapper = mount(Product, {
      global: {
        plugins: [pinia, vuetify, router],
        stubs: {
          Product: true,
          OtherProducts: true,
          Alert: true
        }
      },
      mocks: {
        $route: {
          params: { id: '10' }
        }
      }
    })

    await router.isReady()
    await flushPromises()
    await wrapper.vm.$nextTick()
  })

  it('appelle fetchProduct lors du montage du composant', () => {
    wrapper.vm.$options.mounted?.call(wrapper.vm)
    expect(productsStore.fetchUnitProduct).toHaveBeenCalledWith(10)
  })

  it('appelle fetchOtherProducts lors du montage du composant', () => {
    wrapper.vm.$options.mounted?.call(wrapper.vm)
    expect(productsStore.fetchOtherProducts).toHaveBeenCalledWith(10)
  })

  it("affiche le composant Product quand l'API est un succès", async () => {
    wrapper.vm.checkApiProductSuccess = true
    await wrapper.vm.$nextTick()
    expect(wrapper.findComponent({ name: 'Product' }).exists()).toBe(true)
  })

  it('affiche le loader quand le produit est en cours de chargement', async () => {
    wrapper.vm.checkApiProductSuccess = false
    await wrapper.vm.$nextTick()
    productsStore.loadingProducts = true
    await wrapper.vm.$nextTick()
    expect(wrapper.findComponent({ name: 'v-progress-linear' }).exists()).toBe(true)
  })

  it("affiche le composant Alert quand l'API échoue", async () => {
    wrapper.vm.checkApiProductSuccess = false
    await wrapper.vm.$nextTick()
    productsStore.loadingProducts = false
    await wrapper.vm.$nextTick()
    expect(wrapper.findComponent({ name: 'Alert' }).exists()).toBe(true)
  })

  it("affiche le composant OtherProducts quand l'API est un succès", async () => {
    wrapper.vm.checkApiOtherProductSuccess = true
    await wrapper.vm.$nextTick()
    expect(wrapper.findComponent({ name: 'OtherProducts' }).exists()).toBe(true)
  })

  it('affiche le loader quand les autres produits sont en cours de chargement', async () => {
    wrapper.vm.checkApiOtherProductSuccess = false
    await wrapper.vm.$nextTick()
    productsStore.loadingOtherProducts = true
    await wrapper.vm.$nextTick()
    expect(wrapper.findComponent({ name: 'v-progress-linear' }).exists()).toBe(true)
  })

  it('met à jour le produit lors du clic sur un autre produit', async () => {
    await wrapper.vm.callbackClickRow(15)
    expect(productsStore.fetchUnitProduct).toHaveBeenCalledWith(15)
  })
})
