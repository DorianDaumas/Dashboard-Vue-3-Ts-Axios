<!-- eslint-disable vue/valid-v-slot -->
<template>
  <v-card :class="themeStore.theme ? 'theme-off' : 'theme-on'" flat>
    <v-card-title primary-title> Article du panier </v-card-title>
    <v-card-text>
      <v-table :class="themeStore.theme ? 'theme-off' : 'theme-on'" style="background: #27293d">
        <tbody>
          <tr class="header-table-cart">
            <th style="text-align: center">PRODUIT</th>
            <th></th>
            <th>PRIX</th>
            <th style="width: 100px">QUANTITé</th>
            <th>TOtal</th>
          </tr>
          <tr v-for="item in cartNewSet" :key="item!.id">
            <td>
              <v-img height="80px" lazy :src="item!.images[0]">
                <template v-slot:placeholder>
                  <div class="d-flex align-center justify-center fill-height">
                    <v-progress-circular color="green" indeterminate></v-progress-circular>
                  </div>
                </template>
              </v-img>
            </td>
            <td>{{ item!.title }}</td>
            <td>{{ item!.price }} €</td>
            <td style="text-align: center">
              {{ cart.filter((cartItem) => cartItem.id === item!.id).length }}
            </td>
            <td>
              {{
                priceFormat(
                  item!.price * cart.filter((cartItem) => cartItem.id === item!.id).length
                )
              }}
            </td>
          </tr>
          <tr>
            <th>Réduction</th>
            <th>-10 %</th>
          </tr>
        </tbody>
      </v-table>
    </v-card-text>
  </v-card>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import type { ItemLocalStorage } from '../Ecommerce/Products/itemStorage'
import { useThemeStore } from '@/stores/App'

const themeStore = useThemeStore()

const props = defineProps<{
  cart: ItemLocalStorage[]
}>()

const cartNewSet = computed(() => {
  return [...new Set(props.cart.map((item) => item.id))].map((id) =>
    props.cart.find((item) => item.id === id)
  )
})

const priceFormat = (price: number) => {
  return Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR'
  }).format(price)
}
</script>
<style lang="scss" scoped>
.recap-card-title-cart {
  font-size: 12px !important;
  text-transform: uppercase !important;
  padding-left: 0;
}
.card-title-cart {
  font-size: 12px;
  text-transform: capitalize;
}
.container-flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.header-table-cart {
  text-transform: uppercase;
}
</style>
