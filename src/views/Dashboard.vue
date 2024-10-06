<template>
  <div>
    <v-container :class="store.theme ? 'theme' : ''" style="padding-top: 0" fluid>
      <v-row>
        <v-col md="12">
          <Chart
            :infoChart="infoChart"
            :chartConfigData="chartConfig.data1"
            :chartConfigOptions="chartConfig.options"
          />
        </v-col>
      </v-row>
    </v-container>

    <v-container :class="store.theme ? 'theme' : ''" fluid>
      <v-row alignContent="center" justify="space-between">
        <v-spacer></v-spacer>

        <v-col cols="12" xl="3" sm="6" md="4" lg="4">
          <Card :card="card1" />
        </v-col>
        <v-spacer></v-spacer>

        <v-col cols="12" xl="3" sm="6" md="4" lg="4">
          <Card :card="card2" />
        </v-col>
        <v-spacer></v-spacer>

        <v-col cols="12" xl="3" sm="6" md="4" lg="4">
          <Card :card="card3" />
        </v-col>
        <v-spacer></v-spacer>

        <v-col cols="12" xl="3" sm="6" md="4" lg="4">
          <Card :card="card4" />
        </v-col>
        <v-spacer></v-spacer>
      </v-row>
    </v-container>

    <div>
      <v-container :class="store.theme ? 'theme' : ''" fluid>
        <v-row>
          <v-col cols="12" xl="4" sm="6" md="4" lg="4">
            <Chart
              :infoChart="infoChart2"
              :chartConfigData="chartConfig.data2"
              :chartConfigOptions="chartConfig.options"
            />
          </v-col>
          <v-spacer></v-spacer>

          <v-col cols="12" xl="4" sm="6" md="4" lg="4">
            <Chart
              :infoChart="infoChart3"
              :chartConfigData="chartConfig.data3"
              :chartConfigOptions="chartConfig.options"
            />
          </v-col>
          <v-spacer></v-spacer>

          <v-col cols="12" xl="4" sm="6" md="4" lg="4">
            <Chart
              :infoChart="infoChart4"
              :chartConfigData="chartConfig.data4"
              :chartConfigOptions="chartConfig.options"
            />
          </v-col>
        </v-row>
      </v-container>
    </div>
    <Location></Location>

    <!-- <v-container :class="store.theme ? 'theme' : ''" style="padding-top: 0" fluid>
      <v-row>
        <v-col md="12">
          <div></div>
        </v-col>
      </v-row>
    </v-container> -->
  </div>
</template>
<script setup>
import Chart from '@/components/Dashboard/Chart.vue'
import Card from '@/components/Dashboard/Card.vue'
import * as chartConfig from '@/components/Dashboard/chartConfig.js'
import { ref } from 'vue'
import { useThemeStore } from '@/stores/App'
import Location from '@/components/Dashboard/Location.vue'
const store = useThemeStore()

const infoChart4 = ref({
  type: 'Line',
  title: 'Tâches complétées',
  subTitle: '12,100K'
})

const infoChart3 = ref({
  type: 'Bar',
  title: 'Ventes journalières',
  subTitle: '3,500 €'
})

const infoChart2 = ref({
  type: 'Line',
  title: 'Total des expéditions',
  subTitle: '763,215'
})

const infoChart = ref({
  type: 'Line',
  title: 'Total des expéditions',
  subTitle: 'Performance'
})

const card4 = ref({
  icon: {
    name: 'mdi-hexagon-multiple',
    color: 'linear-gradient(to bottom left,#fd5d93,#ec250d,#fd5d93)'
  },
  subTitle1: 'Errors',
  subTitle2: '23',
  text: 'In the last hours'
})

const card3 = ref({
  icon: {
    name: 'mdi-account',
    color: 'linear-gradient(to bottom left,#1d8cf8,#3358f4,#1d8cf8)'
  },
  subTitle1: 'Users',
  subTitle2: '150,000',
  text: 'Customer feedback'
})

const card2 = ref({
  icon: {
    name: 'mdi-star',
    color: 'linear-gradient(to bottom left,#e14eca,#ba54f5,#e14eca)'
  },
  subTitle1: 'Followers',
  subTitle2: '+45K',
  text: 'Last research'
})

const card1 = ref({
  icon: {
    name: 'mdi-text',
    color: 'linear-gradient(to bottom left,#ff8d72,#ff6491,#ff8d72)'
  },
  subTitle1: 'Number',
  subTitle2: '150GB',
  text: 'Update now'
})
</script>
<style scoped lang="scss">
.theme {
  background: rgb(30, 30, 47);
  padding-left: 0;
  padding-right: 0;
}
</style>
