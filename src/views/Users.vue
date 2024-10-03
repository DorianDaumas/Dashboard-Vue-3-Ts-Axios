<template>
  <div>
    <div class="error" v-if="!checkApiSuccess && !UserStore.loadingUsers">
      <Alert />
    </div>
    <div v-else>
      <UsersTable @send-Selected-User="callbackClickRow" @check-Api="callbackCheckApi"></UsersTable>
      <br />
      <CardProfile :userInfo="selectUser.userInfo"></CardProfile>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import CardProfile from '@/components/Users/CardProfile.vue'
import { selectUserSchema, type selectUserType } from '@/components/Users/selectUserType'
import Alert from '@/components/Common/Alert.vue'
import UsersTable from '@/components/Users/UsersTable.vue'
import { useUsersStore } from '@/stores/Users'

const selectUser = ref<selectUserType>(selectUserSchema)
const UserStore = useUsersStore()
const checkApiSuccess = ref(true)
const callbackClickRow = (item: selectUserType) => {
  selectUser.value = item
}

const callbackCheckApi = (check: boolean) => {
  checkApiSuccess.value = check
}
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
