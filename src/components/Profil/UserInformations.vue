<template>
  <div>
    <h1 class="title">Informations du profil</h1>
    <br />
    <div class="info">
      Bonjour, je m'appelle {{ user.currentUsers.firstName }} {{ user.currentUsers.lastName }},
      Décisions : si vous n'arrivez pas à décider, la réponse est non. S’il s’agit de deux chemins
      également difficiles, choisissez celui qui est le plus douloureux à court terme (éviter la
      douleur crée une illusion d’égalité).
    </div>
    <br />
    <v-divider></v-divider>
    <br />
    <div class="info-private-user">
      <p>
        <strong>Nom et prénom:</strong>
        <span>{{ user.currentUsers.firstName }} {{ user.currentUsers.lastName }}</span>
      </p>
      <br />
      <p>
        Téléphone:
        <span>{{ user.currentUsers.phone }}</span>
      </p>
      <br />

      <p>
        E-mail:
        <span>{{ user.currentUsers.email }}</span>
      </p>
      <br />

      <p>
        Localisation:
        <span>
          {{ user.currentUsers.address.address }} {{ user.currentUsers.address.city }}
          {{ user.currentUsers.address.country }} {{ user.currentUsers.address.postalCode }}
        </span>
      </p>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useAuthenticationStore } from '@/stores/Auth'

const user = useAuthenticationStore()
</script>

<style lang="scss">
.title {
  font-weight: 500;
  line-height: 1.5;
  font-size: 1rem !important;
  letter-spacing: normal !important;
}
.subtitle {
  font-weight: 700 !important;
  text-transform: uppercase !important;
  font-size: 0.75rem !important;
}
.info {
  font-weight: 300 !important;
}
.info-private-user {
  font-weight: 300 !important;
  margin-bottom: 16px;
  font-size: 0.875rem !important;
  line-height: 1.5;
  span {
    margin-left: 10px;
    font-size: 0.875rem !important;
    font-weight: bolder !important;
    font-weight: 300 !important;
  }
}
</style>
<style lang="scss" scoped>
.switch-label {
  font-size: 0.875rem !important;
  line-height: 1.5;
  font-weight: 300;
}
</style>
