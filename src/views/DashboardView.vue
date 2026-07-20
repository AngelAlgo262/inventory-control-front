<!-- DashboardView.vue -->
<script setup>
import DashboardStockChart from './DashboardStockChart.vue';
import DashboardTopSalesChart from './DashboardTopSalesChart.vue';
</script>

<template>
  <!-- Contenedor principal con espaciado óptimo -->
  <div class="p-6 space-y-6 bg-[#0b0d13] min-h-screen text-gray-200">
    
    <!-- Encabezado sutil del Tablero -->
    <div class="flex flex-col gap-1 border-b border-gray-800 pb-4">
      <h1 class="text-xl font-black tracking-wider text-cyan-400 font-mono">DASHBOARD_SISTEMA</h1>
      <p class="text-xs text-gray-500 font-mono">MÓDULOS DE RENDIMIENTO E INVENTARIO EN TIEMPO REAL</p>
    </div>

    <!-- 🎛️ El Grid Premium responsivo -->
    <!-- En celulares (vista base) se apilan en 1 columna, en pantallas grandes (lg) se ponen lado a lado -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      
      <!-- Gráfica 1: Alertas de Stock Crítico -->
      <DashboardStockChart />
      
      <!-- Gráfica 2: Puntos de Venta Semanal -->
      <DashboardTopSalesChart />
      
    </div>
  </div>
</template>