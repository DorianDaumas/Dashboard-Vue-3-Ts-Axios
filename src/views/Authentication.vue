<template>
  <div>
    <v-card rounded class="mx-auto" style="background: #27293d" max-width="600">
      <h1 class="auth-title">Fake Dashboard</h1>
      <br />
      <v-form class="px-10" @submit.prevent="connexion">
        <v-text-field
          v-model="username"
          aria-label="test-username"
          disabled
          label="Identifiant"
          variant="outlined"
        ></v-text-field>

        <v-text-field
          v-model="password"
          aria-label="test-password"
          disabled
          label="Mot de passe"
          variant="outlined"
        ></v-text-field>
        <v-card-actions>
          <v-btn
            class="mx-auto"
            type="submit"
            style="background: #1c9558; font-weight: 200 !important"
            >Se connecter</v-btn
          >
        </v-card-actions>
      </v-form>
    </v-card>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthenticationStore } from '@/stores/Auth'

const router = useRouter()
const username = ref('jacksone')
const password = ref('jacksonepass')
const expiresInMins = ref(1)
const store = useAuthenticationStore()
const connexion = () => {
  store.authentication(username.value, password.value, expiresInMins.value).then(() => {
    router.push({ path: '/Profil' })
  })
}
</script>
<style lang="scss">
.auth-title {
  text-align: center;
  margin-bottom: 10px;
  padding-top: 50px;
}
.btn-connexion {
  font-weight: 400 !important;
  text-align: center;
}
</style>
