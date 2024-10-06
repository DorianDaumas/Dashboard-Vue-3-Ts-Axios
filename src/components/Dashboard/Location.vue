<template>
  <v-container fluid :class="store.theme ? 'container-chart' : 'container-chart theme-on'">
    <v-row>
      <v-col md="8">
        <div>
          <span class="low-text-chart">Ventes mondiales par principaux emplacements</span
          ><br /><br />
          <h1 class="title-chart">Tous les produits expédiés</h1>
          <br /><br />
          <v-table :class="store.theme ? 'container-chart' : 'container-chart theme-on'">
            <tbody>
              <tr v-for="item in desserts" :key="item.name">
                <td style="width: 100px">
                  <country-flag :country="item.country" size="normal" />
                </td>
                <td>{{ item.name }}</td>
                <td>{{ item.number }}</td>
                <td>{{ item.pourcentage }}</td>
              </tr>
            </tbody>
          </v-table>
        </div>
      </v-col>
      <v-col md="4">
        <Pie :data="chartConfig.dataPie" :options="chartConfig.options" />
      </v-col>
    </v-row>
  </v-container>
</template>
<script lang="ts" setup>
import { useThemeStore } from '@/stores/App'
import CountryFlag from 'vue-country-flag-next'
import { Pie } from 'vue-chartjs'
import * as chartConfig from '@/components/Dashboard/chartConfig.js'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
ChartJS.register(ArcElement, Tooltip, Legend)

const desserts = [
  {
    name: 'USA',
    country: 'us',
    number: 2.92,
    pourcentage: 53.23
  },
  {
    name: 'France',
    country: 'fr',
    number: 1.3,
    pourcentage: 20.43
  },
  {
    name: 'Allemagne',
    country: 'de',
    number: 760,
    pourcentage: 10.53
  },
  {
    name: 'Belgique',
    country: 'be',
    number: 690,
    pourcentage: 7.87
  },
  {
    name: 'Australie',
    country: 'au',
    number: 600,
    pourcentage: 5.94
  },
  {
    name: 'Royaume-Uni',
    country: 'gb',
    number: 500,
    pourcentage: 3.95
  },
  {
    name: 'Brésil',
    country: 'br',
    number: 50,
    pourcentage: 1.05
  }
]
const store = useThemeStore()
</script>
<style lang="scss" scoped></style>
