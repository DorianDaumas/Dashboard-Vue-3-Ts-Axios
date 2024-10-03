import { describe, expect, beforeEach, it } from 'vitest'
import { routes } from '@/router/index'
import { mount } from '@vue/test-utils'
import { createMemoryHistory, createRouter } from 'vue-router'
import { createTestingPinia } from '@pinia/testing'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import Product from './Product.vue'
global.ResizeObserver = require('resize-observer-polyfill')

const testItems = {
  id: 10,
  title: 'Gucci Bloom Eau de',
  description:
    "Gucci Bloom by Gucci is a floral and captivating fragrance, with notes of tuberose, jasmine, and Rangoon creeper. It's a modern and romantic scent.",
  category: 'fragrances',
  price: 79.99,
  discountPercentage: 8.9,
  rating: 2.69,
  stock: 93,
  tags: ['fragrances', 'perfumes'],
  brand: 'Gucci',
  sku: 'FFKZ6HOF',
  weight: 10,
  warrantyInformation: 'No warranty',
  shippingInformation: 'Ships in 2 weeks',
  availabilityStatus: 'In Stock',
  reviews: [
    {
      rating: 5,
      comment: 'Great value for money!',
      date: '2024-05-23T08:56:21.620Z',
      reviewerName: 'Aria Parker',
      reviewerEmail: 'aria.parker@x.dummyjson.com'
    },
    {
      rating: 4,
      comment: 'Excellent quality!',
      date: '2024-05-23T08:56:21.620Z',
      reviewerName: 'Natalie Harris',
      reviewerEmail: 'natalie.harris@x.dummyjson.com'
    },
    {
      rating: 4,
      comment: 'Fast shipping!',
      date: '2024-05-23T08:56:21.620Z',
      reviewerName: 'Ava Harris',
      reviewerEmail: 'ava.harris@x.dummyjson.com'
    }
  ],
  returnPolicy: 'No return policy',
  minimumOrderQuantity: 10,
  meta: {
    createdAt: '2024-05-23T08:56:21.620Z',
    updatedAt: '2024-05-23T08:56:21.620Z',
    barcode: '8232190382069',
    qrCode: 'https://assets.dummyjson.com/public/qr-code.png'
  },
  images: [
    'https://cdn.dummyjson.com/products/images/fragrances/Gucci%20Bloom%20Eau%20de/1.png',
    'https://cdn.dummyjson.com/products/images/fragrances/Gucci%20Bloom%20Eau%20de/2.png',
    'https://cdn.dummyjson.com/products/images/fragrances/Gucci%20Bloom%20Eau%20de/3.png'
  ],
  thumbnail:
    'https://cdn.dummyjson.com/products/images/fragrances/Gucci%20Bloom%20Eau%20de/thumbnail.png'
}

describe('<Product></Product>', () => {
  let router: any
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
  it("Test l'initialisation du composant et de l'affichage des differentes features", async () => {
    const formatPrice = (price: number) => {
      return Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'EUR'
      }).format(price)
    }
    const wrapper = mount(Product, {
      global: {
        plugins: [pinia, router, vuetify]
      },
      props: {
        productDetail: testItems
      }
    })
    await wrapper.vm.$nextTick()
    const product = wrapper.findComponent('[aria-label="test-product"]')
    expect(product.exists()).toBe(true)
    expect(product.isVisible()).toBe(true)

    // recupere les elements
    const productTitle = wrapper.findComponent('[aria-label="test-title"]')
    const productRating = wrapper.findComponent('[aria-label="test-rating"]')
    const productPrice = wrapper.findComponent('[aria-label="test-price"]').find('.product-price')
    const productStock = wrapper.findComponent('[aria-label="test-price"]').find('.product-stock')
    const productBrand = wrapper.find('[aria-label="test-brand"]')
    const productDescription = wrapper.find('[aria-label="test-description"]')
    const productInfoWaranty = wrapper.find('[aria-label="test-container-info"]')
    const productSku = wrapper.find('[aria-label="test-sku"]')
    const productRedirection = wrapper.find('[aria-label="test-redirection"]')

    // test les affichages
    expect(productTitle.text()).toBe(wrapper.vm.productDetail.title)
    expect((productRating as any).props().modelValue).toBe(wrapper.vm.productDetail.rating)
    expect(productPrice.text()).toBe(formatPrice(wrapper.vm.productDetail.price))
    expect(parseInt(productStock.text())).toBe(wrapper.vm.productDetail.stock)
    expect(productBrand.text()).toBe(`Marque : ${wrapper.vm.productDetail.brand}`)
    expect(productDescription.text()).toBe(wrapper.vm.productDetail.description)
    expect(productInfoWaranty.findAll('span').at(0)!.text()).toBe(
      wrapper.vm.productDetail.returnPolicy
    )
    expect(productInfoWaranty.findAll('span').at(1)!.text()).toBe(
      wrapper.vm.productDetail.warrantyInformation
    )
    expect(productInfoWaranty.findAll('span').at(2)!.text()).toBe(
      wrapper.vm.productDetail.shippingInformation
    )
    expect(productSku.text()).toBe(wrapper.vm.productDetail.sku)
    productRedirection.trigger('click')
    await wrapper.vm.$nextTick()
    expect(productRedirection.attributes().href).toBe(
      `/Ecommerce/${wrapper.vm.productDetail.category}`
    )
    expect(productRedirection.find('.v-chip__content').text()).toBe(
      wrapper.vm.productDetail.category
    )
    const tagElements = wrapper.findAll('[aria-label="test-tags"]')
    tagElements.forEach((tagElement, index) => {
      expect(tagElement.text()).toContain(wrapper.vm.productDetail.tags[index])
    })
  })
})
