<script setup>
import ScannerCamera from '../components/ScannerCamara.vue'
</script>

<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-xl font-bold tracking-widest text-cyan-400">[HARDWARE_INTERFACE]</h1>
      <p class="text-xs text-gray-500 mt-1">Prueba de flujo periférico y captura de datos en tiempo real.</p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Columna Izquierda: La Cámara -->
      <div class="lg:col-span-2">
        <ScannerCamera />
      </div>

      <!-- Columna Derecha: Logs de lectura simulados -->
      <div class="bg-[#11141d] border border-cyan-500/10 p-4 rounded-lg flex flex-col h-full justify-between">
        <div>
          <h3 class="text-xs font-semibold text-gray-400 tracking-wider mb-3">📡 BUFFER_DE_LECTURA</h3>
          <div class="space-y-2 font-mono text-[11px]">
            <div class="p-2 bg-black/40 border-l-2 border-cyan-500 text-gray-400">
              [12:04:11] -> Esperando flujo de hardware...
            </div>
          </div>
        </div>
        <div class="pt-4 border-t border-cyan-500/10 text-[11px] text-gray-500">
          Listo para procesar simbologías EAN-13, QR_CODE y Code128.
        </div>
      </div>
    </div>
  </div>
</template>