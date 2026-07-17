<!-- src/components/ScannerCamera.vue -->
<script setup>
import { ref, onUnmounted } from 'vue'

// Referencias reactivas para controlar el hardware
const videoRef = ref(null)
const streamActive = ref(false)
const errorMsg = ref('')
let localStream = null

// Función para inicializar la cámara trasera del dispositivo
const encenderCamara = async () => {
  errorMsg.value = ''
  try {
    // Forzamos el uso de la cámara trasera usando 'environment'
    const constraints = {
      video: { 
        facingMode: 'environment',
        width: { ideal: 1280 },
        height: { ideal: 720 }
      }
    }
    
    // Solicitud de permisos nativa (Requiere HTTPS para producción)
    localStream = await navigator.mediaDevices.getUserMedia(constraints)
    
    if (videoRef.value) {
      videoRef.value.srcObject = localStream
      streamActive.value = true
    }
  } catch (err) {
    // Control de excepciones cyberpunk para la terminal
    errorMsg.value = 'ERROR_CRÍTICO_HARDWARE: Permiso denegado o periférico no disponible.'
    console.error('Fallo en getUserMedia:', err)
  }
}

// Apaga los hilos de la cámara para liberar recursos del cel
const apagarCamara = () => {
  if (localStream) {
    localStream.getTracks().forEach(track => track.stop())
    localStream = null
    streamActive.value = false
  }
}

// Limpieza automática si el usuario navega a otra vista del dashboard
onUnmounted(() => {
  apagarCamara()
})
</script>

<template>
  <div class="border border-cyan-500/20 bg-[#11141d] p-5 rounded-lg shadow-[0_0_20px_rgba(6,182,212,0.05)]">
    
    <!-- Encabezado del Módulo -->
    <div class="flex justify-between items-center mb-4">
      <div class="flex items-center space-x-2">
        <span class="inline-block w-2 h-2 rounded-full" :class="streamActive ? 'bg-cyan-400 animate-ping' : 'bg-gray-600'"></span>
        <h3 class="text-xs font-mono tracking-widest text-cyan-400 font-bold">[MÓDULO_PERIFÉRICO_CAM]</h3>
      </div>
      <span 
        v-if="streamActive" 
        class="text-[10px] bg-cyan-950/80 text-cyan-400 px-2 py-0.5 rounded border border-cyan-500/30 tracking-widest font-mono"
      >
        STREAM_ONLINE
      </span>
    </div>

    <!-- Contenedor del Viewport de la Cámara -->
    <div class="relative aspect-video w-full max-w-xl mx-auto bg-black/60 rounded border border-gray-800 overflow-hidden mb-5 group">
      
      <!-- Elemento de Video Nativo -->
      <video 
        ref="videoRef" 
        autoplay 
        playsinline 
        class="w-full h-full object-cover scale-x-100"
      ></video>
      
      <!-- Overlay Cyberpunk: Retícula de escaneo tipo HUD -->
      <div v-if="streamActive" class="absolute inset-0 pointer-events-none border border-cyan-500/10 m-6 transition-all">
        <!-- Esquinas de mira óptica -->
        <div class="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-cyan-400"></div>
        <div class="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-cyan-400"></div>
        <div class="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-cyan-400"></div>
        <div class="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-cyan-400"></div>
        
        <!-- Línea láser de escaneo animada -->
        <div class="absolute top-0 left-0 w-full h-[1px] bg-cyan-400 shadow-[0_0_10px_#22d3ee] animate-[bounce_2.5s_infinite]"></div>
      </div>

      <!-- Estado en espera de encendido -->
      <div v-if="!streamActive" class="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-xs text-gray-500 space-y-2">
        <span class="text-2xl opacity-40">📷</span>
        <p class="text-[10px] tracking-widest uppercase">HARDWARE_DISCONNECTED</p>
      </div>
    </div>

    <!-- Panel de Control Interno -->
    <div class="flex flex-col items-center space-y-3">
      <div class="flex gap-3 w-full justify-center">
        <button 
          v-if="!streamActive"
          @click="encenderCamara"
          class="cursor-pointer w-full max-w-xs bg-cyan-950/40 text-cyan-400 border border-cyan-500/40 hover:bg-cyan-950 hover:border-cyan-400 px-5 py-2.5 text-xs font-mono tracking-widest rounded transition-all shadow-[0_0_10px_rgba(6,182,212,0.1)] active:scale-98"
        >
          [ CAPTURAR_VIDEO ]
        </button>
        
        <button 
          v-else
          @click="apagarCamara"
          class="cursor-pointer w-full max-w-xs bg-red-950/40 text-red-400 border border-red-500/40 hover:bg-red-950 hover:border-red-400 px-5 py-2.5 text-xs font-mono tracking-widest rounded transition-all shadow-[0_0_10px_rgba(239,68,68,0.1)] active:scale-98"
        >
          [ DESCONECTAR_CAM ]
        </button>
      </div>

      <!-- Consola de Errores Dinámica -->
      <transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0 -translate-y-1"
        enter-to-class="opacity-100 translate-y-0"
      >
        <p v-if="errorMsg" class="text-red-400 text-[10px] font-mono mt-2 bg-red-950/30 border border-red-500/20 px-3 py-1.5 rounded w-full text-center tracking-wide">
          ⚠️ {{ errorMsg }}
        </p>
      </transition>
    </div>
  </div>
</template>