<template>
  <div>
    <v-data-table
      aria-label="data-table"
      :class="store.theme ? 'data-table' : 'theme-on'"
      :headers="headers"
      hide-default-footer
      disable-sort
      :loading="ProductStore.loadingOtherProducts"
      :items="props.otherProducts.otherProductsDetail"
      :items-length="props.otherProducts.limit"
    >
      <template v-slot:loading>
        <v-skeleton-loader color="#27293d" type="table-row@5"></v-skeleton-loader>
      </template>
      <template v-slot:item="{ item }">
        <tr style="cursor: pointer" @click="selectRow(item.id)">
          <td><v-img class="product-thumb-picture" :src="item.thumbnail" /></td>
          <td>{{ item.title }}</td>
          <td>
            {{
              Intl.NumberFormat('fr-FR', {
                style: 'currency',
                currency: 'EUR'
              }).format(item.price)
            }}
          </td>
          <td>
            <v-rating
              readonly
              half-increments
              :length="5"
              :size="32"
              :model-value="item.rating"
              active-color="#7b809a"
            />
          </td>
          <td>{{ item.stock }}</td>
        </tr>
      </template>
    </v-data-table>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { defineProps, defineEmits } from 'vue'
import { useThemeStore } from '@/stores/App'
import { useProductsStore } from '@/stores/Products'
import type { otherProductType } from './otherProductType'
import { useDisplay } from 'vuetify'

const store = useThemeStore()
const ProductStore = useProductsStore()
const emit = defineEmits(['clickRow'])
const headers: any = ref([
  { title: 'Produit', align: 'left', key: 'thumbnail' },
  { title: 'Dénomination', align: 'left', key: 'title' },
  { title: 'Prix', align: 'start', justify: 'center', key: 'price' },
  { title: 'Note', key: 'rating', align: 'center' },
  { title: 'Stock', key: 'stock', align: 'center' }
])
const device = useDisplay().mobile
const props = defineProps<otherProductType>()

const selectRow: any = (id: number) => {
  emit('clickRow', id)
}
</script>
<style scoped lang="scss">
.product-thumb-picture {
  height: 50px;
  margin: 5px 0px 5px 0px;
  width: 50px;
  border-radius: 50%;
  background: rgb(255, 255, 255);
}
</style>
