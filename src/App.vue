<template>
  <div class="min-h-screen bg-[#0d0f14] text-slate-100 flex items-center justify-center font-sans antialiased selection:bg-[#00ffcc] selection:text-black">
    <!-- Contenedor del Login -->
    <div class="w-full max-w-md p-8 sm:p-10 bg-[#161920]/80 backdrop-blur-md rounded-2xl border border-slate-800 shadow-[0_0_50px_-12px_rgba(0,255,204,0.15)] relative overflow-hidden group">
      
      <!-- Efecto de brillo de neón superior -->
      <div class="absolute -top-10 -left-10 w-40 h-40 bg-[#00ffcc]/10 rounded-full blur-3xl group-hover:bg-[#00ffcc]/20 transition-all duration-700"></div>

      <!-- Encabezado -->
      <div class="text-center mb-8 relative z-10">
        <h1 class="text-3xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-[#00ffcc]">
          INVENTORY<span class="text-[#00ffcc]">.</span>CONTROL
        </h1>
        <p class="text-xs text-slate-500 mt-2 tracking-widest uppercase">Acceso al Núcleo del Sistema</p>
      </div>

      <!-- Formulario -->
      <form @submit.prevent="handleLogin" class="space-y-6 relative z-10">
        
        <!-- Campo: Usuario -->
        <div class="space-y-2">
          <label class="text-xs font-semibold uppercase tracking-wider text-slate-400">Usuario / Email</label>
          <div class="relative">
            <input 
              v-model="form.email"
              type="text" 
              placeholder="angelo.ocampo@core.com"
              class="w-full px-4 py-3 bg-[#1e2330] border border-slate-700 rounded-xl focus:outline-none focus:border-[#00ffcc] focus:ring-1 focus:ring-[#00ffcc] text-slate-200 placeholder-slate-600 transition-all duration-300"
            />
          </div>
        </div>

        <!-- Campo: Contraseña -->
        <div class="space-y-2">
          <div class="flex justify-between items-center">
            <label class="text-xs font-semibold uppercase tracking-wider text-slate-400">Contraseña</label>
            <a href="#" class="text-xs text-[#00ffcc]/70 hover:text-[#00ffcc] transition-colors">¿Olvidaste la clave?</a>
          </div>
          <div class="relative">
            <input 
              v-model="form.password"
              type="password" 
              placeholder="••••••••••••"
              class="w-full px-4 py-3 bg-[#1e2330] border border-slate-700 rounded-xl focus:outline-none focus:border-[#00ffcc] focus:ring-1 focus:ring-[#00ffcc] text-slate-200 placeholder-slate-600 transition-all duration-300"
            />
          </div>
        </div>

        <!-- Botón de Entrada -->
        <button 
          type="submit"
          class="w-full py-3.5 mt-2 bg-gradient-to-r from-[#00b386] to-[#00ffcc] text-black font-bold rounded-xl shadow-[0_4px_20px_rgba(0,255,204,0.3)] hover:shadow-[0_4px_30px_rgba(0,255,204,0.5)] active:scale-[0.98] transition-all duration-200 cursor-pointer uppercase tracking-wider text-sm"
        >
          Iniciar Sesión
        </button>

      </form>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const form = ref({
  email: '',
  password: ''
})

const handleLogin = () => {
  console.log('Intentando conectar al núcleo con:', form.value)
  // Aquí meteremos Axios más adelante para pegarle al back en Laravel
}
</script>