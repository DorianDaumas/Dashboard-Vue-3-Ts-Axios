<template>
  <div style="background: transparent">
    <v-layout row wrap v-if="$vuetify.display.mdAndDown">
      <v-navigation-drawer
        color="#27293d"
        style="z-index: 9999"
        v-model="model"
        location="left"
        width="300"
      >
        <DesktopMenu :message="message"></DesktopMenu>
      </v-navigation-drawer>
    </v-layout>
  </div>
</template>
<script setup lang="ts">
import { defineModel, inject } from 'vue'
import DesktopMenu from './DesktopMenu.vue'
import type { messageType } from './messageType'

const message = inject<messageType>('message')
const model = defineModel<boolean>()
</script>
<style lang="scss" scoped></style>
