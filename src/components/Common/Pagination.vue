<template>
  <v-card :class="theme.theme ? 'data-table' : 'theme-on'">
    <v-container>
      <v-row>
        <v-spacer v-if="!device"></v-spacer>

        <v-col :xl="device ? '12' : '4'" class="d-flex flex-wrap align-center justify-center">
          <v-select
            label="Affichage"
            hide-details
            density="compact"
            style="width: 100px"
            v-model="paginationItemsPerPage"
            :items="[10, 15, 25, 50]"
            variant="outlined"
          ></v-select>
        </v-col>
        <v-col :xl="device ? '12' : '4'" class="d-flex flex-wrap align-center justify-center">
          <span aria-label="test-pagination-info"
            >{{ paginationPages }} - {{ paginationPages + paginationItemsPerPage }} de
            {{ props.total! }}</span
          >
        </v-col>
        <v-col :xl="device ? '12' : '4'" class="d-flex flex-wrap align-center justify-center">
          <v-card-actions>
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
          </v-card-actions>
        </v-col>
        <v-spacer v-if="!device"></v-spacer>
      </v-row>
    </v-container>
  </v-card>
</template>
<script setup lang="ts">
import { useThemeStore } from '@/stores/App'
import { computed, ref, watch } from 'vue'
import { useDisplay } from 'vuetify'

const theme = useThemeStore()
const emit = defineEmits(['callbackPagination'])
const props = defineProps({
  total: Number,
  itemsPerPage: Number,
  pages: Number
})
const paginationPages = ref(0)
const paginationItemsPerPage = ref(10)
const device = useDisplay().mobile

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
