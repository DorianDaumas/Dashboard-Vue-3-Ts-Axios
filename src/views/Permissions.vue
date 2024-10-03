<template>
  <div>
    <v-data-table
      style="background: #27293d; font-weight: 400"
      :class="storeTheme.theme ? 'data-table' : 'theme-on'"
      :headers="headers"
      class="data-table-permissions"
      :items="items"
      disable-sort
      hide-default-footer
    >
      <template v-slot:[`item.assigned`]="{ value }">
        <v-chip
          style="margin-right: 10px"
          :color="colors(chip)"
          v-for="(chip, index) in value"
          :key="index"
          >{{ chip }}
        </v-chip>
      </template>

      <template v-slot:[`item.actions`]>
        <v-btn variant="text" icon="mdi-delete-outline"></v-btn>
        <v-btn variant="text" icon="mdi-archive-edit-outline"></v-btn>
      </template>
    </v-data-table>
  </div>
</template>
<script setup lang="ts">
import { useThemeStore } from '@/stores/App'
import { ref } from 'vue'

const storeTheme = useThemeStore()
const colors = (val: string) => {
  if (val === 'Administrateur') {
    return '#666cff'
  } else if (val === 'Manageur') {
    return 'orange'
  } else if (val === 'utilisateur') {
    return 'success'
  } else if (val === 'Utilisateur restreint') {
    return 'error'
  }
  return '#26c6f9'
}

const headers: any = [
  { title: 'Nom', align: 'start', key: 'name' },
  { title: 'Assigné', align: 'end', key: 'assigned' },
  { title: 'Création', align: 'end', key: 'creation' },
  { title: 'Actions', align: 'end', key: 'actions' }
]

const items = ref([
  { name: 'Management', assigned: ['Administrateur'], creation: '14 Avril 2021, 8H43' },
  {
    name: 'Facturation et rôles',
    assigned: ['Administrateur'],
    creation: '16 Septembre 2021, 5H20'
  },
  {
    name: 'Ajouter et supprimer des utilisateurs',
    assigned: ['Administrateur', 'Manageur'],
    creation: '14 Octobre 2021, 10H20'
  },
  {
    name: 'Management financier',
    assigned: ['Administrateur', 'Manageur'],
    creation: '14 Octobre 2021, 10H20'
  },
  {
    name: 'Communication client',
    assigned: ['Administrateur', 'Manageur'],
    creation: '23 Aout 2021, 2H00'
  },
  {
    name: 'Affichage seulement',
    assigned: ['Administrateur', 'Utilisateur restreint'],
    creation: '15 Avril 2021, 11H30'
  },
  {
    name: 'Planification du projet',
    assigned: ['Administrateur', 'utilisateur', 'support'],
    creation: '04 Décembre 2021, 8H15'
  },
  {
    name: "Gestion d'E-mail",
    assigned: ['Administrateur', 'utilisateur', 'support'],
    creation: '25 Février 2021, 10H30'
  },
  {
    name: 'Management support',
    assigned: ['Administrateur', 'support'],
    creation: '04 Novembre 2021, 11H45'
  }
])
</script>
<style lang="scss">
.data-table-permissions {
  .v-table .v-table__wrapper > table > tbody > tr:not(:last-child) > td,
  .v-table .v-table__wrapper > table > tbody > tr:not(:last-child) > th {
    font-weight: 400 !important;
  }
}
</style>
