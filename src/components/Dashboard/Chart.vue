<template>
  <div>
    <v-container fluid :class="store.theme ? 'container-chart' : 'container-chart theme-on'">
      <v-row>
        <v-col>
          <span class="low-text-chart">{{ infoChart.title }}</span
          ><br /><br />
          <h1 class="title-chart">{{ infoChart.subTitle }}</h1>
        </v-col>

        <v-col cols="12" :class="store.theme ? 'container-chart' : 'container-chart theme-on'">
          <Line
            v-if="infoChart.type === 'Line'"
            :style="size"
            :data="chartConfigData"
            :options="chartConfigOptions"
          />
          <Bar
            v-else-if="infoChart.type === 'Bar'"
            :data="chartConfigData"
            :style="size"
            :options="chartConfigOptions"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script lang="ts" setup>
import { computed, defineProps } from 'vue'
import { useThemeStore } from '@/stores/App'
import { Line, Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  BarElement
} from 'chart.js'
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  BarElement,
  Tooltip,
  Legend,
  Filler
)
const store = useThemeStore()

defineProps<{
  infoChart: {
    type: string
    title: string
    subTitle: string
  }
  chartConfigData: any
  chartConfigOptions: any
}>()

const size = computed(() => {
  return {
    height: '250px',
    position: 'relative'
  }
})
</script>
<style lang="scss">
.container-chart {
  background-color: #27293d !important;
  border-radius: 4px;
}

.theme-on {
  background: white !important;
  color: black !important;
}

.low-text-chart {
  color: #9a9a9a;
  font-weight: 300;
  font-size: 0.7500000025rem;
}
.title-chart {
  font-weight: 300;
  font-size: 1.687499975rem;
}
</style>
