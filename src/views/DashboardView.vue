<template>
  <!-- Eliminamos el min-h-screen y el fondo oscuro fijo. Usamos flex normal para centrar la tarjeta -->
  <div class="flex flex-col items-center justify-center min-h-[calc(100vh-120px)] font-sans">
    
    <!-- TARJETA: bg-white en claro, bg-[#161920] en oscuro. Bordes adaptables -->
    <div class="p-8 bg-white dark:bg-[#161920] border border-slate-200 dark:border-brand/30 rounded-2xl text-center shadow-lg shadow-slate-200/50 dark:shadow-brand/10 max-w-md w-full transition-colors duration-300">
      
      <h1 class="text-3xl font-black tracking-wider text-cyan-600 dark:text-brand mb-4">
        ACCESO CONCEDIDO
      </h1>
      
      <!-- TEXTO: text-slate-600 en claro, text-slate-400 en oscuro -->
      <p class="text-slate-600 dark:text-slate-400 mb-6 font-mono text-sm">
        Bienvenido al núcleo del sistema, Diablo.
      </p>
      
      <button 
        @click="salir" 
        class="px-6 py-2 bg-red-600 text-white dark:bg-red-600/80 dark:hover:bg-red-600 font-bold rounded-xl transition-all cursor-pointer hover:scale-105 active:scale-95"
      >
        Desconectarse
      </button>
    </div>

  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const salir = () => {
  if (authStore.logout) authStore.logout()
  router.push('/')
}
</script>