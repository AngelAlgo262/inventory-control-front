<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useCustomConfig } from '../stores/customConfig'
// Importamos los iconos de contorno estilo starter-kit
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
  <div class="min-h-screen bg-[#0d0f14] dark:bg-[#0d0f14] text-gray-300 font-mono flex overflow-hidden">
    
    <!-- OVERLAY PARA MÓVIL (Cierra la barra al dar clic fuera) -->
    <div 
      v-if="isSidebarOpen" 
      @click="isSidebarOpen = false"
      class="fixed inset-0 bg-black/60 backdrop-blur-xs z-30 lg:hidden"
    ></div>

    <!-- SIDEBAR RESPONSIVO -->
    <aside 
      :class="[
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
        'fixed lg:static inset-y-0 left-0 w-64 bg-[#11141d] border-r border-cyan-500/20 transition-transform duration-300 ease-in-out flex flex-col z-40'
      ]"
    >
      <!-- Cabecera Sidebar -->
      <div class="h-16 flex items-center px-4 border-b border-cyan-500/10 justify-between">
        <span class="text-xs font-bold tracking-widest text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.4)]">
          INVENTORY.CTRL
        </span>
        <!-- Botón para cerrar en móviles -->
        <button 
          @click="isSidebarOpen = false" 
          class="lg:hidden text-cyan-400 hover:text-cyan-300 cursor-pointer p-1 rounded bg-cyan-950/30 border border-cyan-500/20"
        >
          <X class="w-4 h-4" />
        </button>
      </div>

      <!-- Links de Navegación con Iconos de Contorno -->
      <nav class="flex-1 p-3 space-y-1">
        <router-link 
          to="/dashboard" 
          @click="isSidebarOpen = false"
          active-class="bg-cyan-950/30 border-cyan-500/50 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.05)]"
          class="flex items-center space-x-3 px-3 py-2.5 rounded-md border border-transparent hover:bg-gray-800/40 transition-all text-xs tracking-wider"
        >
          <LayoutDashboard class="w-4.5 h-4.5 stroke-[1.5]" />
          <span>DASHBOARD</span>
        </router-link>

        <router-link 
          to="/dashboard/scanner" 
          @click="isSidebarOpen = false"
          active-class="bg-cyan-950/30 border-cyan-500/50 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.05)]"
          class="flex items-center space-x-3 px-3 py-2.5 rounded-md border border-transparent hover:bg-gray-800/40 transition-all text-xs tracking-wider"
        >
          <Camera class="w-4.5 h-4.5 stroke-[1.5]" />
          <span>ESCANER_CAM</span>
        </router-link>

        <router-link 
          to="/dashboard/perfil" 
          @click="isSidebarOpen = false"
          active-class="bg-cyan-950/30 border-cyan-500/50 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.05)]"
          class="flex items-center space-x-3 px-3 py-2.5 rounded-md border border-transparent hover:bg-gray-800/40 transition-all text-xs tracking-wider"
        >
          <User class="w-4.5 h-4.5 stroke-[1.5]" />
          <span>CONFIG_USER</span>
        </router-link>
      </nav>

      <!-- Footer Sidebar -->
      <div class="p-3 border-t border-cyan-500/10">
        <div class="text-[9px] text-gray-600 text-center uppercase tracking-widest font-mono">
          v1.0.0-cyber-alpha
        </div>
      </div>
    </aside>

    <!-- ÁREA DE CONTENIDO PRINCIPAL -->
    <div class="flex-1 flex flex-col overflow-hidden w-full">
      
      <!-- NAVBAR SUPERIOR -->
      <header class="h-16 bg-[#11141d]/80 backdrop-blur border-b border-cyan-500/10 flex items-center justify-between px-4 lg:px-6 z-20">
        
        <!-- Botón de apertura lateral (Móvil) -->
        <button 
          @click="isSidebarOpen = true"
          class="lg:hidden text-cyan-400 hover:text-cyan-300 cursor-pointer p-1.5 rounded bg-cyan-950/30 border border-cyan-500/20"
        >
          <Menu class="w-5 h-5" />
        </button>

        <div class="hidden sm:block">
          <span class="text-[10px] text-emerald-400 tracking-widest bg-emerald-950/30 px-2 py-1 rounded border border-emerald-500/20 font-mono">
            ● ONLINE_SECURE_NODE
          </span>
        </div>

        <!-- Menú de Usuario con Dropdown Integrado -->
        <div class="relative">
          <button 
            @click="isUserMenuOpen = !isUserMenuOpen"
            class="flex items-center space-x-2 text-xs text-gray-400 hover:text-cyan-400 transition-colors focus:outline-none cursor-pointer"
          >
            <div class="bg-cyan-950 text-cyan-400 p-1.5 rounded-full border border-cyan-500/30">
              <User class="w-3.5 h-3.5" />
            </div>
            <span class="hidden md:inline uppercase">Angel Ocampo</span>
          </button>

          <!-- Dropdown Menú -->
          <div 
            v-if="isUserMenuOpen" 
            class="absolute right-0 mt-2 w-56 bg-[#11141d] border border-cyan-500/30 rounded shadow-2xl py-2 z-30 font-mono text-xs"
          >
            <div class="px-4 py-2 border-b border-cyan-500/10 text-gray-500 text-[9px] tracking-widest">
              SISTEMA_ROL: SUPERVISOR
            </div>

            <!-- ENLACE AL PERFIL -->
            <router-link 
              to="/dashboard/perfil" 
              @click="isUserMenuOpen = false" 
              class="flex items-center space-x-2 px-4 py-2.5 hover:bg-cyan-950/50 hover:text-cyan-400 transition-colors"
            >
              <ShieldCheck class="w-4 h-4 text-cyan-500 stroke-[1.5]" />
              <span>Ajustes Seguridad</span>
            </router-link>

            <!-- SWITCH DE TEMA (CLARO/OSCURO) DENTRO DEL MENU -->
            <button 
              @click="toggleTheme" 
              class="w-full text-left flex items-center justify-between px-4 py-2.5 hover:bg-cyan-950/50 hover:text-cyan-400 transition-colors cursor-pointer"
            >
              <span class="flex items-center space-x-2">
                <Sun v-if="isDarkMode" class="w-4 h-4 text-amber-500 stroke-[1.5]" />
                <Moon v-else class="w-4 h-4 text-cyan-400 stroke-[1.5]" />
                <span>{{ isDarkMode ? 'Modo Claro' : 'Modo Oscuro' }}</span>
              </span>
              <span class="text-[9px] bg-gray-800 text-gray-400 px-1.5 py-0.5 rounded uppercase">
                {{ isDarkMode ? 'DARK' : 'LIGHT' }}
              </span>
            </button>

            <!-- CERRAR SESIÓN -->
            <button 
              @click="handleLogout" 
              class="w-full text-left flex items-center space-x-2 px-4 py-2.5 text-red-400 hover:bg-red-950/30 hover:text-red-300 transition-colors cursor-pointer border-t border-cyan-500/10"
            >
              <LogOut class="w-4 h-4 stroke-[1.5]" />
              <span>Cerrar Sesión</span>
            </button>
          </div>
        </div>
      </header>

      <!-- CONTENIDO DE LAS VISTAS DINÁMICAS -->
      <main class="flex-1 overflow-x-hidden overflow-y-auto bg-[#0d0f14] p-4 lg:p-6">
        <router-view />
      </main>

    </div>
  </div>
</template>