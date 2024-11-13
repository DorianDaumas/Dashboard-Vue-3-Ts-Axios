import { mount } from '@vue/test-utils'
import { describe, it, expect, beforeEach } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import TableCart from './TableCart.vue'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

global.ResizeObserver = require('resize-observer-polyfill')

describe('TableCart.vue (tableau final avant payement)', () => {
  let wrapper: any

  const mockCart = [
    {
      id: 1,
      title: 'Product 1',
      price: 10,
      stock: 5,
      rating: 4.5,
      description: 'Description',
      brand: 'Brand',
      images: ['image1.jpg'],
      tags: ['tag'],
      thumbnail: 'image1.jpg'
    },
    {
      id: 2,
      title: 'Product 2',
      price: 20,
      stock: 15,
      rating: 3.5,
      description: 'Description',
      brand: 'Brand',
      images: ['image12jpg'],
      tags: ['tag'],
      thumbnail: 'image2.jpg'
    },
    {
      id: 2,
      title: 'Product 2',
      price: 20,
      stock: 15,
      rating: 3.5,
      description: 'Description',
      brand: 'Brand',
      images: ['image12jpg'],
      tags: ['tag'],
      thumbnail: 'image2.jpg'
    }
  ]

  beforeEach(() => {
    setActivePinia(createPinia())
    const vuetify = createVuetify({
      components,
      directives
    })

    wrapper = mount(TableCart, {
      global: {
        plugins: [vuetify]
      },
      props: {
        cart: mockCart
      }
    })
  })

  it('renders the component', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('displays the correct table headers', () => {
    const headers = wrapper.findAll('th')
    expect(headers[0].text()).toBe('PRODUIT')
    expect(headers[2].text()).toBe('PRIX')
    expect(headers[3].text()).toBe('QUANTITÉ')
    expect(headers[4].text()).toBe('TOTAL')
  })

  it('displays the correct number of product rows', () => {
    const productRows = wrapper.findAll('tbody tr').slice(1, -1) // Exclude header and reduction rows
    expect(productRows.length).toBe(2) // Should be 2 unique products
  })

  it('calculates and displays the correct quantity for each product', () => {
    const quantityCells = wrapper.findAll('td:nth-child(4)')
    expect(quantityCells[0].text()).toBe('1')
    expect(quantityCells[1].text()).toBe('2')
  })

  it('displays the reduction row', () => {
    const reductionRow = wrapper.findAll('tbody tr').at(-1)
    expect(reductionRow.findAll('th')[0].text()).toBe('Réduction')
    expect(reductionRow.findAll('th')[1].text()).toBe('-10 %')
  })
})
