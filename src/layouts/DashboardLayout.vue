<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useCustomConfig } from '../stores/customConfig'
// Importar iconos
import {
  LayoutDashboard,
  Camera,
  User,
  Menu,
  X,
  LogOut,
  Sun,
  Moon,
  ShieldCheck
} from 'lucide-vue-next'

const router = useRouter()
const authStore = useAuthStore()
const configStore = useCustomConfig()

// Estados de interfaz
const isSidebarOpen = ref(false) // Cerrado por defecto en móviles
const isUserMenuOpen = ref(false)
const isDarkMode = ref(true)

// Control de Tema Claro / Oscuro (Sincronizado con localStorage)
const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value
  if (isDarkMode.value) {
    document.documentElement.classList.add('dark')
    localStorage.setItem('theme', 'dark')
  } else {
    document.documentElement.classList.remove('dark')
    localStorage.setItem('theme', 'light')
  }
}

onMounted(() => {
  // Recuperar preferencia de tema
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme === 'light') {
    isDarkMode.value = false
    document.documentElement.classList.remove('dark')
  } else {
    isDarkMode.value = true
    document.documentElement.classList.add('dark')
  }
})

const handleLogout = () => {
  if (authStore.logout) authStore.logout()
  router.push('/login')
}
</script>

<template>
  <!-- CONTENEDOR PRINCIPAL: bg-slate-100 para modo claro / dark:bg-[#0d0f14] para oscuro -->
  <div
    class="min-h-screen bg-slate-100 dark:bg-[#0d0f14] text-slate-800 dark:text-gray-300 font-mono flex overflow-hidden transition-colors duration-300">

    <!-- OVERLAY PARA MÓVIL -->
    <div v-if="isSidebarOpen" @click="isSidebarOpen = false"
      class="fixed inset-0 bg-black/60 backdrop-blur-xs z-30 lg:hidden"></div>

    <!-- Al hacer clic en cualquier lado, el menú de usuario se cierra -->
    <div v-if="isUserMenuOpen" @click="isUserMenuOpen = false" class="fixed inset-0 z-30 bg-transparent cursor-default">
    </div>

    <!-- SIDEBAR RESPONSIVO: bg-slate-200 para claro / dark:bg-[#11141d] para oscuro -->
    <aside :class="[
      isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
      'fixed lg:static inset-y-0 left-0 w-64 bg-slate-200 dark:bg-[#11141d] border-r border-slate-300 dark:border-cyan-500/20 transition-all duration-300 flex flex-col z-40'
    ]">
      <!-- Cabecera Sidebar -->
      <div class="h-16 flex items-center px-4 border-b border-slate-300 dark:border-cyan-500/10 justify-between">
        <span
          class="text-xs font-bold tracking-widest text-slate-800 dark:text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.4)]">
          INVENTORY.CTRL
        </span>
        <button @click="isSidebarOpen = false"
          class="lg:hidden text-slate-600 dark:text-cyan-400 hover:text-cyan-300 cursor-pointer p-1 rounded bg-slate-300/50 dark:bg-cyan-950/30 border border-slate-400 dark:border-cyan-500/20">
          <X class="w-4 h-4" />
        </button>
      </div>

      <!-- Links de Navegación con soporte a modo claro -->
      <nav class="flex-1 p-3 space-y-1">
        <router-link to="/dashboard" @click="isSidebarOpen = false"
          active-class="bg-slate-300/80 dark:bg-cyan-950/30 border-slate-400 dark:border-cyan-500/50 text-slate-900 dark:text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.05)]"
          class="flex items-center space-x-3 px-3 py-2.5 rounded-md border border-transparent hover:bg-slate-300/40 dark:hover:bg-gray-800/40 transition-all text-xs tracking-wider">
          <LayoutDashboard class="w-4.5 h-4.5 stroke-[1.5]" />
          <span>DASHBOARD</span>
        </router-link>

        <router-link to="/dashboard/scanner" @click="isSidebarOpen = false"
          active-class="bg-slate-300/80 dark:bg-cyan-950/30 border-slate-400 dark:border-cyan-500/50 text-slate-900 dark:text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.05)]"
          class="flex items-center space-x-3 px-3 py-2.5 rounded-md border border-transparent hover:bg-slate-300/40 dark:hover:bg-gray-800/40 transition-all text-xs tracking-wider">
          <Camera class="w-4.5 h-4.5 stroke-[1.5]" />
          <span>ESCANER_CAM</span>
        </router-link>

        <router-link to="/dashboard/perfil" @click="isSidebarOpen = false"
          active-class="bg-slate-300/80 dark:bg-cyan-950/30 border-slate-400 dark:border-cyan-500/50 text-slate-900 dark:text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.05)]"
          class="flex items-center space-x-3 px-3 py-2.5 rounded-md border border-transparent hover:bg-slate-300/40 dark:hover:bg-gray-800/40 transition-all text-xs tracking-wider">
          <User class="w-4.5 h-4.5 stroke-[1.5]" />
          <span>CONFIG_USER</span>
        </router-link>
      </nav>

      <!-- Footer Sidebar -->
      <div class="p-3 border-t border-slate-300 dark:border-cyan-500/10">
        <div class="text-[9px] text-slate-500 dark:text-gray-600 text-center uppercase tracking-widest font-mono">
          v1.0.0-cyber-alpha
        </div>
      </div>
    </aside>

    <!-- ÁREA DE CONTENIDO PRINCIPAL -->
    <div class="flex-1 flex flex-col overflow-hidden w-full">

      <!-- NAVBAR SUPERIOR: bg-white para claro / dark:bg-[#11141d]/80 para oscuro -->
      <header
        class="h-16 bg-white dark:bg-[#11141d]/80 backdrop-blur border-b border-slate-200 dark:border-cyan-500/10 flex items-center justify-between px-4 lg:px-6 z-20 transition-colors duration-300">

        <!-- Botón de apertura lateral (Móvil) -->
        <button @click="isSidebarOpen = true"
          class="lg:hidden text-slate-600 dark:text-cyan-400 hover:text-cyan-300 cursor-pointer p-1.5 rounded bg-slate-100 dark:bg-cyan-950/30 border border-slate-300 dark:border-cyan-500/20">
          <Menu class="w-5 h-5" />
        </button>

        <div class="hidden sm:block">
          <span
            class="text-[10px] text-emerald-600 dark:text-emerald-400 tracking-widest bg-emerald-100 dark:bg-emerald-950/30 px-2 py-1 rounded border border-emerald-300 dark:border-emerald-500/20 font-mono">
            ● ONLINE_SECURE_NODE
          </span>
        </div>

        <!-- Menú de Usuario -->
        <div class="relative">

          <!-- BOTÓN DEL PERFIL -->
          <button @click="isUserMenuOpen = !isUserMenuOpen"
            class="relative z-30 flex items-center space-x-2 text-xs text-slate-600 dark:text-gray-400 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors focus:outline-none cursor-pointer">
            <div
              class="bg-slate-100 dark:bg-cyan-950 text-slate-600 dark:text-cyan-400 p-1.5 rounded-full border border-slate-300 dark:border-cyan-500/30">
              <User class="w-3.5 h-3.5" />
            </div>
            <span class="hidden md:inline uppercase font-bold">Angel Ocampo</span>
          </button>

          <!-- DROPDOWN MENÚ (Con z-30 para quedar por encima de la capa invisible) -->
          <div v-if="isUserMenuOpen"
            class="absolute right-0 mt-2 w-56 bg-white dark:bg-[#11141d] border border-slate-200 dark:border-cyan-500/30 rounded shadow-2xl py-2 z-30 font-mono text-xs text-slate-800 dark:text-gray-300">
            <div
              class="px-4 py-2 border-b border-slate-100 dark:border-cyan-500/10 text-slate-400 dark:text-gray-500 text-[9px] tracking-widest">
              SISTEMA_ROL: SUPERVISOR
            </div>

            <!-- ENLACE AL PERFIL -->
            <router-link to="/dashboard/perfil" @click="isUserMenuOpen = false"
              class="flex items-center space-x-2 px-4 py-2.5 hover:bg-slate-100 dark:hover:bg-cyan-950/50 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
              <ShieldCheck class="w-4 h-4 text-cyan-600 dark:text-cyan-500 stroke-[1.5]" />
              <span>Ajustes Seguridad</span>
            </router-link>

            <!-- SWITCH DE TEMA -->
            <button @click="toggleTheme"
              class="w-full text-left flex items-center justify-between px-4 py-2.5 hover:bg-slate-100 dark:hover:bg-cyan-950/50 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors cursor-pointer">
              <span class="flex items-center space-x-2">
                <Sun v-if="isDarkMode" class="w-4 h-4 text-amber-500 stroke-[1.5]" />
                <Moon v-else class="w-4 h-4 text-slate-500 dark:text-cyan-400 stroke-[1.5]" />
                <span>{{ isDarkMode ? 'Modo Claro' : 'Modo Oscuro' }}</span>
              </span>
              <span
                class="text-[9px] bg-slate-100 dark:bg-gray-800 text-slate-500 dark:text-gray-400 px-1.5 py-0.5 rounded uppercase">
                {{ isDarkMode ? 'DARK' : 'LIGHT' }}
              </span>
            </button>

            <!-- CERRAR SESIÓN -->
            <button @click="handleLogout"
              class="w-full text-left flex items-center space-x-2 px-4 py-2.5 text-red-500 dark:text-red-400 hover:bg-slate-100 dark:hover:bg-red-950/30 hover:text-red-600 dark:hover:text-red-300 transition-colors cursor-pointer border-t border-slate-100 dark:border-cyan-500/10">
              <LogOut class="w-4 h-4 stroke-[1.5]" />
              <span>Cerrar Sesión</span>
            </button>
          </div>

        </div>
      </header>

      <!-- CONTENIDO DINÁMICO: bg-slate-50 para claro / dark:bg-[#0d0f14] para oscuro -->
      <main
        class="flex-1 overflow-x-hidden overflow-y-auto bg-slate-50 dark:bg-[#0d0f14] p-4 lg:p-6 transition-colors duration-300">
        <router-view />
      </main>

    </div>
  </div>
</template>