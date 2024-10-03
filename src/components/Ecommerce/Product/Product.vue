<template>
  <div aria-label="test-product">
    <v-container fluid>
      <v-row>
        <v-col md="5" style="height: 100%; background-color: white; border-radius: 5px">
          <div style="height: 400px">
            <v-img
              align-center
              style="width: 400px; margin: auto"
              :src="carousel === '' ? productDetail.images[0] : carousel"
            >
              <template v-slot:placeholder>
                <div class="d-flex align-center justify-center fill-height">
                  <v-progress-circular color="green" indeterminate></v-progress-circular>
                </div>
              </template>
            </v-img>
          </div>
          <hr />
          <div class="container-image-product-bellow">
            <div
              v-for="(item, index) in productDetail.images"
              :key="index"
              @click="changeImage(item)"
              style="height: 100px; width: 100%"
            >
              <v-img style="cursor: pointer" :src="item">
                <template v-slot:placeholder>
                  <div class="d-flex align-center justify-center fill-height">
                    <v-progress-circular color="green" indeterminate></v-progress-circular>
                  </div>
                </template>
              </v-img>
            </div>
          </div>
        </v-col>
        <v-spacer></v-spacer>
        <v-col md="6">
          <v-card
            aria-label="test-card"
            elevation="0"
            :style="
              store.theme
                ? 'background: transparent; color: white'
                : 'background: transparent; color: black'
            "
          >
            <v-card-item>
              <v-card-title aria-label="test-title"> {{ productDetail.title }} </v-card-title>

              <v-card-subtitle>
                <v-rating
                  aria-label="test-rating"
                  readonly
                  half-increments
                  :length="5"
                  :size="32"
                  :model-value="productDetail.rating"
                  active-color="#1c9558"
                />
              </v-card-subtitle>
              <br />
              <v-card-subtitle aria-label="test-price" style="opacity: 1 !important">
                <div class="container-price-stock">
                  <div class="container-product-price">
                    <span>Prix</span><br />
                    <span class="product-price">{{
                      Intl.NumberFormat('fr-FR', {
                        style: 'currency',
                        currency: 'EUR'
                      }).format(productDetail.price)
                    }}</span>
                  </div>
                  <div class="container-product-stock">
                    <span>Stock</span><br />
                    <span class="product-stock">{{ productDetail.stock }}</span>
                  </div>
                </div>
              </v-card-subtitle>
            </v-card-item>
            <v-spacer></v-spacer>
            <v-card-text aria-label="ezfsfzsef">
              <h3 aria-label="test-brand">Marque : {{ productDetail.brand }}</h3>
              <br />
              <h3>Description :</h3>
              <br />
              <p aria-label="test-description">
                {{ productDetail.description }}
              </p>
              <p>
                > Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua.
              </p>
            </v-card-text>

            <v-card-text aria-label="test-container-info">
              <v-icon color="green">mdi-check</v-icon>&nbsp;&nbsp;<span>{{
                productDetail.returnPolicy
              }}</span
              ><br /><br />
              <v-icon color="green">mdi-check</v-icon>&nbsp;&nbsp;<span>{{
                productDetail.warrantyInformation
              }}</span
              ><br /><br />
              <v-icon color="green">mdi-check</v-icon>&nbsp;&nbsp;<span>{{
                productDetail.shippingInformation
              }}</span>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-text>
              <span
                >SKU: &nbsp; <span aria-label="test-sku">{{ productDetail.sku }}</span></span
              ><br />
              <br />
              <span
                >Categorie: &nbsp;
                <v-chip
                  aria-label="test-redirection"
                  :to="`/Ecommerce/${productDetail.category}`"
                  >{{ productDetail.category }}</v-chip
                ></span
              >
              <br />
              <br />
              <span
                >Tags: &nbsp;
                <span
                  aria-label="test-tags"
                  v-for="(item, index) in productDetail.tags"
                  :key="index"
                  >&nbsp;{{ item }},
                </span></span
              ><br />
            </v-card-text>

            <br />
            <AddCart v-if="authStore.isLogged" :productDetail="productDetail"></AddCart>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <br />
    <br />
    <br />
    <v-card elevation="0">
      <v-tabs v-model="tab" bg-color="#1c9558">
        <v-tab value="one">Description</v-tab>
        <v-tab value="two">Spécification</v-tab>
        <v-tab value="three">Avis</v-tab>
      </v-tabs>

      <v-card-text :class="store.theme ? 'data-table' : 'theme-on'" elevation="0">
        <v-tabs-window
          bg-color="#1c9558"
          :class="store.theme ? 'data-table' : 'theme-on'"
          elevation="0"
          v-model="tab"
        >
          <v-tabs-window-item color="#1c9558" value="one">
            <p>{{ productDetail.description }}</p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
          </v-tabs-window-item>

          <v-tabs-window-item value="two">
            <table class="table-specs" width="300px" style="border: 1px solid grey">
              <td style="border: 1px solid grey">
                <br />
                <tr>
                  &nbsp;&nbsp; Marques :
                </tr>
                <br />
                <v-divider></v-divider>
                <br />
                <tr>
                  &nbsp;&nbsp;Catégorie :
                </tr>
                <br />
                <v-divider></v-divider>
                <br />

                <tr>
                  &nbsp;&nbsp;SKU :
                </tr>
                <br />
                <v-divider></v-divider>
                <br />

                <tr>
                  &nbsp;&nbsp; Prix :
                </tr>
              </td>

              <td>
                <br />
                <tr>
                  &nbsp;&nbsp;&nbsp;
                  {{
                    productDetail.brand
                  }}
                </tr>
                <br />
                <v-divider></v-divider>
                <br />

                <tr>
                  &nbsp;&nbsp;&nbsp;{{
                    productDetail.category
                  }}
                </tr>
                <br />
                <v-divider></v-divider>
                <br />

                <tr>
                  &nbsp;&nbsp;&nbsp;{{
                    productDetail.sku
                  }}
                </tr>
                <br />
                <v-divider></v-divider>
                <br />

                <tr>
                  &nbsp;&nbsp;&nbsp;{{
                    Intl.NumberFormat('fr-FR', {
                      style: 'currency',
                      currency: 'EUR'
                    }).format(productDetail.price)
                  }}
                </tr>
                <br />
              </td>
            </table>
          </v-tabs-window-item>

          <v-tabs-window-item value="three">
            <div
              v-for="(item, index) in productDetail.reviews"
              :key="index"
              class="d-flex align-start"
            >
              <v-avatar
                style="margin-top: 13px"
                size="x-large"
                :image="`https://dummyjson.com/icon/${item.reviewerName}/150`"
              ></v-avatar>

              <v-card :class="store.theme ? 'data-table' : 'theme-on'" elevation="0">
                <v-card-title primary-title>
                  {{ item.reviewerName }}
                </v-card-title>
                <v-card-text>
                  <div class="d-flex align-center">
                    <v-rating
                      readonly
                      half-increments
                      :length="5"
                      :size="20"
                      :model-value="item.rating"
                      active-color="#1c9558"
                    />
                    &nbsp; ({{ item.rating }})
                  </div>
                </v-card-text>

                <v-card-text>
                  {{ item.comment }}
                </v-card-text>
              </v-card>
            </div>
          </v-tabs-window-item>
        </v-tabs-window>
      </v-card-text>
    </v-card>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { defineProps } from 'vue'
import { useThemeStore } from '@/stores/App'
import type { ProductType } from './productType'
import AddCart from '@/components/Carts/AddCart.vue'
import { useAuthenticationStore } from '@/stores/Auth'
const store = useThemeStore()
const authStore = useAuthenticationStore()
const { productDetail } = defineProps<ProductType>()
const carousel = ref('')
const tab = ref(null)
const changeImage = (image: string) => {
  carousel.value = image
}
</script>
<style lang="scss">
.table-specs {
  tr {
    margin-left: 20px;
  }
}
.container-price-stock {
  display: flex;
}
.container-product-stock {
  margin-left: 50px;
  text-align: center;
}
.container-image-product-bellow {
  display: flex;
  justify-content: center;
  align-items: center;
}
.container-product-price {
  opacity: 1 !important;
}
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
.product-price {
  font-size: 1.25rem !important;
  font-weight: 600;
}
.product-stock {
  font-size: 1.25rem !important;
  font-weight: 600;
  color: rgb(21, 187, 21);
}
</style>
