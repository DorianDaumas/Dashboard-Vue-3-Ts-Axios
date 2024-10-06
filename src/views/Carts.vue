<!-- eslint-disable vue/valid-v-slot -->
<template>
  <div>
    <v-stepper
      dense
      v-if="cartNewSet.length !== 0"
      bg-color="#27293d"
      editable
      :items="['Détails du panier', 'Informations d\'expéditions', 'Paiement']"
    >
      <template v-slot:item.1>
        <v-container fluid>
          <v-row>
            <v-col md="10">
              <v-card color="#27293d" flat>
                <v-card-title primary-title> Article du panier </v-card-title>
                <v-card-text>
                  <v-table style="background: #27293d">
                    <tbody>
                      <tr class="header-table-cart">
                        <th style="text-align: center">PRODUIT</th>
                        <th style="min-width: 300px"></th>
                        <th style="min-width: 200px">PRIX</th>
                        <th style="min-width: 200px; text-align: center">QUANTITé</th>
                        <th>TOtal</th>
                      </tr>
                      <tr v-for="item in cartNewSet" :key="item!.id">
                        <td>
                          <v-img height="80px" lazy :src="item!.images[0]">
                            <template v-slot:placeholder>
                              <div class="d-flex align-center justify-center fill-height">
                                <v-progress-circular
                                  color="green"
                                  indeterminate
                                ></v-progress-circular>
                              </div>
                            </template>
                          </v-img>
                        </td>
                        <td>
                          {{ item!.title }}<br />
                          {{ item!.description }}
                        </td>
                        <td style="width: 150px">
                          {{ priceFormat(item!.price) }}
                          €
                        </td>
                        <td style="text-align: center">
                          <v-btn
                            @mouseover="hoverMinusEnter(item!.id)"
                            @mouseleave="hoverMinusLeave"
                            size="x-small"
                            @click="removeCartItem(item!.id)"
                            variant="plain"
                            icon="mdi-minus"
                            color="white"
                          >
                            <template v-slot>
                              <v-icon
                                size="30px"
                                color="error"
                                v-if="
                                  hover &&
                                  hoverId === item!.id &&
                                  cart.filter((cartItem) => cartItem.id === item!.id).length === 1
                                "
                                >mdi-delete-forever-outline</v-icon
                              >
                              <v-icon v-else>mdi-minus</v-icon>
                            </template>
                          </v-btn>
                          <span style="margin-left: 10px; margin-right: 10px">
                            {{ cart.filter((cartItem) => cartItem.id === item!.id).length }}
                          </span>
                          <v-btn
                            size="x-small"
                            @click="addToCart(item!)"
                            variant="plain"
                            icon="mdi-plus"
                            color="white"
                          ></v-btn>
                        </td>
                        <td>
                          {{
                            priceFormat(
                              item!.price *
                                cart.filter((cartItem) => cartItem.id === item!.id).length
                            )
                          }}€
                        </td>
                      </tr>
                    </tbody>
                  </v-table>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col xl="4">
              <br />

              <span class="recap-card-title-cart">Récapitulatif de la commande</span>
              <br />
              <br />

              <v-card style="border-radius: 0 !important" color="#1c9558" class="container-flex">
                <v-card-title class="card-title-cart"> Sous-Total </v-card-title>
                <v-card-title primary-title> {{ priceFormat(totalCart) }} </v-card-title>
              </v-card>

              <v-card style="border-radius: 0 !important" color="#1c9558" class="container-flex">
                <v-card-title class="card-title-cart"> Bon d'achat </v-card-title>
                <v-card-title primary-title> - 10 % </v-card-title>
              </v-card>

              <v-card style="border-radius: 0 !important" color="#1c9558" class="container-flex">
                <v-card-title class="card-title-cart"> éstimation de livraison </v-card-title>
                <v-card-title primary-title> 15 J. </v-card-title>
              </v-card>

              <br />
              <br />
              <v-card color="#1c9558" class="container-flex">
                <v-card-title class="card-title-cart"> Total </v-card-title>
                <v-card-title primary-title>
                  {{ priceFormat(totalCart * (1 - 0.1)) }}
                </v-card-title>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </template>

      <template v-slot:item.2>
        <v-sheet class="mx-auto">
          <v-form @submit.prevent>
            <v-container style="background-color: #27293d" class="pt-8">
              <v-text-field
                disabled
                label="Nom et prénom"
                class="field-expeditions"
                append-inner-icon="mdi-check-outline"
                v-model="name"
                variant="outlined"
              ></v-text-field>

              <v-text-field
                disabled
                label="Addresse"
                class="field-expeditions"
                append-inner-icon="mdi-check-outline"
                v-model="address"
                variant="outlined"
              ></v-text-field>
              <v-text-field
                v-model="userStore.currentUsers.address.city"
                label="Ville"
                class="field-expeditions"
                append-inner-icon="mdi-check-outline"
                disabled
                :value="userStore.currentUsers.address.city"
                variant="outlined"
              ></v-text-field>

              <div class="d-flex ga-2">
                <v-text-field
                  label="État"
                  disabled
                  class="field-expeditions"
                  append-inner-icon="mdi-check-outline"
                  v-model="userStore.currentUsers.address.state"
                  variant="outlined"
                ></v-text-field>

                <v-text-field
                  label="Code postal"
                  disabled
                  class="field-expeditions"
                  append-inner-icon="mdi-check-outline"
                  v-model="userStore.currentUsers.address.postalCode"
                  variant="outlined"
                ></v-text-field>
              </div>
            </v-container>
          </v-form>
        </v-sheet>
      </template>

      <template v-slot:item.3>
        <v-container fluid>
          <v-row>
            <v-col sm="5">
              <PaymentCard></PaymentCard>
            </v-col>
            <v-col sm="7">
              <TableCart v-if="cart !== undefined" :cart="cart"></TableCart>
              <v-card color="#1c9558" class="container-flex">
                <v-card-title class="card-title-cart"> Total </v-card-title>
                <v-card-title primary-title>
                  {{ priceFormat(totalCart * (1 - 0.1)) }}
                </v-card-title>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </template>
    </v-stepper>
    <div v-else class="container-alert">
      <v-alert two-line type="info" variant="tonal">
        <span
          >Votre panier est vide 😢.<br /><br />
          Vous pouvez choisirs des articles dans la section
          <router-link style="color: #1c9558" color="green" to="/Ecommerce">
            E-commerce</router-link
          >
          😀</span
        >
      </v-alert>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { useAuthenticationStore } from '../stores/Auth'
