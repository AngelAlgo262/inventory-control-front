<!-- components/DashboardStockChart.vue -->
<script setup>
import { computed } from 'vue'
import { Bar } from 'vue-chartjs'
import { 
  Chart as ChartJS, 
  Title, 
  Tooltip, 
  Legend, 
  BarElement, 
  CategoryScale, 
  LinearScale 
} from 'chart.js'

// Registrar los módulos necesarios de Chart.js
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

// 📊 Mock de datos: En el futuro esto vendrá de tu API o Pinia Store
// Filtrando productos con stock bajo (Stock Actual vs Stock Mínimo)
const lowStockProducts = [
  { name: 'Cinta Canela 48mm', actual: 3, min: 15 },
  { name: 'Cuaderno Scribe Ledesma', actual: 5, min: 20 },
  { name: 'Bolígrafo Bic Negro 12 pz', actual: 2, min: 10 },
  { name: 'Hojas Bond Carta Ream', actual: 4, min: 12 },
  { name: 'Marcador sharpie Negro', actual: 1, min: 8 }
]

// Configuración de los Datos de la Gráfica
const chartData = computed(() => ({
  labels: lowStockProducts.map(p => p.name),
  datasets: [
    {
      label: 'STOCK_ACTUAL',
      backgroundColor: '#f87171', // Red 400 para alertas de peligro
      hoverBackgroundColor: '#ef4444',
      borderRadius: 4,
      data: lowStockProducts.map(p => p.actual)
    },
    {
      label: 'STOCK_MINIMO_REQUERIDO',
      backgroundColor: 'rgba(34, 211, 238, 0.2)', // Cyan 400 con opacidad (Estilo Cyberpunk)
      borderColor: '#22d3ee',
      borderWidth: 1,
      borderRadius: 4,
      data: lowStockProducts.map(p => p.min)
    }
  ]
}))

// Opciones de Estilización para encajar en el Tema Oscuro
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
      labels: {
        color: '#9ca3af', // Gray 400
        font: { family: 'monospace', size: 11 }
      }
    },
    tooltip: {
      backgroundColor: '#11141d',
      titleColor: '#22d3ee',
      bodyColor: '#fff',
      borderColor: 'rgba(34, 211, 238, 0.2)',
      borderWidth: 1,
      textDirection: 'ltr'
    }
  },
  scales: {
    x: {
      grid: { color: 'rgba(255, 255, 255, 0.05)' },
      ticks: { color: '#6b7280', font: { family: 'monospace' } }
    },
    y: {
      grid: { color: 'rgba(255, 255, 255, 0.05)' },
      ticks: { color: '#6b7280', font: { family: 'monospace' } }
    }
  }
}
</script>

<template>
  <div class="bg-[#11141d] border border-cyan-500/10 p-6 rounded-lg space-y-4">
    <div class="flex items-center justify-between border-b border-gray-800/60 pb-3">
      <div class="flex items-center gap-2">
        <span class="text-xs text-red-400">⚠️</span>
        <h2 class="text-sm font-bold tracking-wider text-gray-300">ALERTAS_DE_INVENTARIO</h2>
      </div>
      <span class="text-[10px] bg-red-950/40 text-red-400 border border-red-500/30 px-2 py-0.5 rounded font-mono">
        CRÍTICO
      </span>
    </div>

    <!-- Contenedor de la gráfica con altura fija para controlar el resize -->
    <div class="h-64 relative">
      <Bar :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>