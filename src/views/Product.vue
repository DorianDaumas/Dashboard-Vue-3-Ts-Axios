<template>
  <div>
    <div :class="theme.theme ? '' : 'theme-on'">
      <div class="container-product-page" v-if="checkApiProductSuccess">
        <h1 class="d-flex align-center">
          <v-btn to="/Ecommerce" variant="outlined" icon="mdi-arrow-left"></v-btn>&nbsp; Détails du
          produit
        </h1>
        <Product :productDetail="product!.productDetail"></Product>
      </div>
      <div v-else-if="ProductStore.loadingProducts">
        <v-progress-linear indeterminate></v-progress-linear>
      </div>
      <div v-else>
        <br />
        <Alert></Alert>
      </div>
      <br />
      <br />
      <br />
      <br />
      <v-divider></v-divider>
    </div>
    <br />
    <br />
    <div :class="theme.theme ? '' : 'theme-on'">
      <div class="container-product-page" v-if="checkApiOtherProductSuccess">
        <h1>Autres produits</h1>
        <OtherProducts
          @click-row="callbackClickRow"
          :otherProducts="otherProducts.otherProducts"
        ></OtherProducts>
      </div>
      <div v-else-if="ProductStore.loadingOtherProducts">
        <v-progress-linear indeterminate></v-progress-linear>
      </div>
      <div class="error" v-else>
        <Alert></Alert>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useProductsStore } from '@/stores/Products'
import { useThemeStore } from '@/stores/App'
import { ref, onMounted } from 'vue'
import Product from '@/components/Ecommerce/Product/Product.vue'
import OtherProducts from '@/components/Ecommerce/Product/OtherProducts.vue'
import { productDetailSchema, type ProductType } from '@/components/Ecommerce/Product/productType'
import {
  OtherProductSchema,
  type otherProductType
} from '@/components/Ecommerce/Product/otherProductType'
import { useRoute } from 'vue-router'
import Alert from '@/components/Common/Alert.vue'

const route = useRoute()
const ProductStore = useProductsStore()
const theme = useThemeStore()
const checkApiProductSuccess = ref(false)
const checkApiOtherProductSuccess = ref(false)

const product = ref<ProductType>(productDetailSchema)

const otherProducts = ref<otherProductType>(OtherProductSchema)

const productUnit = ref(10)

const callbackClickRow = (payload: number) => {
  fetchProduct(payload)
}

const fetchProduct = (payload: number) => {
  ProductStore.fetchUnitProduct(payload).then((payload) => {
    checkApiProductSuccess.value = payload.success
    product.value = payload.content
  })
  ProductStore.fetchOtherProducts(payload).then((payload) => {
    checkApiOtherProductSuccess.value = payload.success
    otherProducts.value.otherProducts.otherProductsDetail =
      payload.content.otherProducts.otherProductsDetail
    otherProducts.value.otherProducts.limit = payload.content.otherProducts.limit
  })
}

onMounted(() => {
  if (isNaN(parseInt(route.params.id as string))) {
    productUnit.value = 10
  } else {
    productUnit.value = parseInt(route.params.id as string)
  }
  fetchProduct(productUnit.value)
})
</script>
<style lang="scss">
.container-product-page {
  background: #27293d;
  padding: 20px;
  border-radius: 5px;
  h1 {
    font-weight: 600;
    font-size: 1.25rem !important;
    margin-bottom: 20px;
    margin-left: 2px;
  }
}
</style>
