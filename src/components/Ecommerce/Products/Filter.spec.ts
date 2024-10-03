import { describe, expect, beforeEach, it, vi } from 'vitest'
import { flushPromises, mount, VueWrapper } from '@vue/test-utils'
import { createMemoryHistory, createRouter, type Router } from 'vue-router'
import { createTestingPinia } from '@pinia/testing'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import Filters from './Filters.vue'
import { useEcommerceStore } from '@/stores/Ecommerce'
import { routes } from '@/router'

global.ResizeObserver = require('resize-observer-polyfill')

const mockCategories = {
  categories: [
    { name: 'Category 1', slug: 'category-1' },
    { name: 'Category 2', slug: 'category-2' }
  ]
}

describe('Filters.vue', () => {
  let wrapper: VueWrapper<any>
  let store: ReturnType<typeof useEcommerceStore>
  let router: Router
  let pinia: any

  beforeEach(async () => {
    router = createRouter({
      history: createMemoryHistory(),
      routes: routes
    })

    const vuetify = createVuetify({
      components,
      directives
    })

    pinia = createTestingPinia({
      createSpy: vi.fn,
      stubActions: false
    })

    store = useEcommerceStore()
    // Mock fetchProductCategorie
    vi.spyOn(store, 'fetchProductCategorie').mockResolvedValue({
      success: true,
      content: mockCategories,
      status: 200
    })

    wrapper = mount(Filters, {
      global: {
        plugins: [pinia, router, vuetify]
      }
    })

    await router.isReady()

    await flushPromises()
  })

  it('appelle fetchProductCategorie lors du montage du composant', async () => {
    // Attendre que le composant soit complètement monté
    await wrapper.vm.$nextTick()

    // Vérifier que fetchProductCategorie a été appelé
    expect(store.fetchProductCategorie).toHaveBeenCalledTimes(1)

    // Attendre que le store soit mis à jour
    await flushPromises()

    // Vérifier que les catégories ont été mises à jour
    expect(wrapper.vm.categories).toEqual(mockCategories)
  })

  it("change la catégorie et émet l'événement correspondant", async () => {
    wrapper.vm.categories = mockCategories

    const expandButton = wrapper.find('[aria-label="test-expand"]')
    await expandButton.trigger('click')

    const categoryItem = wrapper.find('[aria-label="test-select"]')
    await categoryItem.trigger('click')
    expect(wrapper.emitted()).toHaveProperty('category')
    expect(wrapper.emitted('category')?.[0]).toEqual(['category-1'])
  })

  it('affiche toutes les catégories lorsque "Tout afficher" est cliqué', async () => {
    const mockCategories = {
      categories: Array.from({ length: 15 }, (_, i) => ({
        name: `Category ${i + 1}`,
        slug: `category-${i + 1}`
      }))
    }
    wrapper.vm.categories = mockCategories

    const expandButton = wrapper.find('[aria-label="test-expand"]')
    await expandButton.trigger('click')

    const categoryItems = wrapper.findAll('[aria-label="test-select"]')
    expect(categoryItems).toHaveLength(15)
  })

  it('réinitialise la catégorie lorsque "Tout" est cliqué', async () => {
    const resetItem = wrapper.find('.v-list-item')
    await resetItem.trigger('click')

    expect(wrapper.emitted()).toHaveProperty('category')
    expect(wrapper.emitted('category')?.[0]).toEqual(['reset'])
  })
})
