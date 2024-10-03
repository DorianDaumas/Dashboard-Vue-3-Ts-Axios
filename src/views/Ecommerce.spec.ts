import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import Ecommerce from '@/views/Ecommerce.vue'
import { createTestingPinia } from '@pinia/testing'
import router from '@/router'

vi.mock('@/router', () => ({
  default: {
    push: vi.fn()
  }
}))

describe('Ecommerce.vue', () => {
  let wrapper: VueWrapper<any>
  const vuetify = createVuetify({ components, directives })

  beforeEach(() => {
    wrapper = mount(Ecommerce, {
      global: {
        plugins: [createTestingPinia(), vuetify],
        stubs: {
          Filters: true,
          ProductsList: true
        }
      }
    })
  })

  it('rend le composant Filters', () => {
    expect(wrapper.findComponent({ name: 'Filters' }).exists()).toBe(true)
  })

  it('rend le composant ProductsList', () => {
    expect(wrapper.findComponent({ name: 'ProductsList' }).exists()).toBe(true)
  })

  it("met à jour la catégorie et navigue vers la nouvelle route lors de l'appel à handleCategory", async () => {
    await wrapper.vm.handleCategory('electronics')
    expect(wrapper.vm.category).toBe('electronics')
    expect(router.push).toHaveBeenCalledWith('/Ecommerce/electronics')
  })

  it('passe la catégorie au composant ProductsList', async () => {
    await wrapper.vm.handleCategory('books')
    const productsList = wrapper.findComponent({ name: 'ProductsList' })
    expect(productsList.props('category')).toBe('books')
  })

  it('écoute l\'événement "category" du composant Filters', async () => {
    const filters = wrapper.findComponent({ name: 'Filters' })
    await filters.vm.$emit('category', 'clothing')
    expect(wrapper.vm.category).toBe('clothing')
    expect(router.push).toHaveBeenCalledWith('/Ecommerce/clothing')
  })
})
