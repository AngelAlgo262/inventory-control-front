import { defineStore } from 'pinia'
import apiClient from '../api/axios'
import { useCustomConfig } from './customConfig'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('auth_user')) || null,
    token: localStorage.getItem('auth_token') || null,
    loading: false,
    error: null
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
    userRoles: (state) => state.user?.roles || [],
    userPermissions: (state) => state.user?.permissions || [],
    hasPermission: (state) => (permission) => {
      return state.user?.permissions?.includes(permission) ?? false
    }
  },

  actions: {
    async login(credentials) {
      this.loading = true
      this.error = null
      const configStore = useCustomConfig()

      try {
        const response = await apiClient.post('/login', credentials)
        const { token, user, negocio } = response.data

        // Guardar en estado de Pinia
        this.token = token
        this.user = user

        // Persistir con las llaves correctas en localStorage
        localStorage.setItem('auth_token', token)
        localStorage.setItem('auth_user', JSON.stringify(user))

        configStore.setCustomConfig({
          nombreNegocio: negocio?.nombre || 'Ciberlyn',
          moduloActual: 'CTRL',
          slogan: negocio?.slogan || 'El núcleo de tus herramientas de control',
          rfc: negocio?.rfc || 'XAXX010101000',
          direccion: negocio?.direccion || 'Xochimilco, CDMX',
          telefono: negocio?.telefono || '5512345678'
        })

        return true
      } catch (err) {
        if (err.response && err.response.data && err.response.data.message) {
          this.error = err.response.data.message
        } else {
          this.error = err.message || 'Error de conexión con el servidor'
        }
        return false
      } finally {
        this.loading = false
      }
    },

    async logout() {
      const configStore = useCustomConfig()

      try {
        // 1. Primero llamamos a la API MIENTRAS el token sigue en localStorage
        await apiClient.post('/logout')
      } catch (err) {
        console.warn('Error en logout API:', err.response?.data || err.message)
      } finally {
        // 2. UNA VEZ HECHO EL LOGOUT, borramos el estado local
        this.token = null
        this.user = null
        localStorage.removeItem('auth_token')
        localStorage.removeItem('auth_user')
        configStore.limpiarConfig()
      }
    }
  }
})