<template>
  <div>
    <v-card :class="store.theme ? 'data-table' : 'theme-on'" elevation="0">
      <v-toolbar
        height="150px"
        :class="store.theme ? 'data-table' : 'theme-on'"
        color="#27293d"
        class="px-2 d-flex align-center justify-space-between"
      >
        <v-container fluid>
          <v-row no-gutters align="center">
            <v-col md="4">
              <v-text-field
                aria-label="test-input"
                v-model="search"
                label="Rechercher un produit"
                prepend-inner-icon="mdi-magnify"
                variant="outlined"
                clearable
                density="compact"
                @click:clear="search = ''"
                hide-details
              ></v-text-field>
            </v-col>
            <v-spacer v-if="!mobile"></v-spacer>
            <v-col md="4">
              <div class="d-flex align-center">
                <v-select
                  aria-label="test-order"
                  v-model="selectOrder"
                  label="Ordre d'affichage"
                  density="compact"
                  hide-details
                  :items="['Prix asc.', 'Prix desc.']"
                  variant="outlined"
                ></v-select>
                <v-btn-toggle
                  v-if="!mobile"
                  aria-label="test-toggle"
                  :class="store.theme ? 'data-table' : 'theme-on'"
                  style="margin-left: 40px"
                  v-model="toggle"
                  variant="outlined"
                  divided
                >
                  <v-btn icon="mdi-grid"></v-btn>
                  <v-btn icon="mdi-list-box-outline"></v-btn>
                </v-btn-toggle>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-toolbar>
    </v-card>
    <br />
    <v-card elevation="0" style="margin-top: 2px">
      <v-data-iterator
        hover
        style="background: #1e1e2f"
        :items="ProductsList.products"
        :items-per-page="itemPerPage"
        :items-length="ProductsList.total"
        :class="store.theme ? 'data-table' : 'theme-on-iterator'"
        item-value="title"
      >
        <template v-slot:default>
          <v-container style="padding: 0">
            <v-row aria-label="test-container-list-standard" justify="start" v-if="toggle === 0">
              <v-col v-for="(item, index) in ProductsList.products" :key="index" xl="3">
                <v-card hover :class="store.theme ? 'data-table' : 'theme-on'" color="#27293d">
                  <div
                    aria-label="test-push-to-detail-standard"
                    class="redirect-card"
                    @click="redirectTo(item.id)"
                  >
                    <v-img
                      aspect-ratio="1"
                      height="140"
                      aria-label="test-img-standard"
                      :src="item.images[0]"
                    >
                      <template v-slot:placeholder>
                        <div class="d-flex align-center justify-center fill-height">
                          <v-progress-circular color="green" indeterminate></v-progress-circular>
                        </div>
                      </template>
                    </v-img>

                    <v-row no-gutters style="align-items: baseline; justify-content: center">
                      <v-list-item class="mb-2 list-description-product">
                        <template v-slot:title>
                          <strong aria-label="test-title-standard" class="text-h6 mb-2">{{
                            item.title
                          }}</strong>
                        </template>
                        <template v-slot:subtitle>
                          <br />
                          <br />
                          <div aria-label="test-description-standard" style="height: 50px">
                            {{ item.description }}
                          </div>
                        </template>
                      </v-list-item>
                    </v-row>

                    <v-row
                      no-gutters
                      style="align-items: center; justify-content: space-between; padding: 17px"
                    >
                      <div class="d-flex align-center justify-space-between">
                        <strong
                          aria-label="test-price-standard"
                          :class="store.theme ? 'data-table' : 'theme-on'"
                          class="text-h6"
                          >{{
                            Intl.NumberFormat('fr-FR', {
                              style: 'currency',
                              currency: 'EUR'
                            }).format(item.price)
                          }}
                        </strong>
                      </div>
                      <div>
                        <span
                          aria-label="test-rating-standard"
                          :class="store.theme ? 'data-table' : 'theme-on'"
                          style="text-align: left; display: flex; font-size: 0.7rem"
                          >({{ item.rating }})
                          <span
                            aria-label="test-review-standard"
                            class="pb-1"
                            style="color: grey; margin-left: 15px; font-size: 0.7rem"
                            >{{ item.reviews?.length }} Avis</span
                          ></span
                        >

                        <v-rating
                          aria-label="test-rating-comp-standard"
                          readonly
                          half-increments
                          :length="5"
                          :size="20"
                          :color="store.theme ? 'data-table' : 'black'"
                          :model-value="item.rating"
                          active-color="#1c9558"
                        />
                      </div>
                    </v-row>
                  </div>
                  <br />
                  <div class="d-flex justify-space-evenly align-center">
                    <AddCart
                      aria-label="test-addCart-standard"
                      :productDetail="sendDetail(item).item"
                    ></AddCart>
                  </div>
                  <br />
                </v-card>
              </v-col>
            </v-row>

            <v-row aria-label="test-container-list-grid" v-else>
              <v-col v-for="(item, index) in ProductsList.products" :key="index" md="12">
                <v-card
                  :class="store.theme ? 'data-table' : 'theme-on'"
                  color="#27293d"
                  class="d-flex"
                  flat
                >
                  <v-container grid-list-xs>
                    <v-row>
                      <v-col
                        :class="store.theme ? 'data-table' : 'theme-on'"
                        style="margin: auto"
                        md="3"
                      >
                        <v-img
                          aspect-ratio="1"
                          height="140"
                          aria-label="test-img-grid"
                          :src="item.images[0]"
                        >
                          <template v-slot:placeholder>
                            <div class="d-flex align-center justify-center fill-height">
                              <v-progress-circular
                                color="green"
                                indeterminate
                              ></v-progress-circular>
                            </div>
                          </template>
                        </v-img>
                      </v-col>
                      <v-col :class="store.theme ? 'data-table' : 'theme-on'" md="5">
                        <v-list-item class="mb-2">
                          <template v-slot:title>
                            <strong aria-label="test-title-grid" class="text-h6">{{
                              item.title
                            }}</strong>
                          </template>
                          <template v-slot:subtitle>
                            <i aria-label="test-brand-grid">Par {{ item.brand }}</i>
                            <br />
                            <br />
                            <strong aria-label="test-description-grid" class="text-h9"
                              >{{ item.description }}
                            </strong>
                            <br />
                            <br />
                            <div class="d-flex align-center justify-space-between">
                              <span
                                aria-label="test-price-grid"
                                style="font-size: 16px; font-weight: 600"
                              >
                                {{
                                  Intl.NumberFormat('fr-FR', {
                                    style: 'currency',
                                    currency: 'EUR'
                                  }).format(item.price)
                                }}
                              </span>
                              <div class="d-flex align-center justify-space-between">
                                <v-rating
                                  readonly
                                  aria-label="test-rating-comp-grid"
                                  half-increments
                                  :length="5"
                                  :size="20"
                                  :model-value="item.rating"
                                  active-color="#1c9558"
                                />
                                &nbsp; ({{ item.rating }})
                              </div>
                            </div>
                          </template>
                        </v-list-item>
                      </v-col>

                      <v-col md="4" :class="store.theme ? 'data-table' : 'theme-on'">
                        <div
                          class="d-flex justify-space-around px-4"
                          style="flex-direction: column; align-items: center; height: 100%"
                        >
                          <div class="d-flex justify-space-around align-center px-8">
                            <AddCart
                              aria-label="test-addCart-grid"
                              :productDetail="sendDetail(item).item"
                            ></AddCart>
                          </div>
                          <v-btn
                            aria-label="test-push-to-detail-grid"
                            color="#1c9558"
                            :to="`/product/${item.id}`"
                            >Voir la fiche</v-btn
                          >
                        </div>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </template>

        <template v-slot:footer>
          <br />
          <div class="d-flex align-center justify-center pa-4">
            <v-btn
              aria-label="test-prev-page"
              :disabled="page === 0"
              density="comfortable"
              icon="mdi-arrow-left"
              variant="tonal"
              rounded
              @click="prevPage"
            ></v-btn>

            <div class="mx-2 text-caption">Page {{ page }} de {{ ProductsList.total }}</div>
            <v-btn
              aria-label="test-next-page"
              :disabled="ProductsList.total <= 15"
              density="comfortable"
              icon="mdi-arrow-right"
              variant="tonal"
              rounded
              @click="nextPage"
            ></v-btn>
          </div>
        </template>
      </v-data-iterator>
    </v-card>
  </div>
