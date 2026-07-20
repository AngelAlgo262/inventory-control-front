<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useCustomConfig } from '../stores/customConfig'

const router = useRouter()
const authStore = useAuthStore()
const configStore = useCustomConfig()

// Control del estado de edición del bloque 1
const isEditing = ref(false)

// Estado del formulario de datos generales
const form = ref({
  nombreUser: configStore.nombreUser || 'Angel Ocampo',
  userRol: authStore.userRol || 'Root', 
  emailUser: 'angel.ocampo@demo.com', 
  nombreNegocio: configStore.nombreNegocio || 'Inforserveis S.A.', 
  nomSucursal: configStore.nomSucursal || '001',
  slogan: configStore.slogan || 'Sistemas Dinámicos Automotrices',
  rfc: configStore.rfc || '',
  direccion: configStore.direccion || 'Xochimilco, CDMX',
  telefono: configStore.telefono || ''
})

// 🎯 Estado para el cambio de contraseña
const passwordForm = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

const isCurrentPasswordValid = ref(false)

// Monitoreamos la contraseña actual para habilitar/deshabilitar los nuevos campos
watch(() => passwordForm.value.currentPassword, (newVal) => {
  // En producción, aquí podrías meter un debounce o validación reactiva.
  // Por ahora, si tiene texto, abrimos la posibilidad de cambiarla.
  isCurrentPasswordValid.value = newVal.length > 0

  if (!isCurrentPasswordValid.value) {
    passwordForm.value.newPassword = ''
    passwordForm.value.confirmPassword = ''
  }
})

const toggleEdit = () => {
  isEditing.value = !isEditing.value
}

const setGenericRFC = () => {
  if (isEditing.value) {
    form.value.rfc = 'XAXX010101000'
  }
}

const saveProfile = () => {
  isEditing.value = false
  console.log('Datos guardados:', form.value)
}

// Acción para procesar la contraseña
const handleUpdatePassword = () => {
  if (passwordForm.value.newPassword !== passwordForm.value.confirmPassword) {
    alert('Las contraseñas criptográficas no coinciden')
    return
  }
  console.log('Enviando actualización de password al núcleo...', passwordForm.value)
  // Limpiamos el formulario al terminar
  passwordForm.value.currentPassword = ''
  passwordForm.value.newPassword = ''
  passwordForm.value.confirmPassword = ''
}
</script>

