<template>
  <div class="min-h-screen bg-[#0d0f14] text-white flex flex-col items-center justify-center font-sans">
    <div class="p-8 bg-[#161920] border border-brand/30 rounded-2xl text-center shadow-lg shadow-brand/10">
      <h1 class="text-3xl font-black tracking-wider text-brand mb-4">ACCESO CONCEDIDO</h1>
      <p class="text-slate-400 mb-6">Bienvenido al núcleo del sistema, Diablo.</p>
      <button @click="salir" class="px-6 py-2 bg-red-600/80 hover:bg-red-600 text-white font-bold rounded-xl transition-all cursor-pointer">
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
  authStore.logout()
  router.push('/')
}
</script>