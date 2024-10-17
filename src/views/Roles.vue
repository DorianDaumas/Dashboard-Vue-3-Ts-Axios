<template>
  <div>
    <v-data-table
      :class="storeTheme.theme ? 'data-table' : 'theme-on'"
      :headers="headers"
      :items="users.users"
      :items-per-page="itemPerPage"
      :items-length="users.total"
      disable-sort
      aria-label="test-roles-table"
      hide-default-footer
      :search="search"
    >
      <template v-slot:[`item.image`]="{ value }">
        <v-avatar style="background: white; z-index: 999">
          <v-img alt="Avatar" :src="value"></v-img>
        </v-avatar>
      </template>
      <template v-slot:[`item.username`]="{ value }">
        <v-btn variant="text" icon="mdi-delete-outline" color="white"></v-btn>
        <v-btn
          variant="text"
          aria-label="test-push-to-user"
          icon="mdi-eye-arrow-right-outline"
          @click="goToUser(value)"
          color="white"
        ></v-btn>
      </template>
    </v-data-table>
    <br />
    <Pagination
      :total="users.total"
      :itemsPerPage="itemPerPage"
      :pages="pages"
      @callback-pagination="paginationChange"
    ></Pagination>
  </div>
</template>
<script setup lang="ts">
import { useUsersStore } from '../stores/Users'
import { onMounted, ref } from 'vue'
import { useThemeStore } from '@/stores/App'
import Pagination from '@/components/Common/Pagination.vue'
import { usersSchema, type usersType } from '@/components/Users/usersType'
import { useRouter } from 'vue-router'

const router = useRouter()
const goToUser = (username: string) => {
  router.push(`/Users/${username}`)
}
const storeTheme = useThemeStore()
const storeUser = useUsersStore()
const search = ref('')
const users = ref<usersType>(usersSchema)
const itemPerPage = ref(10)
const pages = ref(0)

const headers: any = ref([
  { title: '', align: 'center', key: 'image' },
  { title: 'Utilisateurs', width: '50px', align: 'start', key: 'lastName' },
  { title: '', width: '50px', key: 'firstName', align: 'start' },
  { title: 'Email', key: 'email', align: 'start' },
  { title: 'Rôle', key: 'role', align: 'start' },
  { title: 'Departement', key: 'company.department', align: 'start' },
  { title: 'Titre', key: 'company.title', align: 'start' },
  { title: 'Actions', key: 'username', width: '150px', align: 'center' }
])

const paginationChange = (data: { pages: number; itemsPerPage: number }) => {
  pages.value = data.pages
  itemPerPage.value = data.itemsPerPage
  fetchNewdata()
}

const fetchNewdata = () => {
  storeUser.fetchAllUsers(itemPerPage.value, pages.value, search.value).then((payload) => {
    if (payload.content) {
      users.value = payload.content
    }
  })
}

onMounted(() => {
  fetchNewdata()
})
</script>
<style lang="scss"></style>
