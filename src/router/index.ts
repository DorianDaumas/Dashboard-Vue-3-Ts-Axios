import { useAuthenticationStore } from '@/stores/Auth'
import { createRouter, createWebHistory } from 'vue-router'
import Profil from '../views/Profil.vue'
import Users from '../views/Users.vue'
import Roles from '../views/Roles.vue'
import Product from '../views/Product.vue'
import Permissions from '../views/Permissions.vue'
import Carts from '../views/Carts.vue'
import Error404 from '@/components/Common/Error404.vue'
import Dashboard from './../views/Dashboard.vue'
import Chats from '@/views/Chats.vue'
import Authentication from '@/views/Authentication.vue'
import Ecommerce from '@/views/Ecommerce.vue'

const routes = [
  {
    path: '/:pathMatch(.*)*',
    name: 'Error404',
    component: Error404
  },
  {
    path: '/',
    name: 'Home',
    component: Dashboard
  },
  {
    path: '/Authentication',
    name: 'Auth',
    component: Authentication,
    beforeEnter(to: { path: string }) {
      const auth = useAuthenticationStore()
      const isAuthenticated = auth.isLogged
      if (isAuthenticated) {
        if (to.path !== '/') {
          return '/'
        }
      }
    }
  },
  {
    path: '/Settings',
    name: 'Settings',
    component: Profil,
    beforeEnter(to: { path: string }) {
      const auth = useAuthenticationStore()
      const isAuthenticated = auth.isLogged
      if (isAuthenticated === null) {
        if (to.path !== '/') {
          return '/'
        }
      }
    }
  },
  {
    path: '/Profil',
    name: 'Profil',
    component: Profil,
    beforeEnter(to: { path: string }) {
      const auth = useAuthenticationStore()
      const isAuthenticated = auth.isLogged
      if (isAuthenticated === null) {
        if (to.path !== '/') {
          return '/'
        }
      }
    }
  },
  {
    path: '/Users/:search?',
    name: 'Utilisateurs',
    component: Users,
    beforeEnter(to: { path: string }) {
      const auth = useAuthenticationStore()
      const isAuthenticated = auth.isLogged
      if (isAuthenticated === null) {
        if (to.path !== '/') {
          return '/'
        }
      }
    }
  },
  {
    path: '/Roles',
    name: 'Roles',
    component: Roles,
    beforeEnter(to: { path: string }) {
      const auth = useAuthenticationStore()
      const isAuthenticated = auth.isLogged
      if (isAuthenticated === null) {
        if (to.path !== '/') {
          return '/'
        }
      }
    }
  },
  {
    path: '/Product/:id?',
    name: 'Produits',
    component: Product
  },
  {
    path: '/Ecommerce/:category?',
    name: 'Ecommerce',
    component: Ecommerce
  },
  {
    path: '/Permissions',
    name: 'Permissions',
    component: Permissions,
    beforeEnter(to: { path: string }) {
      const auth = useAuthenticationStore()
      const isAuthenticated = auth.isLogged
      if (isAuthenticated === null) {
        if (to.path !== '/') {
          return '/'
        }
      }
    }
  },
  {
    path: '/Panier',
    name: 'Panier',
    component: Carts,
    beforeEnter(to: { path: string }) {
      const auth = useAuthenticationStore()
      const isAuthenticated = auth.isLogged
      if (isAuthenticated === null) {
        if (to.path !== '/') {
          return '/'
        }
      }
    }
  },
  {
    path: '/Dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/Chat',
    name: 'Chat',
    component: Chats,
    beforeEnter(to: { path: string }) {
      const auth = useAuthenticationStore()
      const isAuthenticated = auth.isLogged
      if (isAuthenticated === null) {
        if (to.path !== '/') {
          return '/'
        }
      }
    }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})

export { routes }
export default router
