import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useThemeStore = defineStore('app', () => {
  const theme = ref(true)
  const drawer = ref(true)

  const switchDrawer = () => {
    drawer.value = !drawer.value
  }

  const switchTheme = () => {
    theme.value = !theme.value
  }

  return { switchDrawer, switchTheme, theme, drawer }
})
