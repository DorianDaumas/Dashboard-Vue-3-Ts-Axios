import { describe, expect, beforeEach, it, vi } from 'vitest'
import { routes } from '@/router/index'
import { mount } from '@vue/test-utils'
import { createMemoryHistory, createRouter } from 'vue-router'
import { createTestingPinia } from '@pinia/testing'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import OtherProducts from './OtherProducts.vue'

const testHeader = [
  { title: 'Produit', align: 'left', width: '50px', key: 'thumbnail' },
  { title: 'Dénomination', align: 'left', key: 'title' },
  { title: 'Prix', align: 'start', justify: 'center', key: 'price' },
  { title: 'Note', key: 'rating', align: 'center' },
  { title: 'Stock', key: 'stock', align: 'center' }
]

const testItems = [
  {
    id: 1,
    title: 'item 1',
    thumbnail:
      'https://cdn.dummyjson.com/products/images/furniture/Annibale%20Colombo%20Bed/thumbnail.png',
    price: 6.0,
    stock: 24,
    rating: 4.0
  },
  {
    id: 2,
    title: 'item 2',
    thumbnail:
      'https://cdn.dummyjson.com/products/images/furniture/fdfdf%20Colombo%20Bed/thumbnail.png',
    price: 5.0,
    stock: 56,
    rating: 5.0
  },
  {
    id: 3,
    title: 'item 3',
    thumbnail:
      'https://cdn.dummyjson.com/products/images/furniture/ghgh%20Colombo%20Bed/thumbnail.png',
    price: 4.0,
    stock: 6,
    rating: 2.0
  }
]

describe('<OtherProducts></OtherProducts>', () => {
  let router: any
  let wrapper: any
  const pinia = createTestingPinia()

  const vuetify = createVuetify({
    components,
    directives
  })

  beforeEach(async () => {
    router = createRouter({
      history: createMemoryHistory(),
      routes: routes
    })
    router.push('/')
    await router.isReady()
  })
  it("Test l'initialisation et le fonctionnement du tableau", async () => {
    wrapper = mount(OtherProducts, {
      global: {
        plugins: [pinia, router, vuetify]
      },
      props: {
        otherProducts: {
          otherProductsDetail: testItems,
          limit: 10
        }
      }
    })
    await wrapper.vm.$nextTick()
    const dataTable = wrapper.findComponent('[aria-label="data-table"]')
    expect(dataTable.exists()).toBe(true)
    expect(dataTable.isVisible()).toBe(true)

    await wrapper.vm.$nextTick()

    const headerCells = wrapper.findAll('thead th')
    // le nombre de colonne (header) correspond au nombres d'éléments
    expect(headerCells.length).toBe(testHeader.length)
    // Verifie que chaques elements correspondent
    testHeader.forEach((header, index) => {
      expect(headerCells.at(index)!.text()).toBe(header.title)
    })

    const rows = dataTable.findAll('tbody tr')
    // le nombre de colonne (data) correspond au nombres d'éléments
    expect(rows.length).toBe(testItems.length)
    // Verifie que chaques elements correspondent
    testItems.forEach((item, index) => {
      expect(testItems.at(index)?.title).toBe(item.title)
      expect(testItems.at(index)?.id).toBe(item.id)
      expect(testItems.at(index)?.price).toBe(item.price)
      expect(testItems.at(index)?.stock).toBe(item.stock)
      expect(testItems.at(index)?.rating).toBe(item.rating)
      expect(testItems.at(index)?.thumbnail).toBe(item.thumbnail)
    })
  })

  it("test le click sur une row qui appel bien la function qui emit l'id au composant parent ", async () => {
    wrapper = await mount(OtherProducts, {
      global: {
        plugins: [pinia, router, vuetify]
      },
      props: {
        otherProducts: {
          otherProductsDetail: testItems,
          limit: 10
        }
      }
    })
    await wrapper.vm.$nextTick()
    const dataTable = wrapper.findComponent('[aria-label="data-table"]')
    const selectRow = vi.spyOn(wrapper.vm, 'selectRow')
    const firstRow = dataTable.findAll('tbody tr').at(0)
    await firstRow!.trigger('click')
    await wrapper.vm.$nextTick()
    expect(selectRow).toHaveBeenCalledOnce()
    expect(selectRow).toHaveBeenCalledWith(1)
    expect(wrapper.emitted()).toHaveProperty('clickRow')
    expect(wrapper.emitted('clickRow')![0]).toEqual([1])
  })

  it('snapshot ', async () => {
    wrapper = await mount(OtherProducts, {
      global: {
        plugins: [pinia, router, vuetify]
      },
      props: {
        otherProducts: {
          otherProductsDetail: testItems,
          limit: 10
        }
      }
    })
    await wrapper.vm.$nextTick()
  })
})
