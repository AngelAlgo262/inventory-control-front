import { defineStore } from 'pinia'
import axios from 'axios'

// Configuración base de Axios apuntando a lo que será tu backend
// Cuando estemos en desarrollo usará localhost, en producción apuntará a Railway/Render
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('auth_token') || null,
    loading: false,
    error: null
  }),

  getters: {
    isAuthenticated: (state) => !!state.token
  },

  actions: {
    async login(credentials) {
      this.loading = true
      this.error = null
      try {
        // Dejamos la petición lista para cuando el backend esté vivo
        // const response = await axios.post(`${API_URL}/login`, credentials)
        
        // --- SIMULACIÓN DE LOGIN PARA DESPLIEGUE EN GH-PAGES ---
        await new Promise(resolve => setTimeout(resolve, 1000)) // Simula lag de red
        if (credentials.email === 'demo@ic.com' && credentials.password === 'Demo.123') {
          const fakeToken = 'cyber_jwt_token_xyz123'
          this.token = fakeToken
          this.user = { name: 'Angel Ocampo', role: 'Root' }
          localStorage.setItem('auth_token', fakeToken)
          return true
        } else {
          throw new Error('Credenciales inválidas en el núcleo.')
        }
        // --------------------------------------------------------
        
      } catch (err) {
        this.error = err.message || 'Error de conexión'
        return false
      } finally {
        this.loading = false
      }
    },

    logout() {
      this.token = null
      this.user = null
      localStorage.removeItem('auth_token')
    }
  }
})