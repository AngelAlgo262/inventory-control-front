<template>
    <!-- Clases dinámicas para el modo claro/oscuro -->
    <div
        class="min-h-screen bg-slate-50 text-slate-900 dark:bg-[#0d0f14] dark:text-slate-100 flex flex-col items-center justify-center font-sans antialiased selection:bg-brand selection:text-black transition-colors duration-300">

        <!-- Botón para cambiar de tema -->
        <div class="absolute top-5 right-5 z-50">
            <button @click="toggleTheme"
                class="px-4 py-2 bg-slate-200 dark:bg-[#161920] border border-slate-300 dark:border-slate-800 rounded-xl text-sm font-semibold shadow-md cursor-pointer hover:scale-105 active:scale-95 transition-all">
                {{ isDark ? '☀️' : '🌙' }}
            </button>
        </div>

        <!-- Contenedor del Login -->
        <div
            class="w-full max-w-md p-8 sm:p-10 bg-white dark:bg-[#161920]/80 backdrop-blur-md rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl dark:shadow-[0_0_50px_-12px_rgba(0,210,255,0.15)] relative overflow-hidden group">

            <!-- Efecto de brillo de neón superior -->
            <div
                class="absolute -top-10 -left-10 w-40 h-40 bg-brand/10 rounded-full blur-3xl group-hover:bg-brand/20 transition-all duration-700">
            </div>

            <!-- Encabezado -->
            <div class="text-center mb-8 relative z-10">
                <h1
                    class="text-3xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-slate-800 to-slate-900 dark:from-white dark:to-brand">
                    {{ configStore.nombreNegocio }}<span class="text-brand">.</span>{{ configStore.moduloActual }}
                </h1>
                <p class="text-xs text-slate-400 dark:text-slate-500 mt-2 tracking-widest uppercase">
                    {{ configStore.slogan }}</p>
            </div>

            <!-- Formulario -->
            <form @submit.prevent="handleLogin" class="space-y-6 relative z-10">

                <!-- Campo: Usuario -->
                <div class="space-y-2">
                    <label
                        class="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Usuario
                        / Email</label>
                    <input v-model="form.email" type="text" placeholder="angelo.ocampo@core.com"
                        class="w-full px-4 py-3 bg-slate-100 dark:bg-[#1e2330] border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand text-slate-900 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-600 transition-all duration-300" />
                </div>

                <!-- Campo: Contraseña -->
                <div class="space-y-2">
                    <div class="flex justify-between items-center">
                        <label
                            class="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Contraseña</label>
                        <a href="#" class="text-xs text-brand hover:underline transition-colors">¿Olvidaste la
                            clave?</a>
                    </div>
                    <input v-model="form.password" type="password" placeholder="••••••••••••"
                        class="w-full px-4 py-3 bg-slate-100 dark:bg-[#1e2330] border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand text-slate-900 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-600 transition-all duration-300" />
                </div>

                <!-- Botón de Entrada -->
                <button type="submit"
                    class="w-full py-3.5 mt-2 bg-gradient-to-r from-brand to-brand-hover text-black dark:text-slate-950 font-bold rounded-xl shadow-lg shadow-brand/20 hover:shadow-xl hover:shadow-brand/40 active:scale-[0.98] transition-all duration-200 cursor-pointer uppercase tracking-wider text-sm">
                    Iniciar Sesión
                </button>
            </form>

            <!-- Botón para instalar PWA -->
            <div v-if="mostrarInstalarBtn"
                class="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800/60 relative z-10 flex justify-center">
                <button @click="instalarPWA"
                    class="flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-[#1e2330] dark:hover:bg-[#252b3b] border border-slate-300 dark:border-slate-700 rounded-xl text-xs font-bold tracking-wide uppercase transition-all duration-200 shadow-sm hover:scale-[1.02] active:scale-[0.98] cursor-pointer w-full text-slate-600 dark:text-slate-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor"
                        viewBox="0 0 16 16" class="mt-[-1px]">
                        <path
                            d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
                        <path
                            d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />
                    </svg>
                    Instalar Aplicación
                </button>
            </div>

        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useCustomConfig } from '../stores/customConfig'

const router = useRouter()
const authStore = useAuthStore()
const configStore = useCustomConfig()

const form = ref({
    email: '',
    password: ''
})

// Estado reactivo para el tema
const isDark = ref(true)

// Función para cambiar de tema
const toggleTheme = () => {
    isDark.value = !isDark.value
    if (isDark.value) {
        document.documentElement.classList.add('dark')
        localStorage.setItem('theme', 'dark')
    } else {
        document.documentElement.classList.remove('dark')
        localStorage.setItem('theme', 'light')
    }
}

// Lógica de Instalación de la PWA
const mostrarInstalarBtn = ref(false)
let deferredPrompt = null

const capturarPrompt = (e) => {
    e.preventDefault()
    deferredPrompt = e
    mostrarInstalarBtn.value = true
}

onMounted(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme === 'light') {
        isDark.value = false
        document.documentElement.classList.remove('dark')
    } else {
        isDark.value = true
        document.documentElement.classList.add('dark')
    }

    // Escuchar el evento nativo del navegador
    window.addEventListener('beforeinstallprompt', capturarPrompt)
})

onUnmounted(() => {
    window.removeEventListener('beforeinstallprompt', capturarPrompt)
})

async function instalarPWA() {
    if (!deferredPrompt) return

    deferredPrompt.prompt()

    const { outcome } = await deferredPrompt.userChoice
    console.log(`El usuario definió el destino: ${outcome}`)

    deferredPrompt = null
    mostrarInstalarBtn.value = false
}

const handleLogin = async () => {
    const success = await authStore.login(form.value) //llama al store y le manda la data del formulario
    if (success) {
        // Si las credenciales pasan, el router te avienta al panel de control
        router.push('/dashboard')
    } else {
        alert(authStore.error)
    }
}
</script>