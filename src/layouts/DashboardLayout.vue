<template>
  <div class="min-h-screen bg-[#0d0f14] text-gray-300 font-mono flex overflow-hidden">

    <!-- SIDEBAR COLAPSABLE -->
    <aside :class="[
      isSidebarOpen ? 'w-64' : 'w-16',
      'bg-[#11141d] border-r border-cyan-500/20 transition-all duration-300 ease-in-out flex flex-col z-20'
    ]">
      <!-- Logo / Cabecera Sidebar -->
      <div class="h-16 flex items-center px-4 border-b border-cyan-500/10 justify-between">
        <span v-if="isSidebarOpen"
          class="text-xs font-bold tracking-widest text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]">
          INVENTORY.CTRL
        </span>
        <button @click="toggleSidebar"
          class="text-cyan-400 hover:text-cyan-300 cursor-pointer p-1 rounded bg-cyan-950/30 border border-cyan-500/20">
          ⚡
        </button>
      </div>

      <!-- Links de Navegación -->
      <nav class="flex-1 p-2 space-y-1">
        <router-link to="/dashboard"
          active-class="bg-cyan-950/40 border-cyan-500 text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.1)]"
          class="flex items-center space-x-3 px-3 py-2.5 rounded border border-transparent hover:bg-gray-800/50 transition-all group">
          <span class="text-sm">📊</span>
          <span v-if="isSidebarOpen" class="text-xs tracking-wider">DASHBOARD</span>
        </router-link>

        <router-link to="/dashboard/scanner"
          active-class="bg-cyan-950/40 border-cyan-500 text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.1)]"
          class="flex items-center space-x-3 px-3 py-2.5 rounded border border-transparent hover:bg-gray-800/50 transition-all group">
          <span class="text-sm">📷</span>
          <span v-if="isSidebarOpen" class="text-xs tracking-wider">ESCANER_CAM</span>
        </router-link>

        <router-link to="/dashboard/perfil"
          active-class="bg-cyan-950/40 border-cyan-500 text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.1)]"
          class="flex items-center space-x-3 px-3 py-2.5 rounded border border-transparent hover:bg-gray-800/50 transition-all group">
          <span class="text-sm">⚙️</span>
          <span v-if="isSidebarOpen" class="text-xs tracking-wider">CONFIG_USER</span>
        </router-link>
      </nav>

      <!-- Footer Sidebar -->
      <div class="p-2 border-t border-cyan-500/10" v-if="isSidebarOpen">
        <div class="text-[10px] text-gray-500 text-center uppercase tracking-widest">
          v1.0.0-cyber-alpha
        </div>
      </div>
    </aside>

    <!-- ÁREA DE CONTENIDO PRINCIPAL -->
    <div class="flex-1 flex flex-col overflow-hidden">

      <!-- NAVBAR SUPERIOR -->
      <header
        class="h-16 bg-[#11141d]/80 backdrop-blur border-b border-cyan-500/10 flex items-center justify-between px-6 z-10">
        <div>
          <!-- Espacio para títulos dinámicos o estado de red -->
          <span
            class="text-[11px] text-emerald-400 tracking-widest bg-emerald-950/30 px-2 py-1 rounded border border-emerald-500/20">
            ● ONLINE_SECURE_NODE
          </span>
        </div>

        <!-- Menú de Usuario -->
        <div class="relative">
          <button @click="isUserMenuOpen = !isUserMenuOpen"
            class="flex items-center space-x-2 text-xs text-gray-400 hover:text-cyan-400 transition-colors focus:outline-none cursor-pointer">
            <span class="bg-cyan-950 text-cyan-400 p-1.5 rounded-full border border-cyan-500/30 text-[10px]">USR</span>
            <span class="hidden md:inline">ANGEL_OCAMPO</span>
          </button>

          <!-- Dropdown Menú -->
          <div v-if="isUserMenuOpen"
            class="absolute right-0 mt-2 w-48 bg-[#11141d] border border-cyan-500/30 rounded shadow-xl py-1 z-30 font-mono text-xs">
            <div class="px-4 py-2 border-b border-cyan-500/10 text-gray-500 text-[10px]">
              SISTEMA_ROL: SUPERVISOR
            </div>
            <router-link to="/dashboard/perfil" @click="isUserMenuOpen = false"
              class="block px-4 py-2 hover:bg-cyan-950 hover:text-cyan-400 transition-colors">
              [⚙️] Ajustes Perfil
            </router-link>
            <button @click="handleLogout"
              class="w-full text-left block px-4 py-2 text-red-400 hover:bg-red-950/30 hover:text-red-300 transition-colors cursor-pointer border-t border-cyan-500/10">
              [❌] Cerrar Sesión
            </button>
          </div>
        </div>
      </header>

      <!-- CONTENIDO DE LAS VISTAS DINÁMICAS -->
      <main class="flex-1 overflow-x-hidden overflow-y-auto bg-[#0d0f14] p-6">
        <router-view />
      </main>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const isSidebarOpen = ref(true)
const isUserMenuOpen = ref(false)

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}

const handleLogout = () => {
  // Limpias tus estados simulados
  if (authStore.logout) authStore.logout()
  router.push('/')
}

</script>