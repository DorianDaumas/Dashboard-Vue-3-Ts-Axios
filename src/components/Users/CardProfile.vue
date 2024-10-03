<template>
  <div>
    <v-card
      aria-label="card-profil"
      @click="show = !show"
      :ripple="false"
      :disabled="selectUserLength"
      :color="store.theme ? '#27293d' : 'white'"
      class="mx-auto"
    >
      <div style="margin-bottom: 20px; margin-top: 20px" v-if="selectUserLength">
        <v-card-subtitle> Séléctionner un utilisateur pour voir ces données</v-card-subtitle>
      </div>
      <div style="display: flex; margin-bottom: 10px; justify-content: space-between" v-else>
        <div>
          <v-card-title> Fiche de l'utilisateur : {{ props.userInfo.username }} </v-card-title>
          <v-card-subtitle> Information</v-card-subtitle>
        </div>
        <div>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              :disabled="selectUserLength"
              :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'"
            ></v-btn>
          </v-card-actions>
        </div>
      </div>

      <v-expand-transition>
        <div v-if="show">
          <div aria-label="show-content">
            <v-divider></v-divider>
            <v-card-text>
              <v-container fluid>
                <v-row>
                  <v-col lg="8">
                    <Chart
                      :key="infoChart.subTitle"
                      :infoChart="infoChart"
                      :chartConfigData="data"
                      :chartConfigOptions="options"
                    ></Chart>
                  </v-col>
                  <v-col lg="4">
                    <div>
                      <div class="container-picture">
                        <img
                          style="text-align: center"
                          :src="props.userInfo.image"
                          :alt="props.userInfo.image"
                        />
                        <br />
                        <span>{{ props.userInfo.username }}</span>
                      </div>

                      <br />

                      <table style="width: 100%">
                        <tr class="align-left">
                          <th>Nom</th>
                          <th class="align-right">Prénom</th>
                        </tr>
                        <tr>
                          <td>{{ props.userInfo.lastName }}</td>
                          <td class="align-right">{{ props.userInfo.firstName }}</td>
                        </tr>

                        <br />

                        <tr class="align-left">
                          <th>Date de naissance</th>
                          <th class="align-right">Adresse</th>
                        </tr>
                        <tr>
                          <td>{{ props.userInfo.birthDate }}</td>
                          <td class="align-right">
                            {{ props.userInfo.address.address }},
                            {{ props.userInfo.address.city }}
                            {{ props.userInfo.address.postalCode }}
                          </td>
                        </tr>

                        <br />

                        <tr class="align-left">
                          <th>Entreprise</th>
                          <th class="align-right">Status</th>
                        </tr>
                        <tr>
                          <td>{{ props.userInfo.company?.name }}</td>
                          <td class="align-right">{{ props.userInfo.company.title }}</td>
                        </tr>

                        <br />

                        <tr>
                          <th class="align-left">Tél</th>
                          <th class="align-right">Email</th>
                        </tr>
                        <tr>
                          <td>{{ props.userInfo.phone }}</td>
                          <td class="align-right">{{ props.userInfo.email }}</td>
                        </tr>
                      </table>
                    </div>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
          </div>
        </div>
      </v-expand-transition>
    </v-card>
  </div>
</template>
<script lang="ts" setup>
import { ref, defineProps, computed, watch } from 'vue'
import Chart from '../Dashboard/Chart.vue'
import { useThemeStore } from '@/stores/App'
import type { selectUserType } from './selectUserType'

const store = useThemeStore()

const props = defineProps<selectUserType>()

const selectUserLength = computed(() => props.userInfo.username.length === 0)

const show = ref(false)
const arrayToShuffle = ref([65, 59, 80, 81, 56, 55, 65, 59, 60, 81, 55, 40])

const infoChart = ref({
  type: 'Line',
  title: 'Evaluation',
  subTitle: ''
})

watch(props, () => {
  if (!selectUserLength.value) {
    show.value = true
  }
  infoChart.value.subTitle = props.userInfo.username
  arrayToShuffle.value.sort(() => 0.5 - Math.random())
})

const labels = [
  'Janvier',
  'Fevrier',
  'Mars',
  'Avril',
  'Mai',
  'Juin',
  'Juillet',
  'Aout',
  'Septembre',
  'Octobre',
  'Novembre',
  'Décembre'
]
const data = {
  labels: labels,
  datasets: [
    {
      label: ' Ventes',
      backgroundColor: '#27293d',
      data: arrayToShuffle.value,
      fill: {
        target: 'origin',
        above: 'rgba(75, 192, 192, .10)',
        below: 'red'
      },
      title: {
        display: false
      },
      borderColor: 'rgb(75, 192, 192)',
      color: 'white',
      tension: 0.4,
      hoverBorderWidth: '3'
    }
  ]
}

const options = {
  responsive: true,
  maintainAspectRatio: false
}
</script>
<style lang="scss" scoped>
.container-info-user {
  padding: 10px;
}
.container {
  display: flex;
  justify-content: space-between;
  div {
    width: 250px;
    margin-bottom: 10px;
    p {
      white-space: pre;
      width: 250px;
    }
  }
}
.align-left {
  text-align: left;
  th {
    width: 200px;
  }
}
.align-right {
  text-align: right;
  th {
    width: 200px;
  }
}
.container-picture {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  img {
    height: 100px;
    width: 100px;
  }
}
</style>