<template>
  <div class="max-w-4xl space-y-6">
    <div>
      <h1 class="text-xl font-bold tracking-widest text-cyan-400">[NÚCLEO_CONFIGURACION_PERFIL]</h1>
      <p class="text-xs text-gray-500 mt-1">
        Administración de credenciales de acceso y capas de seguridad biométrica.
      </p>
    </div>

    <!-- Bloque 1: Datos de Usuario -->
    <div class="bg-[#11141d] border border-cyan-500/10 p-6 rounded-lg space-y-4 relative">
      
      <div class="flex items-center justify-between border-b border-gray-800/60 pb-3">
        <div class="flex items-center gap-2">
          <User class="w-4 h-4 text-gray-400" />
          <h2 class="text-sm font-bold tracking-wider text-gray-300">DATOS_DE_CUENTA</h2>
        </div>
        
        <button 
          @click="isEditing ? saveProfile() : toggleEdit()"
          :class="isEditing 
            ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-900' 
            : 'bg-cyan-950/40 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-900'"
          class="flex items-center gap-1.5 px-3 py-1 text-[11px] rounded transition-all cursor-pointer font-mono"
        >
          <Edit2 class="w-3 h-3" v-if="!isEditing" />
          <span>{{ isEditing ? 'GUARDAR_CAMBIOS' : 'EDITAR_PERFIL' }}</span>
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <!-- NOMBRE OPERADOR -->
        <div>
          <label class="block text-gray-500 mb-1">NOMBRE_OPERADOR</label>
          <input 
            type="text" 
            v-model="form.nombreUser" 
            :disabled="!isEditing"
            class="w-full bg-black/50 border border-gray-800 text-gray-300 p-2.5 rounded font-mono outline-none disabled:text-gray-500 disabled:cursor-not-allowed focus:border-cyan-500/50"
          >
        </div>

        <!-- USER ROL -->
        <div>
          <label class="block text-gray-500 mb-1">USER_ROL (SISTEMA)</label>
          <input 
            type="text" 
            v-model="form.userRol" 
            disabled
            class="w-full bg-black/50 border border-gray-800 text-gray-300 p-2.5 rounded font-mono outline-none disabled:text-gray-500 disabled:cursor-not-allowed focus:border-cyan-500/50"
          >
        </div>

        <!-- EMAIL USER -->
        <div>
          <label class="block text-gray-500 mb-1">EMAIL_USER (SISTEMA)</label>
          <input 
            type="email" 
            v-model="form.emailUser" 
            disabled
            class="w-full bg-black/30 border border-gray-900 text-gray-600 p-2.5 rounded font-mono outline-none cursor-not-allowed"
          >
        </div>

        <!-- NOMBRE NEGOCIO -->
        <div>
          <label class="block text-gray-500 mb-1">NOMBRE_NEGOCIO</label>
          <input 
            type="text" 
            v-model="form.nombreNegocio" 
            :disabled="!isEditing"
            class="w-full bg-black/50 border border-gray-800 text-gray-300 p-2.5 rounded font-mono outline-none disabled:text-gray-500 disabled:cursor-not-allowed focus:border-cyan-500/50"
          >
        </div>

        <!-- NUM SUCURSAL -->
        <div>
          <label class="block text-gray-500 mb-1">NOM_SUCURSAL</label>
          <input 
            type="text" 
            v-model="form.nomSucursal" 
            :disabled="!isEditing"
            class="w-full bg-black/50 border border-gray-800 text-gray-300 p-2.5 rounded font-mono outline-none disabled:text-gray-500 disabled:cursor-not-allowed focus:border-cyan-500/50"
          >
        </div>

        <!-- SLOGAN -->
        <div>
          <label class="block text-gray-500 mb-1">SLOGAN</label>
          <input 
            type="text" 
            v-model="form.slogan" 
            :disabled="!isEditing"
            class="w-full bg-black/50 border border-gray-800 text-gray-300 p-2.5 rounded font-mono outline-none disabled:text-gray-500 disabled:cursor-not-allowed focus:border-cyan-500/50"
          >
        </div>

        <!-- RFC -->
        <div>
          <div class="flex justify-between items-center mb-1">
            <label class="text-gray-500">RFC</label>
            <button 
              v-if="isEditing" 
              @click="setGenericRFC" 
              type="button"
              class="text-[10px] text-cyan-400 hover:underline cursor-pointer"
            >
              No tengo RFC
            </button>
          </div>
          <input 
            type="text" 
            v-model="form.rfc" 
            :disabled="!isEditing"
            placeholder="XAXX010101000"
            class="w-full bg-black/50 border border-gray-800 text-gray-300 p-2.5 rounded font-mono outline-none disabled:text-gray-500 disabled:cursor-not-allowed focus:border-cyan-500/50 uppercase"
          >
        </div>

        <!-- TELEFONO -->
        <div>
          <label class="block text-gray-500 mb-1">TELEFONO</label>
          <input 
            type="text" 
            v-model="form.telefono" 
            :disabled="!isEditing"
            class="w-full bg-black/50 border border-gray-800 text-gray-300 p-2.5 rounded font-mono outline-none disabled:text-gray-500 disabled:cursor-not-allowed focus:border-cyan-500/50"
          >
        </div>

        <!-- DIRECCION -->
        <div class="md:col-span-2">
          <label class="block text-gray-500 mb-1">DIRECCION</label>
          <input 
            type="text" 
            v-model="form.direccion" 
            :disabled="!isEditing"
            class="w-full bg-black/50 border border-gray-800 text-gray-300 p-2.5 rounded font-mono outline-none disabled:text-gray-500 disabled:cursor-not-allowed focus:border-cyan-500/50"
          >
        </div>
      </div>
    </div>

    <!-- Bloque 2: Seguridad y Contraseña -->
    <div class="bg-[#11141d] border border-cyan-500/10 p-6 rounded-lg space-y-6">
      <div class="flex items-center gap-2 border-b border-gray-800/60 pb-3">
        <ShieldCheck class="w-4 h-4 text-red-400" />
        <h2 class="text-sm font-bold tracking-wider text-red-400">PROTOCOLOS_DE_SEGURIDAD</h2>
      </div>

      <!-- 🎯 SECCIÓN DINÁMICA: CAMBIO DE CONTRASEÑA -->
      <div class="p-4 bg-black/40 border border-gray-800 rounded space-y-4">
        <div class="flex items-center gap-2 text-xs font-bold text-gray-300 border-b border-gray-900 pb-2">
          <span>🔑 MODIFICAR_ACCESO_PASSWORD</span>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <!-- Password Actual -->
          <div>
            <label class="block text-gray-500 mb-1">PASSWORD_ACTUAL</label>
            <input 
              type="password" 
              v-model="passwordForm.currentPassword"
              placeholder="••••••••"
              class="w-full bg-black/50 border border-gray-800 text-gray-300 p-2.5 rounded font-mono outline-none focus:border-red-500/40"
            >
          </div>

          <!-- Nuevo Password -->
          <div>
            <label class="block text-gray-500 mb-1" :class="{'text-gray-700': !isCurrentPasswordValid}">NUEVO_PASSWORD</label>
            <input 
              type="password" 
              v-model="passwordForm.newPassword"
              placeholder="••••••••"
              :disabled="!isCurrentPasswordValid"
              class="w-full bg-black/50 border border-gray-800 text-gray-300 p-2.5 rounded font-mono outline-none disabled:text-gray-700 disabled:bg-black/20 disabled:border-gray-900 disabled:cursor-not-allowed focus:border-cyan-500/50"
            >
          </div>

          <!-- Confirmar Password -->
          <div>
            <label class="block text-gray-500 mb-1" :class="{'text-gray-700': !isCurrentPasswordValid}">CONFIRMAR_NUEVO_PASSWORD</label>
            <input 
              type="password" 
              v-model="passwordForm.confirmPassword"
              placeholder="••••••••"
              :disabled="!isCurrentPasswordValid"
              class="w-full bg-black/50 border border-gray-800 text-gray-300 p-2.5 rounded font-mono outline-none disabled:text-gray-700 disabled:bg-black/20 disabled:border-gray-900 disabled:cursor-not-allowed focus:border-cyan-500/50"
            >
          </div>
        </div>

        <!-- Botón de ejecución para Password -->
        <div class="flex justify-end" v-if="isCurrentPasswordValid">
          <button
            @click="handleUpdatePassword"
            class="bg-red-950/40 text-red-400 border border-red-500/30 hover:bg-red-900 hover:text-white px-4 py-2 text-[10px] rounded transition-all cursor-pointer font-mono font-bold"
          >
            CAMBIAR_PASSWORD
          </button>
        </div>
      </div>

      <!-- 2FA MOCK -->
      <div class="flex items-start justify-between p-4 bg-black/40 border border-gray-800 rounded">
        <div class="space-y-1">
          <div class="text-xs font-bold text-gray-300">Autenticación en Dos Pasos (2FA)</div>
          <div class="text-[11px] text-gray-500">
            Agrega una capa criptográfica extra solicitando un token temporal al ingresar.
          </div>
        </div>
        <button
          class="bg-red-950/40 text-red-400 border border-red-500/30 hover:bg-red-900 hover:text-white px-3 py-1.5 text-[10px] rounded transition-all cursor-pointer font-mono"
        >
          ACTIVAR_MFA
        </button>
      </div>

      <!-- BIOMETRÍA MOCK -->
      <div class="flex items-start justify-between p-4 bg-black/40 border border-gray-800 rounded">
        <div class="space-y-1">
          <div class="text-xs font-bold text-gray-300">Acceso Biométrico / Huella Digital</div>
          <div class="text-[11px] text-gray-500">
            Permite firmar el inicio de sesión utilizando el sensor local del dispositivo (WebAuthn).
          </div>
        </div>
        <button
          class="bg-cyan-950/40 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-900 hover:text-white px-3 py-1.5 text-[10px] rounded transition-all cursor-pointer font-mono"
        >
          VINCULAR_SENSOR
        </button>
      </div>
    </div>
  </div>
</template>