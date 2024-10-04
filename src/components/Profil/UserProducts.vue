<template>
  <v-col v-for="(item, index) in props.userProduct.products" :key="index" md="3">
    <v-card elevation="0" color="rgb(39, 41, 61)">
      <v-card-item class="d-flex justify-flex-start align-center">
        <v-card-title class="d-flex align-center">
          <img :src="item.thumbnail" width="100%" alt="images des produits" />
        </v-card-title>
        <v-card-subtitle class="text-center"> {{ item.title }} </v-card-subtitle>

        <v-card-text class="d-flex justify-center align-center">
          <v-rating
            class="d-flex justify-center align-center"
            readonly
            half-increments
            :length="5"
            :size="20"
            :model-value="4.5"
            active-color="#1c9558"
          />
        </v-card-text>

        <v-card-actions class="d-flex justify-center align-center">
          <v-btn class="w-100" variant="outlined" @click="goToProduct(item.id)" color="#42b883"
            >Voir le produit</v-btn
          >
        </v-card-actions>
      </v-card-item>
    </v-card>
  </v-col>
</template>
<script setup lang="ts">
import { defineProps } from 'vue'
import type { userProductType } from '@/components/Profil/userProductType'
import router from '@/router'

const props = defineProps<userProductType>()
const goToProduct = (item: number) => {
  router.push(`/Product/${item}`)
}
</script>
<style lang="scss"></style>
