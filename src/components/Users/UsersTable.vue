<template>
  <div>
    <v-text-field
      v-model="search"
      label="Chercher un utilisateur..."
      prepend-inner-icon="mdi-magnify"
      variant="outlined"
      clearable
      @click:clear="search = ''"
      hide-details
    ></v-text-field>
    <br />
    <v-data-table
      aria-label="test-data-table"
      :class="theme.theme ? 'data-table' : 'theme-on'"
      :items-per-page="itemsPerPage"
      :headers="headers"
      no-filter
      :loading="store.loadingUsers"
      :search="search"
      hide-default-footer
      :items="usersInfo.users"
      :items-length="usersInfo.total"
    >
      <template v-slot:loading>
        <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
      </template>
      <template v-slot:item="{ item }">
        <tr style="cursor: pointer" @click="selectRow(item)">
          <td>
            <v-img
              aria-label="test-img"
              aspect-ratio="1"
              class="product-thumb-picture"
              :src="item.image"
            />
          </td>
          <td aria-label="test-lastName">{{ item.lastName }}</td>
          <td aria-label="test-firstName">{{ item.firstName }}</td>
          <td aria-label="test-company">{{ item.company.name }}</td>
          <td aria-label="test-address">
            {{ item.company.address.address }}, {{ item.company.address.city }}
            {{ item.company.address.postalCode }}
          </td>
          <td aria-label="test-company-dep">{{ item.company.department }}</td>
          <td aria-label="test-email">{{ item.email }}</td>
        </tr>
      </template>
    </v-data-table>
    <br />
    <Pagination
      :total="usersInfo.total"
      :itemsPerPage="itemsPerPage"
      :pages="pages"
      @callback-pagination="paginationChange"
    ></Pagination>
  </div>
</template>
<script lang="ts" setup>
import { useUsersStore } from '@/stores/Users'
import { onMounted, ref, watch } from 'vue'
import { useThemeStore } from '@/stores/App'
import { selectUserSchema, type selectUserType } from '@/components/Users/selectUserType'
import { useRoute } from 'vue-router'
import Pagination from '@/components/Common/Pagination.vue'
import type { usersType } from '@/components/Users/usersType'
import { usersSchema } from '@/components/Users/usersType'

const route = useRoute()

const theme = useThemeStore()
const emit = defineEmits(['sendSelectedUser', 'checkApi'])
const headers: any = ref([
  { title: 'Profil', align: 'center', key: 'image' },
  { title: 'Nom', align: 'start', key: 'lastName' },
  { title: 'Prénom', key: 'firstName', align: 'start' },
  { title: 'Structure', key: 'company.name', align: 'start' },
  { title: 'Adresse', key: 'company.address', align: 'start' },
  { title: 'Département', key: 'company.department', align: 'start' },
  { title: 'Email', key: 'email', align: 'center' }
])
const store = useUsersStore()
const usersInfo = ref<usersType>(usersSchema)
const itemsPerPage = ref(10)
const pages = ref(0)
const search = ref<string>('')

let selectUser = ref<selectUserType>(selectUserSchema)

const selectRow = (item: any) => {
  const selected = {
    userInfo: item
  }
  selectUser.value = selected

  emit('sendSelectedUser', selected)
}

const paginationChange = (data: { pages: number; itemsPerPage: number }) => {
  pages.value = data.pages
  itemsPerPage.value = data.itemsPerPage
  fetchNewdata()
}

watch(
  () => search.value,
  () => {
    fetchNewdata()
  }
)
const fetchNewdata = async () => {
  if (search.value != '') {
    pages.value = 0
  }
  await store.fetchAllUsers(itemsPerPage.value, pages.value, search.value).then((payload) => {
    emit('checkApi', payload.success)
    usersInfo.value = payload.content
    if ((route.params.search as string) === usersInfo.value.users[0].username) {
      selectUser.value.userInfo = usersInfo.value.users[0]
    }
  })
}

onMounted(() => {
  if (route.params.search as string) {
    search.value = route.params.search as string
  } else {
    search.value = ''
  }
  fetchNewdata()
})
</script>
<style lang="scss">
.user-profil-picture {
  border-radius: 50%;
  height: 50px;
}
.data-table {
  background: #27293d;
}
</style>
