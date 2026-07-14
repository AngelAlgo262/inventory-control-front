import { createRouter, createWebHashHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import DashboardView from '../views/DashboardView.vue'

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView,
    meta: { title: 'Login' }
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardView,
    meta: { title: 'Panel de Control' }
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