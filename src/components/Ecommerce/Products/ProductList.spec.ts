import { mount, flushPromises, VueWrapper } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { createRouter, createMemoryHistory, type Router } from 'vue-router'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import axios from 'axios'
import ProductsList from './ProductsList.vue'
import { useEcommerceStore } from '@/stores/Ecommerce'
import { routes } from '@/router'

global.ResizeObserver = require('resize-observer-polyfill')

vi.mock('axios')

const mockProducts = {
  products: [
    {
      id: 1,
      title: 'iPhone 9',
      description: 'An apple mobile which is nothing like apple',
      price: 549,
      rating: 4.69,
      stock: 94,
      brand: 'Apple',
      category: 'smartphones',
      thumbnail: 'https://i.dummyjson.com/data/products/1/thumbnail.jpg',
      images: ['https://i.dummyjson.com/data/products/1/1.jpg'],
      reviews: ['Great product', 'Awesome phone']
    }
  ],
  total: 1
}

describe('ProductsList.vue', () => {
  let wrapper: VueWrapper<any>
  let store: ReturnType<typeof useEcommerceStore>
  let router: Router

  beforeEach(async () => {
    const pinia = createPinia()
    setActivePinia(pinia)

    router = createRouter({
      history: createMemoryHistory(),
      routes: routes
    })

    const vuetify = createVuetify({
      components,
      directives
    })

    vi.mocked(axios.get).mockResolvedValue({ data: mockProducts, status: 200 })

    store = useEcommerceStore()
    vi.spyOn(store, 'fetchProducts')
    vi.spyOn(store, 'fetchProductsCategory')

    wrapper = mount(ProductsList, {
      global: {
        plugins: [pinia, router, vuetify]
      }
    })

    vuetify.display.mobile.value = false

    await router.isReady()
    await flushPromises()
  })

  afterEach(() => {
    vi.resetAllMocks()
  })

  it('appelle fetchProducts avec les paramètres initiaux lors du montage', async () => {
    expect(store.fetchProducts).toHaveBeenCalledWith('', 15, 0, 'desc')
  })

  it('affiche correctement les données du produit en vue standard', async () => {
    const productCard = wrapper.find('[aria-label="test-container-list-standard"]')
    expect(productCard.exists()).toBe(true)

    const title = productCard.find('[aria-label="test-title-standard"]')
    expect(title.text()).toBe('iPhone 9')

    const price = productCard.find('[aria-label="test-price-standard"]')
    expect(price.text()).toContain('549')

    const description = productCard.find('[aria-label="test-description-standard"]')
    expect(description.text()).toBe('An apple mobile which is nothing like apple')

    const rating = productCard.find('[aria-label="test-rating-standard"]')
    expect(rating.text()).toContain('4.69')

    const review = productCard.find('[aria-label="test-review-standard"]')
    expect(review.text()).toBe('2 Avis')
  })

  it('redirige vers la page de détail du produit lors du clic vue standard', async () => {
    const detailLink = wrapper.find('[aria-label="test-push-to-detail-standard"]')
    const pushToDetail = vi.spyOn(wrapper.vm, 'redirectTo')

    await detailLink.trigger('click')
    await wrapper.vm.$nextTick()
    expect(pushToDetail).toHaveBeenCalled()
    expect(pushToDetail).toHaveBeenCalledWith(wrapper.vm.ProductsList.products[0].id)
  })

  it('change la vue lorsque le toggle est cliqué, vue (grid)', async () => {
    await wrapper.vm.$nextTick()
    wrapper.vm.toggle = 1
    expect(wrapper.vm.toggle).toBe(1)
    await wrapper.vm.$nextTick()
    const productCard = wrapper.find('[aria-label="test-container-list-grid"]')

    const title = productCard.find('[aria-label="test-title-grid"]')
    expect(title.text()).toBe('iPhone 9')

    const price = productCard.find('[aria-label="test-price-grid"]')
    expect(price.text()).toContain('549')

    const description = productCard.find('[aria-label="test-description-grid"]')
    expect(description.text()).toBe('An apple mobile which is nothing like apple')

    const rating = productCard.findComponent({ name: 'v-rating' })
    expect(rating.props('modelValue')).toBe(wrapper.vm.ProductsList.products[0].rating)
  })

  it('redirige vers la page de détail du produit lors du clic vue grid', async () => {
    await wrapper.vm.$nextTick()
    wrapper.vm.toggle = 1
    expect(wrapper.vm.toggle).toBe(1)
    await wrapper.vm.$nextTick()

    const detailLink = wrapper.findComponent('[aria-label="test-push-to-detail-grid"]')
    await detailLink.trigger('click')
    await wrapper.vm.$nextTick()
    expect(detailLink.attributes('href')).toBe(`/product/${wrapper.vm.ProductsList.products[0].id}`)
  })

  it('met à jour la recherche et appelle fetchProducts', async () => {
    const searchInput = wrapper.find('[aria-label="test-input"]')
    await searchInput.setValue('iPhone')
    await flushPromises()

    expect(store.fetchProducts).toHaveBeenCalledWith('iPhone', 15, 0, 'desc')
  })

  it("change l'ordre et appelle fetchProducts", async () => {
    await wrapper.vm.$nextTick()
    wrapper.vm.selectOrderValue = 'asc'
    wrapper.vm.selectOrder = 'Prix asc.'
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.selectOrderValue).toBe('asc')
    expect(wrapper.vm.selectOrder).toBe('Prix asc.')
    await wrapper.vm.$nextTick()

    await flushPromises()

    expect(store.fetchProducts).toHaveBeenCalledWith(
      wrapper.vm.search,
      wrapper.vm.itemPerPage,
      wrapper.vm.page,
      wrapper.vm.selectOrderValue
    )
  })

  it('gère correctement prevPage quand la page est supérieure à 15', async () => {
    wrapper.vm.page = 30
    wrapper.vm.itemPerPage = 15
    await wrapper.vm.prevPage()

    expect(wrapper.vm.page).toBe(15)
    expect(store.fetchProducts).toHaveBeenCalledWith('', 15, 15, 'desc')
  })
  it('gère correctement prevPage quand la page est inférieure ou égale à 15', async () => {
    wrapper.vm.page = 15
    wrapper.vm.itemPerPage = 15
    await wrapper.vm.prevPage()

    expect(wrapper.vm.page).toBe(0)
    expect(store.fetchProducts).toHaveBeenCalledWith('', 15, 0, 'desc')
  })

  it('réagit correctement au changement de catégorie', async () => {
    const routerPushSpy = vi.spyOn(router, 'push')

    // Simuler un changement de catégorie
    await wrapper.setProps({ category: 'smartphones' })
    await router.push('/Ecommerce/smartphones')
    await router.isReady()
    // Attendre que le watch s'exécute
    await flushPromises()
    await wrapper.vm.$nextTick()

    // Vérifier que fetchProductsCategory a été appelé avec les bons arguments
    expect(router.currentRoute.value.path).toBe('/Ecommerce/smartphones')
    expect(router.currentRoute.value.params.category).toBe('smartphones')

    expect(store.fetchProductsCategory).toHaveBeenCalledWith(
      'smartphones',
      wrapper.vm.itemPerPage,
      wrapper.vm.page,
      wrapper.vm.selectOrderValue
    )

    // Simuler un changement de catégorie à 'reset'
    await wrapper.setProps({ category: 'reset' })
    await router.push('/Ecommerce')
    await router.isReady()

    await flushPromises()
    await wrapper.vm.$nextTick()
    // Vérifier que le router a été appelé pour rediriger vers '/Ecommerce'
    expect(routerPushSpy).toHaveBeenCalledWith('/Ecommerce')

    // Vérifier que fetchNewData a été appelé
    expect(store.fetchProducts).toHaveBeenCalled()
  })
})
