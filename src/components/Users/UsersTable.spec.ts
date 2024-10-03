import { mount, flushPromises, VueWrapper } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { createRouter, createMemoryHistory, type Router } from 'vue-router'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import axios from 'axios'
import UsersTable from './UsersTable.vue'
import { useUsersStore } from '@/stores/Users'
import { routes } from '@/router'
import { createTestingPinia } from '@pinia/testing'
import { baseUrl } from '@/url'

global.ResizeObserver = require('resize-observer-polyfill')
vi.mock('axios')

const mockUsers = {
  users: [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      image: 'url_to_image',
      phone: '123-456-7890',
      role: 'user',
      company: {
        name: 'Company A',
        title: 'Developer',
        department: 'IT',
        address: {
          address: '123 Main St',
          postalCode: '12345',
          city: 'Anytown'
        }
      },
      username: 'johndoe'
    }
  ],
  total: 1
}

describe('UsersTable.vue', () => {
  let wrapper: VueWrapper<any>
  let store: ReturnType<typeof useUsersStore>
  let router: Router

  beforeEach(async () => {
    let pinia = createPinia()
    pinia = createTestingPinia({
      createSpy: vi.fn,
      stubActions: false,
      initialState: {
        loadingUsers: true
      }
    })
    setActivePinia(pinia)

    router = createRouter({
      history: createMemoryHistory(),
      routes: routes
    })

    const vuetify = createVuetify({
      components,
      directives
    })

    vi.mocked(axios.get).mockResolvedValue({ data: mockUsers, status: 200 })

    store = useUsersStore()
    vi.spyOn(store, 'fetchAllUsers')

    wrapper = mount(UsersTable, {
      global: {
        plugins: [pinia, router, vuetify]
      }
    })

    await router.isReady()
  })

  afterEach(() => {
    vi.resetAllMocks()
  })

  it("appelle l'API, met à jour le store et affiche correctement toutes les données de l'utilisateur", async () => {
    // Vérifier que l'appel API a été effectué
    expect(axios.get).toHaveBeenCalledTimes(1)
    expect(axios.get).toHaveBeenCalledWith(
      `${baseUrl}users/search?q=${wrapper.vm.search}&limit=${wrapper.vm.itemsPerPage}&skip=${wrapper.vm.pages}`
    )

    // Vérifier que la méthode fetchAllUsers du store a été appelée
    expect(store.fetchAllUsers).toHaveBeenCalledWith(
      wrapper.vm.itemsPerPage,
      wrapper.vm.pages,
      wrapper.vm.search
    )

    // Attendre que le store soit mis à jour
    await flushPromises()

    // Vérifier que le store a été mis à jour correctement
    expect(store.allUsers.users).toEqual(mockUsers.users)
    expect(store.allUsers.total).toBe(mockUsers.total)

    // Vérifier que le composant a rendu les données correctement
    const rows = wrapper.findAll('tr')
    expect(rows.length).toBe(2) // 1 pour l'en-tête + 1 pour l'utilisateur

    const userRow = rows[1]
    const user = mockUsers.users[0]

    // Vérifier l'image
    const img = userRow.find('[aria-label="test-img"]').find('img')
    expect(img.exists()).toBe(true)

    expect(img.attributes('src')).toBe(user.image)

    // Vérifier le nom
    expect(userRow.find('[aria-label="test-lastName"]').text()).toBe(user.lastName)

    // Vérifier le prénom
    expect(userRow.find('[aria-label="test-firstName"]').text()).toBe(user.firstName)

    // Vérifier le nom de l'entreprise
    expect(userRow.find('[aria-label="test-company"]').text()).toBe(user.company.name)

    // Vérifier l'adresse
    const addressElement = userRow.find('[aria-label="test-address"]')
    expect(addressElement.text()).toBe(
      `${user.company.address.address}, ${user.company.address.city} ${user.company.address.postalCode}`
    )

    // Vérifier le département de l'entreprise
    expect(userRow.find('[aria-label="test-company-dep"]').text()).toBe(user.company.department)

    // Vérifier l'email
    expect(userRow.find('[aria-label="test-email"]').text()).toBe(user.email)
  })

  it('met à jour les données lorsque la recherche change', async () => {
    const searchInput = wrapper.find('input[type="text"]')
    await searchInput.setValue('John')
    await flushPromises()

    expect(store.fetchAllUsers).toHaveBeenCalledWith(
      wrapper.vm.itemsPerPage,
      wrapper.vm.pages,
      wrapper.vm.search
    )
  })

  it('gère correctement la pagination', async () => {
    const paginationComponent = wrapper.findComponent({ name: 'Pagination' })
    await paginationComponent.vm.$emit('callback-pagination', { pages: 1, itemsPerPage: 20 })
    await flushPromises()

    expect(store.fetchAllUsers).toHaveBeenCalledWith(20, 1, '')
  })
})