import PaymentCard from '@/components/Profil/PaymentCard.vue'
import TableCart from '@/components/Carts/TableCart.vue'
import type { ItemLocalStorage } from '@/components/Ecommerce/Products/itemStorage'
const userStore = useAuthenticationStore()

const storage = JSON.parse(localStorage.getItem('cart')!)
const cart = ref<ItemLocalStorage[]>(storage)
const hover = ref(false)
const hoverId = ref(0)
const hoverMinusEnter = (id: number) => {
  hover.value = true
  hoverId.value = id
}

const hoverMinusLeave = () => {
  hover.value = false
  hoverId.value = 0
}

const removeCartItem = (itemId: number) => {
  const storedItems = localStorage.getItem('cart')
  const parsedItems: ItemLocalStorage[] = storedItems ? JSON.parse(storedItems) : []
  const indexToRemove = parsedItems.findIndex((item) => item.id === itemId)
  if (indexToRemove !== -1) {
    parsedItems.splice(indexToRemove, 1)
  }
  localStorage.setItem('cart', JSON.stringify(parsedItems))
  cart.value = parsedItems
}

const cartNewSet = computed(() => {
  return [...new Set(cart.value.map((item) => item.id))].map((id) =>
    cart.value.find((item) => item.id === id)
  )
})

const totalCart = computed(() => {
  let totalPrice = 0
  for (let i = 0; i < cart.value.length; i++) {
    const price = cart.value[i].price
    totalPrice += price
  }
  return totalPrice
})

const addToCart = (item: ItemLocalStorage) => {
  const storedItems = localStorage.getItem('cart')
  const parsedItems: ItemLocalStorage[] = storedItems ? JSON.parse(storedItems) : []
  parsedItems.push(item)
  localStorage.setItem('cart', JSON.stringify(parsedItems))
  cart.value = parsedItems
}

const priceFormat = (price: number) => {
  return Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR'
  }).format(price)
}

const name = computed(() => {
  return `${userStore.currentUsers.firstName} ${userStore.currentUsers.lastName}`
})

const address = computed(() => {
  return `${userStore.currentUsers.address.address} ${userStore.currentUsers.address.city} ${userStore.currentUsers.address.state}, ${userStore.currentUsers.address.postalCode}`
})

onMounted(() => {
  cart.value = storage
})
</script>
<style lang="scss">
.field-expeditions .mdi-check-outline {
  color: #1c9558 !important;
  opacity: 1 !important;
}
</style>
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
