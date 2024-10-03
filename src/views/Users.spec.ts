import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import Users from '@/views/Users.vue'
import { createTestingPinia } from '@pinia/testing'
import { useUsersStore } from '@/stores/Users'

describe('Users.vue', () => {
  let wrapper: VueWrapper<any>
  let usersStore: ReturnType<typeof useUsersStore>

  const vuetify = createVuetify({ components, directives })

  beforeEach(() => {
    const pinia = createTestingPinia({
      createSpy: vi.fn,
      initialState: {
        users: {
          allUsers: { users: [], total: 0 },
          loadingUsers: false
        }
      }
    })

    usersStore = useUsersStore()

    wrapper = mount(Users, {
      global: {
        plugins: [pinia, vuetify],
        stubs: {
          Alert: true,
          UsersTable: true,
          CardProfile: true
        }
      }
    })
  })

  it("affiche UsersTable et CardProfile quand l'API est un succès", async () => {
    expect(wrapper.findComponent({ name: 'UsersTable' }).exists()).toBe(true)
    expect(wrapper.findComponent({ name: 'CardProfile' }).exists()).toBe(true)
    expect(wrapper.findComponent({ name: 'Alert' }).exists()).toBe(false)
  })

  it("affiche Alert quand l'API échoue", async () => {
    await wrapper.vm.callbackCheckApi(false)
    expect(wrapper.findComponent({ name: 'Alert' }).exists()).toBe(true)
    expect(wrapper.findComponent({ name: 'UsersTable' }).exists()).toBe(false)
    expect(wrapper.findComponent({ name: 'CardProfile' }).exists()).toBe(false)
  })

  it('met à jour selectUser quand callbackClickRow est appelé', async () => {
    const testUser = { userInfo: { id: 1, firstName: 'Test', lastName: 'User' } }
    await wrapper.vm.callbackClickRow(testUser)
    expect(wrapper.vm.selectUser).toEqual(testUser)
  })

  it('met à jour checkApiSuccess quand callbackCheckApi est appelé', async () => {
    await wrapper.vm.callbackCheckApi(false)
    expect(wrapper.vm.checkApiSuccess).toBe(false)
  })

  it('affiche le loader pendant le chargement des utilisateurs', async () => {
    usersStore.loadingUsers = true
    await wrapper.vm.$nextTick()
    expect(wrapper.findComponent({ name: 'Alert' }).exists()).toBe(false)
    expect(wrapper.findComponent({ name: 'UsersTable' }).exists()).toBe(true)
    expect(wrapper.findComponent({ name: 'CardProfile' }).exists()).toBe(true)
  })
})