</template>
<script setup lang="ts">
import { useEcommerceStore } from '@/stores/Ecommerce'
import { onMounted, ref, watch } from 'vue'
import { productSchema, type ProductsListType } from './productListType'
import router from '@/router'
import { useThemeStore } from '@/stores/App'
import { useRoute } from 'vue-router'
import AddCart from '@/components/Carts/AddCart.vue'
import { useDisplay } from 'vuetify'

const route = useRoute()
const store = useThemeStore()
const mobile = useDisplay().mobile
const ecommerceStore = useEcommerceStore()
const category = defineProps(['category'])
const toggle = ref(0)
const selectOrder = ref('Prix desc.')
const selectOrderValue = ref('desc')
const search = ref('')
const ProductsList = ref<ProductsListType>(productSchema)
let itemPerPage = ref(15)
let page = ref(0)

const sendDetail = (item: any) => {
  const productDetail = {
    item
  }
  return productDetail
}
const redirectTo = (id: number) => {
  router.push(`/product/${id}`)
}

watch(
  () => selectOrder.value,
  () => {
    if (selectOrder.value === 'Prix asc.') {
      selectOrderValue.value = 'asc'
    } else {
      selectOrderValue.value = 'desc'
    }

    if (route.params.category) {
      checkCategory()
    } else {
      fetchNewData()
    }
  }
)

const checkCategory = () => {
  if (route.params.category) {
    const categorie: string | string[] = route.params.category
    ecommerceStore
      .fetchProductsCategory(
        categorie.toString(),
        itemPerPage.value,
        page.value,
        selectOrderValue.value
      )
      .then((val) => {
        ProductsList.value = val.content
      })
  } else {
    fetchNewData()
  }
}

onMounted(() => {
  checkCategory()
})

watch(search, () => {
  fetchNewData()
})

watch(
  () => category.category,
  () => {
    if (category.category === 'reset') {
      router.push('/Ecommerce')
      fetchNewData()
    } else {
      ecommerceStore
        .fetchProductsCategory(
          category.category,
          itemPerPage.value,
          page.value,
          selectOrderValue.value
        )
        .then((val) => {
          ProductsList.value = val.content
        })
    }
  }
)
const prevPage = () => {
  if (page.value <= 15) {
    page.value = 0
  } else {
    page.value -= itemPerPage.value
  }
  if (route.params.category) {
    checkCategory()
  } else {
    fetchNewData()
  }
}
const nextPage = () => {
  page.value += itemPerPage.value
  if (route.params.category) {
    checkCategory()
  } else {
    fetchNewData()
  }
}

const fetchNewData = () => {
  ecommerceStore
    .fetchProducts(search.value, itemPerPage.value, page.value, selectOrderValue.value)
    .then((val) => {
      ProductsList.value = val.content
    })
}
</script>
<style lang="scss">
.theme-on-iterator {
  background: #f0f2f5 !important;
  color: black !important;
}
.redirect-card {
  cursor: pointer;
}
</style>
