import { defineStore } from 'pinia'

export const useCustomConfig = defineStore('customConfig', {
  state: () => {
    // Intentamos levantar la configuración guardada en el disco del navegador
    const datosGuardados = localStorage.getItem('inventory_core_config')
    
    return {
      // Si hay datos guardados, los parseamos; si no, dejamos el default cyberpunk
      nombreNegocio: datosGuardados ? JSON.parse(datosGuardados).nombreNegocio : 'INVENTORY',
      moduloActual: datosGuardados ? JSON.parse(datosGuardados).moduloActual : 'CONTROL',
      slogan: datosGuardados ? JSON.parse(datosGuardados).slogan : 'Acceso al Núcleo del Sistema',
      
      // Dejamos estas listas para los inputs del formulario de personalización
      rfc: datosGuardados ? JSON.parse(datosGuardados).rfc : '',
      direccion: datosGuardados ? JSON.parse(datosGuardados).direccion : '',
      telefono: datosGuardados ? JSON.parse(datosGuardados).telefono : ''
    }
  },

  actions: {
    // Acción para actualizar la configuración desde el formulario
    guardarConfiguracion(nuevaConfig) {
      this.nombreNegocio = nuevaConfig.nombreNegocio.toUpperCase() // Forzamos mayúsculas para el estilo
      this.moduloActual = nuevaConfig.moduloActual.toUpperCase()
      this.slogan = nuevaConfig.slogan
      this.rfc = nuevaConfig.rfc
      this.direccion = nuevaConfig.direccion
      this.telefono = nuevaConfig.telefono

      // Guardamos en el localStorage para que persista al recargar o compilar
      localStorage.setItem('inventory_core_config', JSON.stringify({
        nombreNegocio: this.nombreNegocio,
        moduloActual: this.moduloActual,
        slogan: this.slogan,
        rfc: this.rfc,
        direccion: this.direccion,
        telefono: this.telefono
      }))
    },

    // Por si el usuario la cajetea y quiere regresar al diseño original
    restablecerDefaults() {
      this.nombreNegocio = 'INVENTORY'
      this.moduloActual = 'CONTROL'
      this.slogan = 'Acceso al Núcleo del Sistema'
      this.rfc = ''
      this.direccion = ''
      this.telefono = ''
      localStorage.removeItem('inventory_core_config')
    }
  }
})