<template>
  <v-card :class="theme.theme ? 'data-table' : 'theme-on'">
    <v-card-actions>
      <v-spacer></v-spacer>
      <div class="d-flex align-center justify-center">
        <span>Utilisateurs par pages</span>&nbsp;&nbsp;
        <v-select
          label="Affichage"
          hide-details
          density="compact"
          style="width: 100px"
          v-model="paginationItemsPerPage"
          :items="[10, 15, 25, 50]"
          variant="outlined"
        ></v-select>
      </div>
      <span aria-label="test-pagination-info"
        >{{ paginationPages }} - {{ paginationPages + paginationItemsPerPage }} de
        {{ props.total! }}</span
      >
      <div aria-label="container-pagination">
        <v-btn
          aria-label="firstPagePagination"
          :disabled="paginationPages === 0"
          @click="first"
          icon="mdi-chevron-double-left"
        ></v-btn>
        <v-btn
          aria-label="prevPagination"
          :disabled="paginationPages === 0"
          @click="prev"
          icon="mdi-chevron-left"
        ></v-btn>
        <v-btn
          aria-label="nextPagination"
          :disabled="paginationPages === props.total! - paginationItemsPerPage"
          @click="next"
          icon="mdi-chevron-right"
        ></v-btn>
        <v-btn
          aria-label="lastPagination"
          :disabled="paginationPages === props.total! - paginationItemsPerPage"
          @click="last"
          icon="mdi-chevron-double-right"
        ></v-btn>
      </div>
      <v-spacer></v-spacer>
    </v-card-actions>
  </v-card>
</template>
<script setup lang="ts">
import { useThemeStore } from '@/stores/App'
import { computed, ref, watch } from 'vue'

const theme = useThemeStore()
const emit = defineEmits(['callbackPagination'])
const props = defineProps({
  total: Number,
  itemsPerPage: Number,
  pages: Number
})
const paginationPages = ref(0)
const paginationItemsPerPage = ref(10)

const callbackData = computed(() => {
  const data = {
    pages: paginationPages.value,
    itemsPerPage: paginationItemsPerPage.value
  }
  return data
})
const first = () => {
  paginationPages.value = 0
  emit('callbackPagination', callbackData.value)
}

const last = () => {
  paginationPages.value = props.total! - paginationItemsPerPage.value
  emit('callbackPagination', callbackData.value)
}

const prev = () => {
  paginationPages.value -= paginationItemsPerPage.value
  emit('callbackPagination', callbackData.value)
}

const next = () => {
  paginationPages.value += paginationItemsPerPage.value
  emit('callbackPagination', callbackData.value)
}

watch(
  () => paginationItemsPerPage.value,
  () => {
    emit('callbackPagination', callbackData.value)
  }
)
</script>
<style lang="scss">
.container-alert {
  width: fit-content;
  margin: auto;
}
</style>
