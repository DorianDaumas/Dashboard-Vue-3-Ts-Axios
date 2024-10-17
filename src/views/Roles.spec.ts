import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { flushPromises, mount, VueWrapper } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import Roles from './Roles.vue'
import { useUsersStore } from '@/stores/Users'
import { routes } from '@/router'
import { createRouter, createWebHistory } from 'vue-router'

describe('Roles.vue', () => {
  let wrapper: VueWrapper<any>
  let usersStore: ReturnType<typeof useUsersStore>
  let router: any

  beforeEach(async () => {
    router = createRouter({
      history: createWebHistory(),
      routes: routes
    })

    const vuetify = createVuetify({
      components,
      directives
    })

    const pinia = createTestingPinia({
      createSpy: vi.fn,
      stubActions: false
    })

    usersStore = useUsersStore()
    vi.spyOn(usersStore, 'fetchAllUsers').mockResolvedValue({
      success: true,
      content: {
        users: [
          {
            image: 'https://example.com/avatar.jpg',
            phone: '+33 6 12 34 56 78',
            email: 'john.doe@example.com',
            company: {
              name: 'Tech Solutions Inc.',
              title: 'Senior Developer',
              department: 'Engineering',
              address: {
                address: '123 Tech Street',
                postalCode: '75001',
                city: 'Paris'
              }
            },
            address: {
              address: '456 Home Avenue',
              postalCode: '75002',
              city: 'Paris'
            },
            birthDate: '1985-05-15',
            firstName: 'John',
            lastName: 'Doe',
            role: 'Admin',
            username: 'johndoe'
          }
        ],
        total: 1
      },
      status: 200
    })

    wrapper = mount(Roles, {
      global: {
        plugins: [pinia, vuetify, router],
        stubs: {
          Pagination: true
        }
      }
    })

    await router.isReady()
    await flushPromises()
    await wrapper.vm.$nextTick()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('rend le composant correctement', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('appelle fetchAllUsers lors du montage', async () => {
    expect(usersStore.fetchAllUsers).toHaveBeenCalledWith(10, 0, '')
  })

  it('affiche les données des utilisateurs dans le tableau', async () => {
    await wrapper.vm.$nextTick()
    const rows = wrapper.find('[aria-label="test-roles-table"]').findAll('tbody td')
    expect(rows[1].text()).toBe('Doe')
    expect(rows[2].text()).toBe('John')
    expect(rows[3].text()).toBe('john.doe@example.com')
    expect(rows[4].text()).toBe('Admin')
    expect(rows[5].text()).toBe('Engineering')
    expect(rows[6].text()).toBe('Senior Developer')
  })

  it("navigue vers la page de l'utilisateur lors du clic sur le bouton de visualisation", async () => {
    await wrapper.vm.$nextTick()
    const viewButton = wrapper.find('[aria-label="test-push-to-user"]')
    expect(viewButton.exists()).toBe(true)

    console.log(viewButton.html())

    const routerPush = vi.fn()
    router.push = routerPush

    await viewButton.trigger('click')
    await flushPromises()
    await wrapper.vm.$nextTick()
    expect(routerPush).toHaveBeenCalledWith('/Users/johndoe')
  })

  it('met à jour les données lors du changement de pagination', async () => {
    await wrapper.vm.paginationChange({ pages: 1, itemsPerPage: 20 })
    expect(usersStore.fetchAllUsers).toHaveBeenCalledWith(20, 1, '')
  })
})
