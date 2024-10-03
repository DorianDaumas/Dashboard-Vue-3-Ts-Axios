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
  { title: '', align: 'left', key: 'title' },
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
    expect(wrapper.html()).toMatchInlineSnapshot(`
      "<div data-v-d8ac8a2b="">
        <div data-v-d8ac8a2b="" class="v-container v-container--fluid v-locale--is-ltr">
          <div data-v-d8ac8a2b="" class="v-row">
            <div data-v-d8ac8a2b="" class="v-col-md-8 v-col">
              <div data-v-d8ac8a2b="" class="v-table v-table--has-top v-table--has-bottom v-theme--light v-table--density-default v-data-table data-table" aria-label="data-table" items-length="10">
                <!---->
                <div class="v-table__wrapper">
                  <table>
                    <!---->
                    <thead>
                      <tr>
                        <th class="v-data-table__td v-data-table-column--align-left v-data-table__th" style="width: 50px;" colspan="1" rowspan="1">
                          <div class="v-data-table-header__content"><span>Produit</span>
                            <!---->
                            <!---->
                          </div>
                        </th>
                        <th class="v-data-table__td v-data-table-column--align-left v-data-table__th" colspan="1" rowspan="1">
                          <div class="v-data-table-header__content"><span></span>
                            <!---->
                            <!---->
                          </div>
                        </th>
                        <th class="v-data-table__td v-data-table-column--align-start v-data-table__th" colspan="1" rowspan="1">
                          <div class="v-data-table-header__content"><span>Prix</span>
                            <!---->
                            <!---->
                          </div>
                        </th>
                        <th class="v-data-table__td v-data-table-column--align-center v-data-table__th" colspan="1" rowspan="1">
                          <div class="v-data-table-header__content"><span>Note</span>
                            <!---->
                            <!---->
                          </div>
                        </th>
                        <th class="v-data-table__td v-data-table-column--align-center v-data-table__th" colspan="1" rowspan="1">
                          <div class="v-data-table-header__content"><span>Stock</span>
                            <!---->
                            <!---->
                          </div>
                        </th>
                      </tr>
                      <!---->
                    </thead>
                    <!---->
                    <tbody>
                      <!---->
                      <tr data-v-d8ac8a2b="" style="cursor: pointer;">
                        <td data-v-d8ac8a2b="">
                          <div data-v-d8ac8a2b="" class="v-responsive v-img v-img--booting product-thumb-picture">
                            <div class="v-responsive__sizer"></div>
                            <transition-stub name="fade-transition" appear="true" persisted="false" css="true"><img class="v-img__img v-img__img--contain" src="https://cdn.dummyjson.com/products/images/furniture/Annibale%20Colombo%20Bed/thumbnail.png" style="display: none;"></transition-stub>
                            <transition-stub name="fade-transition" appear="false" persisted="false" css="true">
                              <!---->
                            </transition-stub>
                            <!---->
                            <!---->
                            <!---->
                            <!---->
                          </div>
                        </td>
                        <td data-v-d8ac8a2b="">item 1</td>
                        <td data-v-d8ac8a2b="">6,00&nbsp;€</td>
                        <td data-v-d8ac8a2b="">
                          <div data-v-d8ac8a2b="" class="v-rating v-rating--readonly v-theme--light"><label for="v-rating-0-0" class="v-rating__item--full"><span class="v-rating__hidden">Rating 0 of 5</span>
                              <!---->
                            </label><input class="v-rating__hidden" name="v-rating-0" id="v-rating-0-0" type="radio" tabindex="-1" readonly="" value="0">
                            <div class="v-rating__wrapper">
                              <!---->
                              <div class="v-rating__item"><label for="v-rating-0-0-5" class="v-rating__item--half"><span class="v-rating__hidden">Rating 0.5 of 5</span><button type="button" class="v-btn v-btn--icon v-theme--light v-btn--density-default v-btn--variant-plain" style="color: rgb(123, 128, 154); caret-color: #7b809a; width: 32px; height: 32px;" aria-label="Rating 0.5 of 5"><span class="v-btn__overlay"></span><span class="v-btn__underlay"></span>
                                    <!----><span class="v-btn__content" data-no-activator=""><i class="mdi-star mdi v-icon notranslate v-theme--light v-icon--size-default" aria-hidden="true"></i></span>
                                    <!---->
                                    <!---->
                                  </button></label><input class="v-rating__hidden" name="v-rating-0" id="v-rating-0-0-5" type="radio" tabindex="-1" readonly="" value="0.5"><label for="v-rating-0-1" class="v-rating__item--full"><span class="v-rating__hidden">Rating 1 of 5</span><button type="button" class="v-btn v-btn--icon v-theme--light v-btn--density-default v-btn--variant-plain" style="color: rgb(123, 128, 154); caret-color: #7b809a; width: 32px; height: 32px;" aria-label="Rating 1 of 5"><span class="v-btn__overlay"></span><span class="v-btn__underlay"></span>
                                    <!----><span class="v-btn__content" data-no-activator=""><i class="mdi-star mdi v-icon notranslate v-theme--light v-icon--size-default" aria-hidden="true"></i></span>
                                    <!---->
                                    <!---->
                                  </button></label><input class="v-rating__hidden" name="v-rating-0" id="v-rating-0-1" type="radio" tabindex="-1" readonly="" value="1"></div>
                              <!---->
                            </div>
                            <div class="v-rating__wrapper">
                              <!---->
                              <div class="v-rating__item"><label for="v-rating-0-1-5" class="v-rating__item--half"><span class="v-rating__hidden">Rating 1.5 of 5</span><button type="button" class="v-btn v-btn--icon v-theme--light v-btn--density-default v-btn--variant-plain" style="color: rgb(123, 128, 154); caret-color: #7b809a; width: 32px; height: 32px;" aria-label="Rating 1.5 of 5"><span class="v-btn__overlay"></span><span class="v-btn__underlay"></span>
                                    <!----><span class="v-btn__content" data-no-activator=""><i class="mdi-star mdi v-icon notranslate v-theme--light v-icon--size-default" aria-hidden="true"></i></span>
                                    <!---->
                                    <!---->
                                  </button></label><input class="v-rating__hidden" name="v-rating-0" id="v-rating-0-1-5" type="radio" tabindex="-1" readonly="" value="1.5"><label for="v-rating-0-2" class="v-rating__item--full"><span class="v-rating__hidden">Rating 2 of 5</span><button type="button" class="v-btn v-btn--icon v-theme--light v-btn--density-default v-btn--variant-plain" style="color: rgb(123, 128, 154); caret-color: #7b809a; width: 32px; height: 32px;" aria-label="Rating 2 of 5"><span class="v-btn__overlay"></span><span class="v-btn__underlay"></span>
                                    <!----><span class="v-btn__content" data-no-activator=""><i class="mdi-star mdi v-icon notranslate v-theme--light v-icon--size-default" aria-hidden="true"></i></span>
                                    <!---->
                                    <!---->
                                  </button></label><input class="v-rating__hidden" name="v-rating-0" id="v-rating-0-2" type="radio" tabindex="-1" readonly="" value="2"></div>
                              <!---->
                            </div>
                            <div class="v-rating__wrapper">
                              <!---->
                              <div class="v-rating__item"><label for="v-rating-0-2-5" class="v-rating__item--half"><span class="v-rating__hidden">Rating 2.5 of 5</span><button type="button" class="v-btn v-btn--icon v-theme--light v-btn--density-default v-btn--variant-plain" style="color: rgb(123, 128, 154); caret-color: #7b809a; width: 32px; height: 32px;" aria-label="Rating 2.5 of 5"><span class="v-btn__overlay"></span><span class="v-btn__underlay"></span>
                                    <!----><span class="v-btn__content" data-no-activator=""><i class="mdi-star mdi v-icon notranslate v-theme--light v-icon--size-default" aria-hidden="true"></i></span>
                                    <!---->
                                    <!---->
                                  </button></label><input class="v-rating__hidden" name="v-rating-0" id="v-rating-0-2-5" type="radio" tabindex="-1" readonly="" value="2.5"><label for="v-rating-0-3" class="v-rating__item--full"><span class="v-rating__hidden">Rating 3 of 5</span><button type="button" class="v-btn v-btn--icon v-theme--light v-btn--density-default v-btn--variant-plain" style="color: rgb(123, 128, 154); caret-color: #7b809a; width: 32px; height: 32px;" aria-label="Rating 3 of 5"><span class="v-btn__overlay"></span><span class="v-btn__underlay"></span>
                                    <!----><span class="v-btn__content" data-no-activator=""><i class="mdi-star mdi v-icon notranslate v-theme--light v-icon--size-default" aria-hidden="true"></i></span>
                                    <!---->
                                    <!---->
                                  </button></label><input class="v-rating__hidden" name="v-rating-0" id="v-rating-0-3" type="radio" tabindex="-1" readonly="" value="3"></div>
                              <!---->
                            </div>
                            <div class="v-rating__wrapper">
                              <!---->
                              <div class="v-rating__item"><label for="v-rating-0-3-5" class="v-rating__item--half"><span class="v-rating__hidden">Rating 3.5 of 5</span><button type="button" class="v-btn v-btn--icon v-theme--light v-btn--density-default v-btn--variant-plain" style="color: rgb(123, 128, 154); caret-color: #7b809a; width: 32px; height: 32px;" aria-label="Rating 3.5 of 5"><span class="v-btn__overlay"></span><span class="v-btn__underlay"></span>
                                    <!----><span class="v-btn__content" data-no-activator=""><i class="mdi-star mdi v-icon notranslate v-theme--light v-icon--size-default" aria-hidden="true"></i></span>
                                    <!---->
                                    <!---->
                                  </button></label><input class="v-rating__hidden" name="v-rating-0" id="v-rating-0-3-5" type="radio" tabindex="-1" readonly="" value="3.5"><label for="v-rating-0-4" class="v-rating__item--full"><span class="v-rating__hidden">Rating 4 of 5</span><button type="button" class="v-btn v-btn--icon v-theme--light v-btn--density-default v-btn--variant-plain" style="color: rgb(123, 128, 154); caret-color: #7b809a; width: 32px; height: 32px;" aria-label="Rating 4 of 5"><span class="v-btn__overlay"></span><span class="v-btn__underlay"></span>
                                    <!----><span class="v-btn__content" data-no-activator=""><i class="mdi-star mdi v-icon notranslate v-theme--light v-icon--size-default" aria-hidden="true"></i></span>
                                    <!---->
                                    <!---->
                                  </button></label><input class="v-rating__hidden" name="v-rating-0" id="v-rating-0-4" type="radio" checked="" tabindex="-1" readonly="" value="4"></div>
                              <!---->
                            </div>
                            <div class="v-rating__wrapper">
                              <!---->
                              <div class="v-rating__item"><label for="v-rating-0-4-5" class="v-rating__item--half"><span class="v-rating__hidden">Rating 4.5 of 5</span><button type="button" class="v-btn v-btn--icon v-theme--light v-btn--density-default v-btn--variant-plain" style="width: 32px; height: 32px;" aria-label="Rating 4.5 of 5"><span class="v-btn__overlay"></span><span class="v-btn__underlay"></span>
                                    <!----><span class="v-btn__content" data-no-activator=""><i class="mdi-star-outline mdi v-icon notranslate v-theme--light v-icon--size-default" aria-hidden="true"></i></span>
                                    <!---->
                                    <!---->
                                  </button></label><input class="v-rating__hidden" name="v-rating-0" id="v-rating-0-4-5" type="radio" tabindex="-1" readonly="" value="4.5"><label for="v-rating-0-5" class="v-rating__item--full"><span class="v-rating__hidden">Rating 5 of 5</span><button type="button" class="v-btn v-btn--icon v-theme--light v-btn--density-default v-btn--variant-plain" style="width: 32px; height: 32px;" aria-label="Rating 5 of 5"><span class="v-btn__overlay"></span><span class="v-btn__underlay"></span>
                                    <!----><span class="v-btn__content" data-no-activator=""><i class="mdi-star-outline mdi v-icon notranslate v-theme--light v-icon--size-default" aria-hidden="true"></i></span>
                                    <!---->
                                    <!---->
                                  </button></label><input class="v-rating__hidden" name="v-rating-0" id="v-rating-0-5" type="radio" tabindex="-1" readonly="" value="5"></div>
                              <!---->
                            </div>
                          </div>
                        </td>
                        <td data-v-d8ac8a2b="">24</td>
                      </tr>
                      <!---->
                      <tr data-v-d8ac8a2b="" style="cursor: pointer;">
                        <td data-v-d8ac8a2b="">
                          <div data-v-d8ac8a2b="" class="v-responsive v-img v-img--booting product-thumb-picture">
                            <div class="v-responsive__sizer"></div>
                            <transition-stub name="fade-transition" appear="true" persisted="false" css="true"><img class="v-img__img v-img__img--contain" src="https://cdn.dummyjson.com/products/images/furniture/fdfdf%20Colombo%20Bed/thumbnail.png" style="display: none;"></transition-stub>
                            <transition-stub name="fade-transition" appear="false" persisted="false" css="true">
                              <!---->
                            </transition-stub>
                            <!---->
                            <!---->
                            <!---->
                            <!---->
                          </div>
                        </td>
                        <td data-v-d8ac8a2b="">item 2</td>
                        <td data-v-d8ac8a2b="">5,00&nbsp;€</td>
                        <td data-v-d8ac8a2b="">
                          <div data-v-d8ac8a2b="" class="v-rating v-rating--readonly v-theme--light"><label for="v-rating-11-0" class="v-rating__item--full"><span class="v-rating__hidden">Rating 0 of 5</span>
                              <!---->
                            </label><input class="v-rating__hidden" name="v-rating-11" id="v-rating-11-0" type="radio" tabindex="-1" readonly="" value="0">
                            <div class="v-rating__wrapper">
                              <!---->
                              <div class="v-rating__item"><label for="v-rating-11-0-5" class="v-rating__item--half"><span class="v-rating__hidden">Rating 0.5 of 5</span><button type="button" class="v-btn v-btn--icon v-theme--light v-btn--density-default v-btn--variant-plain" style="color: rgb(123, 128, 154); caret-color: #7b809a; width: 32px; height: 32px;" aria-label="Rating 0.5 of 5"><span class="v-btn__overlay"></span><span class="v-btn__underlay"></span>
                                    <!----><span class="v-btn__content" data-no-activator=""><i class="mdi-star mdi v-icon notranslate v-theme--light v-icon--size-default" aria-hidden="true"></i></span>
                                    <!---->
                                    <!---->
                                  </button></label><input class="v-rating__hidden" name="v-rating-11" id="v-rating-11-0-5" type="radio" tabindex="-1" readonly="" value="0.5"><label for="v-rating-11-1" class="v-rating__item--full"><span class="v-rating__hidden">Rating 1 of 5</span><button type="button" class="v-btn v-btn--icon v-theme--light v-btn--density-default v-btn--variant-plain" style="color: rgb(123, 128, 154); caret-color: #7b809a; width: 32px; height: 32px;" aria-label="Rating 1 of 5"><span class="v-btn__overlay"></span><span class="v-btn__underlay"></span>
                                    <!----><span class="v-btn__content" data-no-activator=""><i class="mdi-star mdi v-icon notranslate v-theme--light v-icon--size-default" aria-hidden="true"></i></span>
                                    <!---->
                                    <!---->
                                  </button></label><input class="v-rating__hidden" name="v-rating-11" id="v-rating-11-1" type="radio" tabindex="-1" readonly="" value="1"></div>
                              <!---->
                            </div>
                            <div class="v-rating__wrapper">
                              <!---->
                              <div class="v-rating__item"><label for="v-rating-11-1-5" class="v-rating__item--half"><span class="v-rating__hidden">Rating 1.5 of 5</span><button type="button" class="v-btn v-btn--icon v-theme--light v-btn--density-default v-btn--variant-plain" style="color: rgb(123, 128, 154); caret-color: #7b809a; width: 32px; height: 32px;" aria-label="Rating 1.5 of 5"><span class="v-btn__overlay"></span><span class="v-btn__underlay"></span>
                                    <!----><span class="v-btn__content" data-no-activator=""><i class="mdi-star mdi v-icon notranslate v-theme--light v-icon--size-default" aria-hidden="true"></i></span>
                                    <!---->
                                    <!---->
                                  </button></label><input class="v-rating__hidden" name="v-rating-11" id="v-rating-11-1-5" type="radio" tabindex="-1" readonly="" value="1.5"><label for="v-rating-11-2" class="v-rating__item--full"><span class="v-rating__hidden">Rating 2 of 5</span><button type="button" class="v-btn v-btn--icon v-theme--light v-btn--density-default v-btn--variant-plain" style="color: rgb(123, 128, 154); caret-color: #7b809a; width: 32px; height: 32px;" aria-label="Rating 2 of 5"><span class="v-btn__overlay"></span><span class="v-btn__underlay"></span>
                                    <!----><span class="v-btn__content" data-no-activator=""><i class="mdi-star mdi v-icon notranslate v-theme--light v-icon--size-default" aria-hidden="true"></i></span>
                                    <!---->
                                    <!---->
                                  </button></label><input class="v-rating__hidden" name="v-rating-11" id="v-rating-11-2" type="radio" tabindex="-1" readonly="" value="2"></div>
                              <!---->
                            </div>
                            <div class="v-rating__wrapper">
                              <!---->
                              <div class="v-rating__item"><label for="v-rating-11-2-5" class="v-rating__item--half"><span class="v-rating__hidden">Rating 2.5 of 5</span><button type="button" class="v-btn v-btn--icon v-theme--light v-btn--density-default v-btn--variant-plain" style="color: rgb(123, 128, 154); caret-color: #7b809a; width: 32px; height: 32px;" aria-label="Rating 2.5 of 5"><span class="v-btn__overlay"></span><span class="v-btn__underlay"></span>
                                    <!----><span class="v-btn__content" data-no-activator=""><i class="mdi-star mdi v-icon notranslate v-theme--light v-icon--size-default" aria-hidden="true"></i></span>
                                    <!---->
                                    <!---->
                                  </button></label><input class="v-rating__hidden" name="v-rating-11" id="v-rating-11-2-5" type="radio" tabindex="-1" readonly="" value="2.5"><label for="v-rating-11-3" class="v-rating__item--full"><span class="v-rating__hidden">Rating 3 of 5</span><button type="button" class="v-btn v-btn--icon v-theme--light v-btn--density-default v-btn--variant-plain" style="color: rgb(123, 128, 154); caret-color: #7b809a; width: 32px; height: 32px;" aria-label="Rating 3 of 5"><span class="v-btn__overlay"></span><span class="v-btn__underlay"></span>
                                    <!----><span class="v-btn__content" data-no-activator=""><i class="mdi-star mdi v-icon notranslate v-theme--light v-icon--size-default" aria-hidden="true"></i></span>
                                    <!---->
                                    <!---->
                                  </button></label><input class="v-rating__hidden" name="v-rating-11" id="v-rating-11-3" type="radio" tabindex="-1" readonly="" value="3"></div>
                              <!---->
                            </div>
                            <div class="v-rating__wrapper">
                              <!---->
                              <div class="v-rating__item"><label for="v-rating-11-3-5" class="v-rating__item--half"><span class="v-rating__hidden">Rating 3.5 of 5</span><button type="button" class="v-btn v-btn--icon v-theme--light v-btn--density-default v-btn--variant-plain" style="color: rgb(123, 128, 154); caret-color: #7b809a; width: 32px; height: 32px;" aria-label="Rating 3.5 of 5"><span class="v-btn__overlay"></span><span class="v-btn__underlay"></span>
                                    <!----><span class="v-btn__content" data-no-activator=""><i class="mdi-star mdi v-icon notranslate v-theme--light v-icon--size-default" aria-hidden="true"></i></span>
                                    <!---->
                                    <!---->
                                  </button></label><input class="v-rating__hidden" name="v-rating-11" id="v-rating-11-3-5" type="radio" tabindex="-1" readonly="" value="3.5"><label for="v-rating-11-4" class="v-rating__item--full"><span class="v-rating__hidden">Rating 4 of 5</span><button type="button" class="v-btn v-btn--icon v-theme--light v-btn--density-default v-btn--variant-plain" style="color: rgb(123, 128, 154); caret-color: #7b809a; width: 32px; height: 32px;" aria-label="Rating 4 of 5"><span class="v-btn__overlay"></span><span class="v-btn__underlay"></span>
                                    <!----><span class="v-btn__content" data-no-activator=""><i class="mdi-star mdi v-icon notranslate v-theme--light v-icon--size-default" aria-hidden="true"></i></span>
                                    <!---->
                                    <!---->
                                  </button></label><input class="v-rating__hidden" name="v-rating-11" id="v-rating-11-4" type="radio" tabindex="-1" readonly="" value="4"></div>
                              <!---->
                            </div>
                            <div class="v-rating__wrapper">
                              <!---->
                              <div class="v-rating__item"><label for="v-rating-11-4-5" class="v-rating__item--half"><span class="v-rating__hidden">Rating 4.5 of 5</span><button type="button" class="v-btn v-btn--icon v-theme--light v-btn--density-default v-btn--variant-plain" style="color: rgb(123, 128, 154); caret-color: #7b809a; width: 32px; height: 32px;" aria-label="Rating 4.5 of 5"><span class="v-btn__overlay"></span><span class="v-btn__underlay"></span>
                                    <!----><span class="v-btn__content" data-no-activator=""><i class="mdi-star mdi v-icon notranslate v-theme--light v-icon--size-default" aria-hidden="true"></i></span>
                                    <!---->
                                    <!---->
                                  </button></label><input class="v-rating__hidden" name="v-rating-11" id="v-rating-11-4-5" type="radio" tabindex="-1" readonly="" value="4.5"><label for="v-rating-11-5" class="v-rating__item--full"><span class="v-rating__hidden">Rating 5 of 5</span><button type="button" class="v-btn v-btn--icon v-theme--light v-btn--density-default v-btn--variant-plain" style="color: rgb(123, 128, 154); caret-color: #7b809a; width: 32px; height: 32px;" aria-label="Rating 5 of 5"><span class="v-btn__overlay"></span><span class="v-btn__underlay"></span>
                                    <!----><span class="v-btn__content" data-no-activator=""><i class="mdi-star mdi v-icon notranslate v-theme--light v-icon--size-default" aria-hidden="true"></i></span>
                                    <!---->
                                    <!---->
                                  </button></label><input class="v-rating__hidden" name="v-rating-11" id="v-rating-11-5" type="radio" checked="" tabindex="-1" readonly="" value="5"></div>
                              <!---->
                            </div>
                          </div>
                        </td>
                        <td data-v-d8ac8a2b="">56</td>
                      </tr>
                      <!---->
                      <tr data-v-d8ac8a2b="" style="cursor: pointer;">
                        <td data-v-d8ac8a2b="">
                          <div data-v-d8ac8a2b="" class="v-responsive v-img v-img--booting product-thumb-picture">
                            <div class="v-responsive__sizer"></div>
                            <transition-stub name="fade-transition" appear="true" persisted="false" css="true"><img class="v-img__img v-img__img--contain" src="https://cdn.dummyjson.com/products/images/furniture/ghgh%20Colombo%20Bed/thumbnail.png" style="display: none;"></transition-stub>
                            <transition-stub name="fade-transition" appear="false" persisted="false" css="true">
                              <!---->
                            </transition-stub>
                            <!---->
                            <!---->
                            <!---->
                            <!---->
                          </div>
                        </td>
                        <td data-v-d8ac8a2b="">item 3</td>
                        <td data-v-d8ac8a2b="">4,00&nbsp;€</td>
                        <td data-v-d8ac8a2b="">
                          <div data-v-d8ac8a2b="" class="v-rating v-rating--readonly v-theme--light"><label for="v-rating-22-0" class="v-rating__item--full"><span class="v-rating__hidden">Rating 0 of 5</span>
                              <!---->
                            </label><input class="v-rating__hidden" name="v-rating-22" id="v-rating-22-0" type="radio" tabindex="-1" readonly="" value="0">
                            <div class="v-rating__wrapper">
                              <!---->
                              <div class="v-rating__item"><label for="v-rating-22-0-5" class="v-rating__item--half"><span class="v-rating__hidden">Rating 0.5 of 5</span><button type="button" class="v-btn v-btn--icon v-theme--light v-btn--density-default v-btn--variant-plain" style="color: rgb(123, 128, 154); caret-color: #7b809a; width: 32px; height: 32px;" aria-label="Rating 0.5 of 5"><span class="v-btn__overlay"></span><span class="v-btn__underlay"></span>
                                    <!----><span class="v-btn__content" data-no-activator=""><i class="mdi-star mdi v-icon notranslate v-theme--light v-icon--size-default" aria-hidden="true"></i></span>
                                    <!---->
                                    <!---->
                                  </button></label><input class="v-rating__hidden" name="v-rating-22" id="v-rating-22-0-5" type="radio" tabindex="-1" readonly="" value="0.5"><label for="v-rating-22-1" class="v-rating__item--full"><span class="v-rating__hidden">Rating 1 of 5</span><button type="button" class="v-btn v-btn--icon v-theme--light v-btn--density-default v-btn--variant-plain" style="color: rgb(123, 128, 154); caret-color: #7b809a; width: 32px; height: 32px;" aria-label="Rating 1 of 5"><span class="v-btn__overlay"></span><span class="v-btn__underlay"></span>
                                    <!----><span class="v-btn__content" data-no-activator=""><i class="mdi-star mdi v-icon notranslate v-theme--light v-icon--size-default" aria-hidden="true"></i></span>
                                    <!---->
                                    <!---->
                                  </button></label><input class="v-rating__hidden" name="v-rating-22" id="v-rating-22-1" type="radio" tabindex="-1" readonly="" value="1"></div>
                              <!---->
                            </div>
                            <div class="v-rating__wrapper">
                              <!---->
                              <div class="v-rating__item"><label for="v-rating-22-1-5" class="v-rating__item--half"><span class="v-rating__hidden">Rating 1.5 of 5</span><button type="button" class="v-btn v-btn--icon v-theme--light v-btn--density-default v-btn--variant-plain" style="color: rgb(123, 128, 154); caret-color: #7b809a; width: 32px; height: 32px;" aria-label="Rating 1.5 of 5"><span class="v-btn__overlay"></span><span class="v-btn__underlay"></span>
                                    <!----><span class="v-btn__content" data-no-activator=""><i class="mdi-star mdi v-icon notranslate v-theme--light v-icon--size-default" aria-hidden="true"></i></span>
                                    <!---->
                                    <!---->
                                  </button></label><input class="v-rating__hidden" name="v-rating-22" id="v-rating-22-1-5" type="radio" tabindex="-1" readonly="" value="1.5"><label for="v-rating-22-2" class="v-rating__item--full"><span class="v-rating__hidden">Rating 2 of 5</span><button type="button" class="v-btn v-btn--icon v-theme--light v-btn--density-default v-btn--variant-plain" style="color: rgb(123, 128, 154); caret-color: #7b809a; width: 32px; height: 32px;" aria-label="Rating 2 of 5"><span class="v-btn__overlay"></span><span class="v-btn__underlay"></span>
                                    <!----><span class="v-btn__content" data-no-activator=""><i class="mdi-star mdi v-icon notranslate v-theme--light v-icon--size-default" aria-hidden="true"></i></span>
                                    <!---->
                                    <!---->
                                  </button></label><input class="v-rating__hidden" name="v-rating-22" id="v-rating-22-2" type="radio" checked="" tabindex="-1" readonly="" value="2"></div>
                              <!---->
                            </div>
                            <div class="v-rating__wrapper">
                              <!---->
                              <div class="v-rating__item"><label for="v-rating-22-2-5" class="v-rating__item--half"><span class="v-rating__hidden">Rating 2.5 of 5</span><button type="button" class="v-btn v-btn--icon v-theme--light v-btn--density-default v-btn--variant-plain" style="width: 32px; height: 32px;" aria-label="Rating 2.5 of 5"><span class="v-btn__overlay"></span><span class="v-btn__underlay"></span>
                                    <!----><span class="v-btn__content" data-no-activator=""><i class="mdi-star-outline mdi v-icon notranslate v-theme--light v-icon--size-default" aria-hidden="true"></i></span>
                                    <!---->
                                    <!---->
                                  </button></label><input class="v-rating__hidden" name="v-rating-22" id="v-rating-22-2-5" type="radio" tabindex="-1" readonly="" value="2.5"><label for="v-rating-22-3" class="v-rating__item--full"><span class="v-rating__hidden">Rating 3 of 5</span><button type="button" class="v-btn v-btn--icon v-theme--light v-btn--density-default v-btn--variant-plain" style="width: 32px; height: 32px;" aria-label="Rating 3 of 5"><span class="v-btn__overlay"></span><span class="v-btn__underlay"></span>
                                    <!----><span class="v-btn__content" data-no-activator=""><i class="mdi-star-outline mdi v-icon notranslate v-theme--light v-icon--size-default" aria-hidden="true"></i></span>
                                    <!---->
                                    <!---->
                                  </button></label><input class="v-rating__hidden" name="v-rating-22" id="v-rating-22-3" type="radio" tabindex="-1" readonly="" value="3"></div>
                              <!---->
                            </div>
                            <div class="v-rating__wrapper">
                              <!---->
                              <div class="v-rating__item"><label for="v-rating-22-3-5" class="v-rating__item--half"><span class="v-rating__hidden">Rating 3.5 of 5</span><button type="button" class="v-btn v-btn--icon v-theme--light v-btn--density-default v-btn--variant-plain" style="width: 32px; height: 32px;" aria-label="Rating 3.5 of 5"><span class="v-btn__overlay"></span><span class="v-btn__underlay"></span>
                                    <!----><span class="v-btn__content" data-no-activator=""><i class="mdi-star-outline mdi v-icon notranslate v-theme--light v-icon--size-default" aria-hidden="true"></i></span>
                                    <!---->
                                    <!---->
                                  </button></label><input class="v-rating__hidden" name="v-rating-22" id="v-rating-22-3-5" type="radio" tabindex="-1" readonly="" value="3.5"><label for="v-rating-22-4" class="v-rating__item--full"><span class="v-rating__hidden">Rating 4 of 5</span><button type="button" class="v-btn v-btn--icon v-theme--light v-btn--density-default v-btn--variant-plain" style="width: 32px; height: 32px;" aria-label="Rating 4 of 5"><span class="v-btn__overlay"></span><span class="v-btn__underlay"></span>
                                    <!----><span class="v-btn__content" data-no-activator=""><i class="mdi-star-outline mdi v-icon notranslate v-theme--light v-icon--size-default" aria-hidden="true"></i></span>
                                    <!---->
                                    <!---->
                                  </button></label><input class="v-rating__hidden" name="v-rating-22" id="v-rating-22-4" type="radio" tabindex="-1" readonly="" value="4"></div>
                              <!---->
                            </div>
                            <div class="v-rating__wrapper">
                              <!---->
                              <div class="v-rating__item"><label for="v-rating-22-4-5" class="v-rating__item--half"><span class="v-rating__hidden">Rating 4.5 of 5</span><button type="button" class="v-btn v-btn--icon v-theme--light v-btn--density-default v-btn--variant-plain" style="width: 32px; height: 32px;" aria-label="Rating 4.5 of 5"><span class="v-btn__overlay"></span><span class="v-btn__underlay"></span>
                                    <!----><span class="v-btn__content" data-no-activator=""><i class="mdi-star-outline mdi v-icon notranslate v-theme--light v-icon--size-default" aria-hidden="true"></i></span>
                                    <!---->
                                    <!---->
                                  </button></label><input class="v-rating__hidden" name="v-rating-22" id="v-rating-22-4-5" type="radio" tabindex="-1" readonly="" value="4.5"><label for="v-rating-22-5" class="v-rating__item--full"><span class="v-rating__hidden">Rating 5 of 5</span><button type="button" class="v-btn v-btn--icon v-theme--light v-btn--density-default v-btn--variant-plain" style="width: 32px; height: 32px;" aria-label="Rating 5 of 5"><span class="v-btn__overlay"></span><span class="v-btn__underlay"></span>
                                    <!----><span class="v-btn__content" data-no-activator=""><i class="mdi-star-outline mdi v-icon notranslate v-theme--light v-icon--size-default" aria-hidden="true"></i></span>
                                    <!---->
                                    <!---->
                                  </button></label><input class="v-rating__hidden" name="v-rating-22" id="v-rating-22-5" type="radio" tabindex="-1" readonly="" value="5"></div>
                              <!---->
                            </div>
                          </div>
                        </td>
                        <td data-v-d8ac8a2b="">6</td>
                      </tr>
                      <!---->
                      <!---->
                    </tbody>
                    <!---->
                    <!---->
                  </table>
                </div>
                <!---->
              </div>
            </div>
          </div>
        </div>
      </div>"
    `)
  })
})
