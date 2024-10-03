<template>
  <div>
    <v-container fluid style="padding-top: 0">
      <v-row>
        <v-col md="3">
          <Filters @category="handleCategory"></Filters>
        </v-col>
        <v-col xl="9">
          <ProductsList :category="category"></ProductsList>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script setup lang="ts">
import Filters from '@/components/Ecommerce/Products/Filters.vue'
import ProductsList from '@/components/Ecommerce/Products/ProductsList.vue'
import router from '@/router'
import { ref } from 'vue'

const category = ref('')
const handleCategory = (ctg: string) => {
  category.value = ctg
  router.push(`/Ecommerce/${ctg}`)
}
</script>
<style lang="scss"></style>
