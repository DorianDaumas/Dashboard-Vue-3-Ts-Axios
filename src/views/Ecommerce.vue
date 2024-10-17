<template>
  <div>
    <v-container fluid style="padding-top: 0">
      <v-row v-if="mobile">
        <v-col md="12">
          <Filters @category="handleCategory"></Filters>
          <br />
          <ProductsList :category="category"></ProductsList>
        </v-col>
      </v-row>
      <v-row v-else>
        <v-col cols="auto" md="3">
          <Filters style="position: sticky; top: 80px" @category="handleCategory"></Filters>
        </v-col>
        <v-col md="9">
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
import { useDisplay } from 'vuetify'

const category = ref('')
const handleCategory = (ctg: string) => {
  category.value = ctg
  router.push(`/Ecommerce/${ctg}`)
}
const mobile = useDisplay().mobile
</script>
<style lang="scss"></style>
