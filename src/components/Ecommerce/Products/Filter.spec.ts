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

  it('bascule expandFilters lors du clic sur le titre de la carte', async () => {
    // Vérifier que expandFilters est initialement faux
    expect(wrapper.vm.expandFilters).toBe(false)

    // Trouver et cliquer sur le titre de la carte
    const cardTitle = wrapper.find('.v-card-title')
    await cardTitle.trigger('click')

    // Vérifier que expandFilters est maintenant vrai
    expect(wrapper.vm.expandFilters).toBe(true)

    // Vérifier que la carte de filtres est visible
    const filterCard = wrapper.find('.v-card[style*="margin-top: 3px"]')
    expect(filterCard.exists()).toBe(true)

    // Cliquer à nouveau sur le titre de la carte
    await cardTitle.trigger('click')

    // Vérifier que expandFilters est de nouveau faux
    expect(wrapper.vm.expandFilters).toBe(false)

    // Vérifier que la carte de filtres n'est plus visible
    await wrapper.vm.$nextTick() // Attendre la mise à jour du DOM
    expect(wrapper.find('.v-card[style*="margin-top: 3px"]').exists()).toBe(false)
  })

  it("change la catégorie et émet l'événement correspondant", async () => {
    wrapper.vm.expandFilters = true
    await wrapper.vm.$nextTick()
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
    wrapper.vm.expandFilters = true
    await wrapper.vm.$nextTick()
    wrapper.vm.categories = mockCategories

    const expandButton = wrapper.find('[aria-label="test-expand"]')
    await expandButton.trigger('click')

    const categoryItems = wrapper.findAll('[aria-label="test-select"]')
    expect(categoryItems).toHaveLength(15)
  })

  it('réinitialise la catégorie lorsque "Tout" est cliqué', async () => {
    wrapper.vm.expandFilters = true
    await wrapper.vm.$nextTick()

    const resetItem = wrapper.find('[aria-label="test-reset"]')

    await resetItem.trigger('click')

    expect(wrapper.emitted()).toHaveProperty('category')
    expect(wrapper.emitted('category')?.[0]).toEqual(['reset'])
  })
})
