import { createApp } from 'vue'
import { createPinia } from 'pinia'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'
import '@fortawesome/fontawesome-free/css/all.css'
import axios from 'axios'
import App from './App.vue'
import router from './router'
import { useThemeStore } from './stores/App'
import { useAuthenticationStore } from './stores/Auth'

// Gestion des tokens sur les routes
const pendingRequests = []
// Check l'existance du token
axios.interceptors.request.use(
  (config) => {
    const token = JSON.parse(localStorage.getItem('token')!)
    if (token) {
      config.headers.Authorization = `Bearer ${token.accessToken}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    // Rafraichi le token quand il expire et ajoute les routes qui n'ont pas pu être résolue en file d'attente
    // lorsque le token est rafraichi, relance toutes les requests qui était dans la file d'attente
    if (error.response && error.response.status === 401) {
      const originalRequest = error.config
      addPendingRequest(originalRequest)

      const storage = JSON.parse(localStorage.getItem('token')!)
      return useAuthenticationStore()
        .refreshToken(storage.refreshToken, 5)
        .then((data) => {
          if (data !== null) {
            const token = {
              accessToken: data?.content?.accessToken,
              refreshToken: data?.content?.refreshToken
            }
            localStorage.setItem('token', JSON.stringify(token))
          }
          const newToken = JSON.parse(localStorage.getItem('token')!).accessToken

          // Retenter la requête avec le nouveau token
          originalRequest.headers.Authorization = `Bearer ${newToken.accessToken}`
          return axios(originalRequest)
        })
        .catch((err) => {
          // Gérer l'erreur de rafraîchissement du token
          console.error('Erreur lors du rafraîchissement du token:', err)
          return Promise.reject(error)
        })
    }
    return Promise.reject(error)
  }
)

const addPendingRequest = (config: any) => {
  pendingRequests.push(config)
}

const app = createApp(App)
app.use(createPinia())
const themeStore = useThemeStore()

const vuetify = createVuetify({
  components,
  icons: {
    defaultSet: 'mdi'
  },
  theme: {
    defaultTheme: 'lightTheme',
    themes: {
      lightTheme: {
        dark: themeStore.theme
      }
    }
  },
  directives
})
app.use(router)
app.use(vuetify)
app.mount('#app')
