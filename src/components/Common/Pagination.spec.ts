import { describe, expect, beforeEach, it } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import Pagination from '@/components/Common/Pagination.vue'
import { createTestingPinia } from '@pinia/testing'

describe('Pagination', () => {
  let wrapper: VueWrapper<any>
  const vuetify = createVuetify({ components, directives })

  const createWrapper = (props = {}) => {
    return mount(Pagination, {
      global: {
        plugins: [createTestingPinia(), vuetify]
      },
      props: {
        total: 208,
        itemsPerPage: 10,
        pages: 0,
        ...props
      }
    })
  }

  beforeEach(() => {
    wrapper = createWrapper()
  })

  it('affiche correctement les informations de pagination', () => {
    const paginationInfo = wrapper.find('[aria-label="test-pagination-info"]')
    expect(paginationInfo.text()).toBe(
      `${wrapper.props().pages} - ${wrapper.props().pages + wrapper.props().itemsPerPage} de ${wrapper.props().total}`
    )
  })

  it('désactive le bouton "première page" quand on est sur la première page', async () => {
    const firstPageButton = wrapper.find('[aria-label="firstPagePagination"]')
    expect(firstPageButton.attributes('disabled')).toBeDefined()
  })

  it('active le bouton "première page" quand on n\'est pas sur la première page', async () => {
    wrapper.vm.paginationPages = 10
    const firstPageButton = wrapper.find('[aria-label="firstPagePagination"]')
    expect(firstPageButton.attributes('disabled')).toBe('')
  })

  it('retour à la première page au click sur le bouton "première page"', async () => {
    wrapper.vm.paginationPages = 100
    await wrapper.vm.$nextTick()
    const firstPageButton = wrapper.find('[aria-label="firstPagePagination"]')
    await firstPageButton.trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.paginationPages).toBe(0)
  })

  it('désactive le bouton "page précédente" quand on est sur la première page', () => {
    const prevButton = wrapper.find('[aria-label="prevPagination"]')
    expect(prevButton.attributes('disabled')).toBeDefined()
  })

  it('active le bouton "page précédente" quand on n\'est pas sur la première page', async () => {
    wrapper.vm.paginationPages = 10
    const prevButton = wrapper.find('[aria-label="prevPagination"]')
    expect(prevButton.attributes('disabled')).toBe('')
  })

  it('va à la page précédente au click sur le bouton "page précédente"', async () => {
    wrapper.vm.paginationPages = 100
    await wrapper.vm.$nextTick()
    const prevButton = wrapper.find('[aria-label="prevPagination"]')
    await prevButton.trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.paginationPages).toBe(90)
  })

  it('désactive le bouton "page suivante" quand on est sur la dernière page', async () => {
    wrapper.vm.paginationPages = wrapper.props().total - wrapper.props().itemsPerPage
    const nextButton = wrapper.find('[aria-label="nextPagination"]')
    await wrapper.vm.$nextTick()
    expect(nextButton.attributes('disabled')).toBeDefined()
  })

  it('active le bouton "page suivante" quand on n\'est pas sur la dernière page', () => {
    const nextButton = wrapper.find('[aria-label="nextPagination"]')
    expect(nextButton.attributes('disabled')).toBeUndefined()
  })

  it('va à la page suivante au click sur le bouton "page suivante"', async () => {
    wrapper.vm.paginationPages = 100
    await wrapper.vm.$nextTick()
    const nextButton = wrapper.find('[aria-label="nextPagination"]')
    await nextButton.trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.paginationPages).toBe(110)
  })

  it('désactive le bouton "dernière page" quand on est sur la dernière page', async () => {
    wrapper.vm.paginationPages = wrapper.props().total - wrapper.props().itemsPerPage
    const lastButton = wrapper.find('[aria-label="lastPagination"]')
    await wrapper.vm.$nextTick()
    expect(lastButton.attributes('disabled')).toBeDefined()
  })

  it('active le bouton "dernière page" quand on n\'est pas sur la dernière page', () => {
    const lastButton = wrapper.find('[aria-label="lastPagination"]')
    expect(lastButton.attributes('disabled')).toBeUndefined()
  })

  it('va à la dernière page au click sur le bouton "dernière page"', async () => {
    wrapper.vm.paginationPages = 100
    await wrapper.vm.$nextTick()
    const lastButton = wrapper.find('[aria-label="lastPagination"]')
    await lastButton.trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.paginationPages).toBe(wrapper.props().total - wrapper.props().itemsPerPage)
  })

  it('émet l\'événement "callbackPagination" lors du clic sur les boutons de navigation', async () => {
    const buttons = wrapper.findAll('button')
    for (const button of buttons) {
      await button.trigger('click')
      expect(wrapper.emitted('callbackPagination'))
    }
  })

  it("met à jour le nombre d'éléments par page lors de la sélection", async () => {
    const select = wrapper.findComponent({ name: 'v-select' })
    await select.setValue(25)
    expect(wrapper.emitted('callbackPagination')).toBeTruthy()
    const emittedValue = wrapper.emitted('callbackPagination')?.at(-1)?.[0]
    expect(emittedValue).toEqual({ pages: 0, itemsPerPage: 25 })
  })
})
