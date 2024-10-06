<template>
  <div aria-label="test-add-cart">
    <div v-if="cartItemIds.find((cartItem) => cartItem === productDetail.id)">
      <v-btn
        aria-label="test-remove-cart-with-item"
        @mouseover="hoverMinusEnter(productDetail!.id)"
        @mouseleave="hoverMinusLeave"
        size="x-small"
        @click="removeCartItem(productDetail!.id)"
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
              hoverId === productDetail!.id &&
              cart.filter((cartItem) => cartItem.id === productDetail!.id).length === 1
            "
            >mdi-delete-forever-outline</v-icon
          >
          <v-icon v-else>mdi-minus</v-icon>
        </template>
      </v-btn>
      <span style="margin-left: 10px; margin-right: 10px">{{
        cartItemIds.filter((cartItem) => cartItem === productDetail.id).length
      }}</span>
      <v-btn
        aria-label="test-add-cart-with-item"
        size="small"
        @click="addToCart(productDetail)"
        variant="plain"
        icon="mdi-plus"
        color="white"
      ></v-btn>
    </div>
    <div v-else>
      <v-btn
        aria-label="test-add-cart-no-item"
        @click="addToCart(productDetail)"
        variant="outlined"
        color="#42b883"
        >Ajouter au panier</v-btn
      >
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue'
import { defineProps } from 'vue'
import type { ItemLocalStorage } from '../Ecommerce/Products/itemStorage'
import type { ProductType } from '../Ecommerce/Product/productType'

const { productDetail } = defineProps<ProductType>()
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

const addToCart = (item: ItemLocalStorage) => {
  const storedItems = localStorage.getItem('cart')
  const parsedItems: ItemLocalStorage[] = storedItems ? JSON.parse(storedItems) : []
  parsedItems.push(item)
  localStorage.setItem('cart', JSON.stringify(parsedItems))
  cart.value = parsedItems
}

const cartItemIds = computed(() => {
  if (storage) {
    return cart.value.map((item: { id: number }) => item.id)
  }
  return []
})
</script>
