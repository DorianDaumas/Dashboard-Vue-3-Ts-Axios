import { describe, expect, beforeEach, it, vi } from 'vitest'
import { routes } from '@/router/index'
import { mount } from '@vue/test-utils'
import { createMemoryHistory, createRouter } from 'vue-router'
import { createTestingPinia } from '@pinia/testing'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import AddCart from './AddCart.vue'
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

describe('<AddCart></AddCart>', () => {
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
  it("Test l'initialisation du composant", async () => {
    wrapper = mount(AddCart, {
      global: {
        plugins: [pinia, router, vuetify]
      },
      props: {
        productDetail: testItems
      },
      shallow: true
    })
    await wrapper.vm.$nextTick()
    const cart = wrapper.find('[aria-label="test-add-cart"]')
    expect(cart.exists()).toBe(true)
    expect(cart.isVisible()).toBe(true)
  })

  it("Test ajout d'item dans le panier et ajoute au localStorage (cart vide)", async () => {
    const setItem = vi.spyOn(Storage.prototype, 'setItem')

    wrapper = mount(AddCart, {
      global: {
        plugins: [pinia, router, vuetify]
      },
      props: {
        productDetail: testItems
      },
      shallow: true
    })
    await wrapper.vm.$nextTick()
    const addProductEmptyCart = wrapper.findComponent('[aria-label="test-add-cart-no-item"]')
    const addItem = vi.spyOn(wrapper.vm, 'addToCart')
    addProductEmptyCart.trigger('click')
    await wrapper.vm.$nextTick()
    expect(addItem).toHaveBeenCalledWith(wrapper.vm.productDetail)
    const productDetail = wrapper.vm.productDetail
    expect(setItem).toHaveBeenCalledWith(
      'cart',
      expect.stringContaining(JSON.stringify(productDetail))
    )
    expect(wrapper.html()).toMatchInlineSnapshot(`
      "<div aria-label="test-add-cart">
        <div>
          <v-btn-stub color="#42b883" symbol="Symbol(vuetify:v-btn-toggle)" flat="false" icon="false" block="false" slim="false" stacked="false" ripple="true" border="false" density="default" disabled="false" loading="false" tile="false" replace="false" exact="false" size="default" tag="button" variant="outlined" aria-label="test-add-cart-no-item"></v-btn-stub>
        </div>
      </div>"
    `)
  })

  it("Test ajout d'item dans le panier et ajoute au localStorage (cart avec item)", async () => {
    const setItem = vi.spyOn(Storage.prototype, 'setItem')

    wrapper = mount(AddCart, {
      global: {
        plugins: [pinia, router, vuetify]
      },
      props: {
        productDetail: testItems
      },
      shallow: true
    })
    await wrapper.vm.$nextTick()
    const addProductCart = wrapper.findComponent('[aria-label="test-add-cart-with-item"]')
    const addItem = vi.spyOn(wrapper.vm, 'addToCart')
    addProductCart.trigger('click')
    await wrapper.vm.$nextTick()
    expect(addItem).toHaveBeenCalledWith(wrapper.vm.productDetail)
    const productDetail = wrapper.vm.productDetail
    expect(setItem).toHaveBeenCalledWith(
      'cart',
      expect.stringContaining(JSON.stringify(productDetail))
    )
    expect(wrapper.html()).toMatchInlineSnapshot(`
      "<div aria-label="test-add-cart">
        <div>
          <v-btn-stub color="white" symbol="Symbol(vuetify:v-btn-toggle)" flat="false" icon="mdi-minus" block="false" slim="false" stacked="false" ripple="true" border="false" density="default" disabled="false" loading="false" tile="false" replace="false" exact="false" size="x-small" tag="button" variant="plain" aria-label="test-remove-cart-with-item"></v-btn-stub><span style="margin-left: 10px; margin-right: 10px;">2</span>
          <v-btn-stub color="white" symbol="Symbol(vuetify:v-btn-toggle)" flat="false" icon="mdi-plus" block="false" slim="false" stacked="false" ripple="true" border="false" density="default" disabled="false" loading="false" tile="false" replace="false" exact="false" size="small" tag="button" variant="plain" aria-label="test-add-cart-with-item"></v-btn-stub>
        </div>
      </div>"
    `)
  })

  it("Test remove d'item dans le panier et le suprime du localStorage", async () => {
    const setItem = vi.spyOn(Storage.prototype, 'setItem')
    wrapper = mount(AddCart, {
      global: {
        plugins: [pinia, router, vuetify]
      },
      props: {
        productDetail: testItems
      },
      shallow: true
    })
    await wrapper.vm.$nextTick()
    const removeProduct = wrapper.findComponent('[aria-label="test-remove-cart-with-item"]')
    const removeItem = vi.spyOn(wrapper.vm, 'removeCartItem')
    removeProduct.trigger('click')
    await wrapper.vm.$nextTick()
    expect(removeItem).toHaveBeenCalledWith(wrapper.vm.productDetail.id)
    expect(setItem).toHaveBeenCalledWith('cart', expect.arrayContaining([]))
    expect(wrapper.html()).toMatchInlineSnapshot(`
      "<div aria-label="test-add-cart">
        <div>
          <v-btn-stub color="#42b883" symbol="Symbol(vuetify:v-btn-toggle)" flat="false" icon="false" block="false" slim="false" stacked="false" ripple="true" border="false" density="default" disabled="false" loading="false" tile="false" replace="false" exact="false" size="default" tag="button" variant="outlined" aria-label="test-add-cart-no-item"></v-btn-stub>
        </div>
      </div>"
    `)
  })
})
