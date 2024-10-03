<template>
  <v-card
    height="150px"
    :class="store.theme ? 'theme-off mx-auto' : 'theme-on mx-auto'"
    color="#27293d"
    hover
  >
    <v-card-item>
      <v-row no-gutters>
        <v-col md="5" style="margin-top: 5px">
          <v-card-title>
            <v-icon
              class="icon-card"
              :style="`background: ${card.icon.color}`"
              :icon="card.icon.name"
            />
          </v-card-title>
        </v-col>
        <v-col md="7" align="right">
          <v-card-subtitle class="subtitle">{{ card.subTitle1 }}</v-card-subtitle>
          <v-card-subtitle class="subtitle2">{{ card.subTitle2 }}</v-card-subtitle>
        </v-col>
      </v-row>
    </v-card-item>

    <v-divider></v-divider>

    <v-card-text align="center" style="opacity: 0.5; font-weight: 300">
      {{ card.text }}
    </v-card-text>
  </v-card>
</template>
<script lang="ts" setup>
import { defineProps } from 'vue'
import { useThemeStore } from '@/stores/App'
const store = useThemeStore()

const { card } = defineProps<{
  card: {
    icon: {
      name: string
      color: string
    }
    subTitle1: string
    subTitle2: string
    text: string
  }
}>()
</script>
<style lang="scss">
.icon-card {
  border-radius: 50%;
  padding: 23px;
}
.subtitle {
  font-size: 0.7500000025rem;
}
.subtitle2 {
  text-transform: inherit;
  font-weight: 300;
  font-size: 1.437499875rem;
  opacity: 1;
}
</style>
