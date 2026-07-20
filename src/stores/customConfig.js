import { defineStore } from 'pinia'

export const useCustomConfig = defineStore('customConfig', {
  state: () => {
    // Parseamos una sola vez al inicio
    const rawData = localStorage.getItem('inventory_core_config')
    const datos = rawData ? JSON.parse(rawData) : null

    return {
      // Si hay datos guardados los cargamos, si no, los defaults estéticos
      nombreUser: datos?.nombreUser || 'Demo',
      userRol: datos?.userRol || 'Invitado',
      emailUser: datos?.emailUser || 'demo@ic.com',
      nombreNegocio: datos?.nombreNegocio || 'INVENTORY',
      nomSucursal: datos?.nomSucursal || 'CONTROL',
      slogan: datos?.slogan || 'Acceso al Núcleo del Sistema',
      rfc: datos?.rfc || '',
      direccion: datos?.direccion || '',
      telefono: datos?.telefono || ''
    }
  },

  actions: {
    // ESTA ACCIÓN SE LLAMA JUSTO EN EL LOGIN exitoso
    setCustomConfig(dataBackend) {
      // Mapeamos lo que te mande tu API Web
      this.nombreUser = dataBackend.nombreUser || 'Demo',
      this.userRol = dataBackend.userRol || 'Invitado',
      this.emailUser = dataBackend.emailUser || 'demo@ic.com'
      this.nombreNegocio = (dataBackend.nombreNegocio || 'INVENTORY').toUpperCase()
      this.nomSucursal = (dataBackend.nomSucursal || 'CONTROL').toUpperCase()
      this.slogan = dataBackend.slogan || 'Acceso al Núcleo del Sistema'
      this.rfc = dataBackend.rfc || ''
      this.direccion = dataBackend.direccion || ''
      this.telefono = dataBackend.telefono || ''

      // Guardamos la sesión del negocio en el disco local
      localStorage.setItem('inventory_core_config', JSON.stringify({
        nombreUser: this.nombreUser,
        userRol: this.userRol,
        emailUser: this.emailUser,
        nombreNegocio: this.nombreNegocio,
        nomSucursal: this.nomSucursal,
        slogan: this.slogan,
        rfc: this.rfc,
        direccion: this.direccion,
        telefono: this.telefono
      }))
    },

    // Cuando el usuario actualiza manualmente el perfil desde el formulario
    guardarConfiguracion(nuevaConfig) {
      this.setCustomConfig(nuevaConfig)
    },

    // Seguridad: Si cierran sesión, limpiamos el estado del negocio
    limpiarConfig() {
      this.nombreNegocio = 'INVENTORY'
      this.nomSucursal = 'CONTROL'
      this.slogan = 'Acceso al Núcleo del Sistema'
      this.rfc = ''
      this.direccion = ''
      this.telefono = ''
      localStorage.removeItem('inventory_core_config')
    }
  }
})