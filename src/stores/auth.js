import { defineStore } from 'pinia'
import axios from 'axios'
import { useCustomConfig } from './customConfig'

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
      
      // Instanciamos el store aquí adentro, justo cuando se ejecuta la acción
      const configStore = useCustomConfig()

      try {
        // --- CÓDIGO REAL PARA CUANDO EL BACKEND ESTÉ VIVO ---
        /*
        const response = await axios.post(`${API_URL}/login`, credentials)
        const { token, user, negocio } = response.data
        
        this.token = token
        this.user = user
        localStorage.setItem('auth_token', token)
        
        // Sincronizamos los datos del negocio reales que vengan del backend
        configStore.setEstrategiaConfig({
          nombreNegocio: negocio.nombre,
          moduloActual: 'CTRL',
          slogan: negocio.slogan,
          rfc: negocio.rfc,
          direccion: negocio.direccion,
          telefono: negocio.telefono
        })
        return true
        */
        // ---------------------------------------------------

        // --- SIMULACIÓN DE LOGIN PARA DESPLIEGUE EN GH-PAGES ---
        await new Promise(resolve => setTimeout(resolve, 1000)) // Simula lag de red
        
        if (credentials.email === 'demo@ic.com' && credentials.password === 'Demo.123') {
          const fakeToken = 'cyber_jwt_token_xyz123'
          this.token = fakeToken
          this.user = { name: 'Demo', role: 'Root' }
          localStorage.setItem('auth_token', fakeToken)
          
          // Inyectamos la data simulada para que rule en GH Pages al 100%
          configStore.setCustomConfig({
            nombreNegocio: 'Ciberlyn',
            moduloActual: 'INVENTORY',
            slogan: 'El núcleo de tus herramientas de control',
            rfc: 'XAXX010101000',
            direccion: 'Xochimilco, CDMX',
            telefono: '5512345678'
          })
          
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
      // También traemos el store aquí para limpiar todo el entorno al salir
      const configStore = useCustomConfig()
      
      this.token = null
      this.user = null
      localStorage.removeItem('auth_token')
      
      // Desmantelamos la configuración local para que no quede data expuesta
      configStore.limpiarConfig()
    }
  }
})