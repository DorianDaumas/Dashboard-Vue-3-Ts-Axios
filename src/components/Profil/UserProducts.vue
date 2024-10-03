<template>
  <v-col v-for="(item, index) in userProducts" :key="index" xl="3">
    <v-card elevation="0" color="transparent">
      <v-card-item class="d-flex align-center">
        <v-card-title class="d-flex align-center">
          <img :src="item.thumbnail" width="100%" alt="images des produits" />
        </v-card-title>
        <v-card-subtitle> {{ item.title }} </v-card-subtitle>
      </v-card-item>

      <v-card-text style="height: 116px"> {{ item.description.slice(0, 150) }}... </v-card-text>

      <v-card-text>
        <v-rating
          readonly
          half-increments
          :length="5"
          :size="32"
          :model-value="item.rating"
          active-color="#7b809a"
        />
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn variant="outlined" @click="goToProduct(item.id)" color="#42b883"
          >Voir le produit</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-col>
</template>
<script setup lang="ts">
import { defineProps, onMounted, ref } from 'vue'
import type { userProductType } from '@/components/Profil/userProductType'
import { useProductsStore } from '@/stores/Products'
import router from '@/router'

const props = defineProps<userProductType>()
const productStore = useProductsStore()
const userProducts: any = ref([])
const goToProduct = (item: number) => {
  router.push(`/Product/${item}`)
}
onMounted(() => {
  for (let i = 0; i < props.userProduct.products.length; i++) {
    const element = props.userProduct.products[i].id
    productStore.fetchUnitProduct(element).then((payload) => {
      userProducts.value.push(payload.content.productDetail)
    })
  }
})
</script>
<style lang="scss"></style>
