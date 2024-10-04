<template>
  <div style="background: transparent !important; position: relative">
    <div class="banner-image"></div>

    <v-card
      :class="store.theme ? 'theme-off' : 'theme-on'"
      absolute
      top="-100px"
      style="top: -120px"
      class="mx-10 my-8"
    >
      <v-card-item class="d-flex align-center">
        <v-card-title class="d-flex align-center">
          <img height="74px" :src="user.currentUsers.image" alt="" />
          <div style="margin-left: 20px">
            <span>{{ user.currentUsers.firstName }} {{ user.currentUsers.lastName }}</span>
            <v-card-subtitle> {{ user.currentUsers.company.department }} </v-card-subtitle>
          </div>
        </v-card-title>
      </v-card-item>

      <v-card-text>
        <v-container fluid>
          <br />
          <h1 class="title">Paramètres de l'application</h1>
          <br />
          <br />
          <v-row>
            <v-col xl="6">
              <div>
                <Settings></Settings>
              </div>
            </v-col>
            <v-col xl="6">
              <UserInformations></UserInformations>
              <h1 class="title">Informations de paiement</h1>

              <PaymentCard></PaymentCard>
            </v-col>
          </v-row>
        </v-container>

        <v-container fluid>
          <h1 class="title">Mes produits récement achetés</h1>
          <br />
          <v-row>
            <UserProducts
              v-if="userProduct.userProduct.id !== 0"
              :userProduct="userProduct.userProduct"
            ></UserProducts>
            <v-progress-circular
              v-else
              size="50"
              :value="20"
              color="#42b883"
              indeterminate
            ></v-progress-circular>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </div>
</template>
<script setup lang="ts">
import { useAuthenticationStore } from '@/stores/Auth'
import { useThemeStore } from '@/stores/App'
import Settings from '@/components/Profil/Settings.vue'
import UserInformations from '@/components/Profil/UserInformations.vue'
import PaymentCard from '@/components/Profil/PaymentCard.vue'
import UserProducts from '@/components/Profil/UserProducts.vue'
import { useProductsStore } from '@/stores/Products'

const userStore = useProductsStore()
const store = useThemeStore()
const user = useAuthenticationStore()
const userProduct = userStore.userProducts
</script>
<style lang="scss">
.switch-label {
  font-size: 0.875rem !important;
  line-height: 1.5;
  font-weight: 300;
}
.banner-image {
  border-radius: 0.75rem !important;
  height: 300px !important;
  height: 100%;
  width: 100%;
  background-image: url('https://picsum.photos/seed/picsum/3000/2000');
  background-size: cover;
  background-position: 50% center;
  top: 0;
  left: 0;
  z-index: 0;
  width: 100%;
  height: 100%;
  transition: all 0.15s ease;
}
</style>
