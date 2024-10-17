<template>
  <div>
    <v-card
      elevation="0"
      :class="store.theme ? 'data-table' : 'theme-on'"
      height="80px"
      class="d-flex align-center"
      color="#27293d"
      style="border-bottom-left-radius: 0px; border-bottom-right-radius: 0px"
    >
      <v-card-title
        class="d-flex align-center justify-space-between"
        style="cursor: pointer; width: 100%"
        @click="expandFilters = !expandFilters"
        primary-title
      >
        <div class="d-flex align-center" style="align-items: center">
          <v-icon size="25">mdi-filter-settings-outline</v-icon>
          <span class="title-filters">Filtres</span>
          <v-spacer></v-spacer>
        </div>
        <div>
          <v-icon v-if="expandFilters" size="25">mdi-chevron-up</v-icon>
          <v-icon v-else size="25">mdi-chevron-down</v-icon>
        </div>
      </v-card-title>
    </v-card>
    <br />
    <transition name="slide" mode="out-in">
      <v-card
        v-if="expandFilters"
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
              style="max-height: 64vh; overflow: auto"
              density="compact"
              class="list-item-category"
              :class="store.theme ? 'data-table' : 'theme-on'"
              lines="one"
            >
              <v-list-item aria-label="test-reset" @click="changeCategorie('reset')"
                >Tout</v-list-item
              >
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
              ><span v-if="expand">- Réduire</span><span v-else>+ Tout afficher</span></span
            >
          </div>
        </v-card-text>
      </v-card>
    </transition>
  </div>
</template>
<script setup lang="ts">
import { useEcommerceStore } from '@/stores/Ecommerce'
import { onMounted, ref, defineEmits } from 'vue'
import type { CategorieType } from './filtersType'
import { useThemeStore } from '@/stores/App'
import { useDisplay } from 'vuetify'

const emit = defineEmits(['category'])
const store = useThemeStore()

const value = ref([0, 4000])
const ecommerceStore = useEcommerceStore()
const categories = ref<CategorieType>({ categories: [{ name: '', slug: '' }] })
const expand = ref(false)
const expandFilters = ref(false)
const mobile = useDisplay().mobile

onMounted(() => {
  ecommerceStore.fetchProductCategorie().then((val) => {
    categories.value = val.content
  })
  if (mobile.value) {
    expandFilters.value = false
  } else {
    expandFilters.value = true
  }
})

const changeCategorie = (categorie: string) => {
  emit('category', categorie)
  if (mobile.value) {
    expandFilters.value = false
  } else {
    expandFilters.value = true
  }
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

.slide-enter-active,
.slide-leave-active {
  transition:
    max-height 0.5s ease,
    opacity 0.5s ease;
  max-height: 1000px; // Ajustez cette valeur selon le contenu maximal
  overflow: hidden;
}

.slide-enter-from,
.slide-leave-to {
  max-height: 0;
  opacity: 0;
}

.slide-enter-to,
.slide-leave-from {
  max-height: 1000px; // Doit correspondre à la valeur ci-dessus
  opacity: 1;
}
</style>
