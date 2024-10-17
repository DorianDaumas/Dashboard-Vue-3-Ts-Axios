<template>
  <div>
    <h2 class="subtitle">COMPTE</h2>
    <div></div>
    <v-list
      hide-details
      class="list-details"
      style="background-color: transparent !important"
      color="red"
    >
      <v-list-item hide-details>
        <v-switch dense v-model="data" color="#42b883" class="switch-label" hide-details>
          <template v-slot:label>
            <span class="switch-label">Envoyez-moi une notification quand quelqu'un me suit</span>
          </template></v-switch
        >
      </v-list-item>
      <v-list-item hide-details>
        <v-switch dense v-model="data2" color="#42b883" class="switch-label" hide-details>
          <template v-slot:label>
            <span class="switch-label">Envoyez-moi une notification quand quelqu'un me répond</span>
          </template></v-switch
        >
      </v-list-item>
      <v-list-item hide-details>
        <v-switch dense v-model="data3" color="#42b883" class="switch-label" hide-details>
          <template v-slot:label>
            <span class="switch-label"
              >Envoyez-moi une notification quand quelqu'un me mentionne</span
            >
          </template></v-switch
        >
      </v-list-item>
    </v-list>

    <br />
    <h2 class="subtitle">APPLICATION</h2>
    <div></div>
    <v-list
      class="list-details"
      hide-details
      style="background-color: transparent !important"
      color="red"
    >
      <v-list-item hide-details>
        <v-switch dense v-model="data4" color="#42b883" class="switch-label" hide-details>
          <template v-slot:label>
            <span class="switch-label">Nouveaux lancements et projets </span>
          </template></v-switch
        >
      </v-list-item>
      <v-list-item hide-details>
        <v-switch dense v-model="data5" color="#42b883" class="switch-label" hide-details>
          <template v-slot:label>
            <span class="switch-label">Mises à jour mensuelles des produits</span>
          </template></v-switch
        >
      </v-list-item>
      <v-list-item hide-details>
        <v-switch dense v-model="data6" color="#42b883" class="switch-label" hide-details>
          <template v-slot:label>
            <span class="switch-label">Inscription à la newsletter</span>
          </template></v-switch
        >
      </v-list-item>
    </v-list>

    <br />
    <h2 class="subtitle">APPLICATION</h2>
    <div></div>
    <v-list
      class="list-details"
      hide-details
      style="background-color: transparent !important"
      color="red"
    >
      <v-list-item hide-details>
        <v-switch dense v-model="data7" color="#42b883" class="switch-label" hide-details>
          <template v-slot:label>
            <span class="switch-label">Alerts produits manquants </span>
          </template></v-switch
        >
      </v-list-item>
      <v-list-item hide-details>
        <v-switch dense v-model="data8" color="#42b883" class="switch-label" hide-details>
          <template v-slot:label>
            <span class="switch-label">Mises à jour automatiques</span>
          </template></v-switch
        >
      </v-list-item>
    </v-list>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const data = ref(true)
const data2 = ref(false)
const data3 = ref(true)
const data4 = ref(false)
const data5 = ref(true)
const data6 = ref(false)
const data7 = ref(false)
const data8 = ref(true)
</script>
<style lang="scss" scoped>
.list-details .v-input--density-default {
  --v-input-control-height: 40px !important;
}
.title {
  font-weight: 500;
  line-height: 1.5;
  font-size: 1rem !important;
  letter-spacing: normal !important;
}
.subtitle {
  font-weight: 700 !important;
  text-transform: uppercase !important;
  font-size: 0.75rem !important;
}
.switch-label {
  font-size: 0.875rem !important;
  line-height: 1.5;
  font-weight: 400;
}
</style>
