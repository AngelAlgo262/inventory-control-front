<template>
  <div class="max-w-4xl space-y-6">
    <div>
      <h1 class="text-xl font-bold tracking-widest text-cyan-400">[NUCLEO_CONFIGURACION_PERFIL]</h1>
      <p class="text-xs text-gray-500 mt-1">Administración de credenciales de acceso y capas de seguridad biométrica.</p>
    </div>

    <!-- Bloque 1: Datos de Usuario -->
    <div class="bg-[#11141d] border border-cyan-500/10 p-6 rounded-lg space-y-4">
      <h2 class="text-sm font-bold tracking-wider text-gray-300">👤 DATOS_DE_CUENTA</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div>
          <label class="block text-gray-500 mb-1">OPERADOR_NAME</label>
          <input type="text" value="Angel Ocampo" disabled class="w-full bg-black/50 border border-gray-800 text-gray-400 p-2.5 rounded font-mono outline-none">
        </div>
        <div>
          <label class="block text-gray-500 mb-1">EMAIL_NODE</label>
          <input type="email" value="angel.ocampo@demo.com" disabled class="w-full bg-black/50 border border-gray-800 text-gray-400 p-2.5 rounded font-mono outline-none">
        </div>
      </div>
    </div>

    <!-- Bloque 2: Seguridad y 2FA -->
    <div class="bg-[#11141d] border border-cyan-500/10 p-6 rounded-lg space-y-4">
      <h2 class="text-sm font-bold tracking-wider text-red-400">🔒 PROTOCOLOS_DE_SEGURIDAD</h2>
      
      <!-- 2FA MOCK -->
      <div class="flex items-start justify-between p-4 bg-black/40 border border-gray-800 rounded">
        <div class="space-y-1">
          <div class="text-xs font-bold">Autenticación en Dos Pasos (2FA)</div>
          <div class="text-[11px] text-gray-500">Agrega una capa criptográfica extra solicitando un token temporal al ingresar.</div>
        </div>
        <button class="bg-red-950/40 text-red-400 border border-red-500/30 hover:bg-red-900 hover:text-white px-3 py-1.5 text-[10px] rounded transition-all cursor-pointer">
          ACTIVAR_MFA
        </button>
      </div>

      <!-- BIOMETRÍA MOCK -->
      <div class="flex items-start justify-between p-4 bg-black/40 border border-gray-800 rounded">
        <div class="space-y-1">
          <div class="text-xs font-bold">Acceso Biométrico / Huella Digital</div>
          <div class="text-[11px] text-gray-500">Permite firmar el inicio de sesión utilizando el sensor local del dispositivo (WebAuthn).</div>
        </div>
        <button class="bg-cyan-950/40 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-900 hover:text-white px-3 py-1.5 text-[10px] rounded transition-all cursor-pointer">
          VINCULAR_SENSOR
        </button>
      </div>
    </div>
  </div>
</template>