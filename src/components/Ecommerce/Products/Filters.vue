<template>
  <div>
    <v-card
      elevation="0"
      :class="store.theme ? 'data-table' : 'theme-on'"
      height="64px"
      color="#27293d"
    >
      <v-card-title primary-title>
        <div class="d-flex" style="align-items: center">
          <v-icon size="25">mdi-filter-settings-outline</v-icon>
          <span class="title-filters">Filtres</span>
        </div>
      </v-card-title>
    </v-card>
    <br />
    <v-card
      style="margin-top: 3px"
      :class="store.theme ? 'data-table' : 'theme-on'"
      color="#27293d"
    >
      <v-card-text color="#27293d">
        <div>
          <span class="title-filter"> Gammes de prix </span>
          <br /><br /><br />
          <v-range-slider
            v-model="value"
            style="margin-right: 30px; margin-left: 20px"
            step="10"
            color="#1c9558"
            max="4000"
            min="0"
            thumb-label="always"
          >
            <template v-slot:thumb-label="{ modelValue }">
              <span style="white-space: pre; color: white">{{ modelValue }} €</span>
            </template>
          </v-range-slider>
          <span class="title-filter"> Categories </span>
          <v-list
            density="compact"
            class="list-item-category"
            :class="store.theme ? 'data-table' : 'theme-on'"
            style="background: #27293d"
            lines="one"
          >
            <v-list-item @click="changeCategorie('reset')">Tout</v-list-item>
            <div>
              <v-list-item
                aria-label="test-select"
                v-for="(item, index) in expand
                  ? categories.categories
                  : categories.categories.slice(1, 10)"
                :key="index"
                :title="item.name"
                @click="changeCategorie(item.slug)"
              >
              </v-list-item>
            </div>
          </v-list>

          <span
            aria-label="test-expand"
            style="cursor: pointer; color: #42a5f5; margin-left: 15px"
            @click="expand = !expand"
            >Tout afficher</span
          >
        </div>

        <br />
        <span class="title-filter"> Marques </span>
        <v-list
          density="compact"
          :class="store.theme ? 'data-table' : 'theme-on'"
          class="list-item-category"
          style="background: #27293d"
          lines="one"
        >
          <v-list-item v-for="(item, index) in items" :key="index">{{ item.title }}</v-list-item>
        </v-list>
      </v-card-text>
    </v-card>
  </div>
</template>
<script setup lang="ts">
import { useEcommerceStore } from '@/stores/Ecommerce'
import { onMounted, ref, defineEmits } from 'vue'
import type { CategorieType } from './filtersType'
import { useThemeStore } from '@/stores/App'

const emit = defineEmits(['category'])
const store = useThemeStore()

const value = ref([0, 4000])
const ecommerceStore = useEcommerceStore()
const categories = ref<CategorieType>({ categories: [{ name: '', slug: '' }] })
const expand = ref(false)
const items = ref([
  {
    title: 'Marque #1'
  },
  {
    title: 'Marque #2'
  },
  {
    title: 'Marque #3'
  },
  {
    title: 'Marque #4'
  },
  {
    title: 'Marque #5'
  }
])

onMounted(() => {
  ecommerceStore.fetchProductCategorie().then((val) => {
    categories.value = val.content
  })
})

const changeCategorie = (categorie: string) => {
  emit('category', categorie)
}
</script>
<style lang="scss">
.list-item-category .v-list-item-title {
  font-size: 14px !important;
  font-variant: tabular-nums;
  line-height: 1.5715;
}
.title-filter {
  font-weight: 600;
  font-size: 15px !important;
}
.title-filters {
  font-size: 16px;
  font-weight: 500;
  margin-left: 20px;
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
