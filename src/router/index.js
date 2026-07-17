import { createRouter, createWebHashHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import DashboardLayout from '../layouts/DashboardLayout.vue'
import DashboardView from '../views/DashboardView.vue'
import ScannerView from '../views/ScannerView.vue'
import ProfileView from '../views/ProfileView.vue'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/dashboard',
    component: DashboardLayout, // El layout envuelve a todos los de abajo
    children: [
      {
        path: '', // Se carga por defecto al entrar a /dashboard
        name: 'dashboard',
        component: DashboardView
      },
      {
        path: 'scanner',
        name: 'scanner',
        component: ScannerView
      },
      {
        path: 'perfil',
        name: 'profile',
        component: ProfileView
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/login'
  }
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL), //lee automáticamente  base de tu vite.config.js tanto en desarrollo como en producción.
  routes
})

// Guardián global para cambiar el título de la pestaña automáticamente
router.beforeEach((to, from, next) => {
  const baseTitle = 'inventory-ctrl'
  document.title = to.meta.title ? `${to.meta.title} | ${baseTitle}` : baseTitle
  next()
})

export default router