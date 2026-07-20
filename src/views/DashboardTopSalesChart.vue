<!-- components/DashboardTopSalesChart.vue -->
<script setup>
import { computed } from 'vue'
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale
} from 'chart.js'

// Registrar componentes necesarios para líneas/puntos
ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale)

// 📅 Días de la semana para el Eje X
const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']

// 📈 Datos mock de los 3 productos más vendidos esta semana
// Cada posición en el array 'data' corresponde a un día de la semana (Lunes a Domingo)
const topProducts = [
  {
    name: 'Cuaderno Scribe C/U',
    sales: [12, 19, 3, 5, 2, 25, 30], // Unidades vendidas por día
    color: '#22d3ee' // Cyan premium
  },
  {
    name: 'Bolígrafo Bic Negro 12pz',
    sales: [5, 12, 8, 15, 20, 11, 5],
    color: '#a855f7' // Morado Cyberpunk
  },
  {
    name: 'Cinta Canela 48mm',
    sales: [8, 4, 15, 9, 12, 18, 10],
    color: '#f43f5e' // Rosa/Rojo neón
  }
]

// Mapeamos los datos para Chart.js
const chartData = computed(() => ({
  labels: days,
  datasets: topProducts.map(product => ({
    label: product.name,
    data: product.sales,
    borderColor: product.color,
    backgroundColor: product.color,
    
    // ✨ EL TRUCO DE LOS PUNTOS CHULOS:
    showLine: false,          // Escondemos la línea para que queden solo los puntos flotando
    pointRadius: 6,           // Puntos más grandes y vistosos por defecto
    pointHoverRadius: 10,     // Se expanden al pasar el mouse
    pointBorderWidth: 2,
    pointBorderColor: '#11141d', // Contorno oscuro para que resalten
    pointHoverBackgroundColor: product.color,
    pointHoverBorderColor: '#fff',
  }))
}))

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
      labels: {
        color: '#9ca3af',
        font: { family: 'monospace', size: 11 }
      }
    },
    tooltip: {
      backgroundColor: '#11141d',
      titleColor: '#22d3ee',
      bodyColor: '#fff',
      borderColor: 'rgba(34, 211, 238, 0.2)',
      borderWidth: 1,
      callbacks: {
        // Personalizamos el texto del tooltip para que sea más claro
        label: (context) => ` ${context.dataset.label}: ${context.raw} piezas`
      }
    }
  },
  scales: {
    x: {
      grid: { color: 'rgba(255, 255, 255, 0.03)' },
      ticks: { color: '#6b7280', font: { family: 'monospace' } }
    },
    y: {
      grid: { color: 'rgba(255, 255, 255, 0.03)' },
      beginAtZero: true,
      title: {
        display: true,
        text: 'UNIDADES_VENDIDAS',
        color: '#4b5563',
        font: { family: 'monospace', size: 10 }
      },
      ticks: { color: '#6b7280', font: { family: 'monospace' } }
    }
  }
}
</script>

<template>
  <div class="bg-[#11141d] border border-cyan-500/10 p-6 rounded-lg space-y-4">
    <div class="flex items-center justify-between border-b border-gray-800/60 pb-3">
      <div class="flex items-center gap-2">
        <span class="text-xs text-cyan-400">🔥</span>
        <h2 class="text-sm font-bold tracking-wider text-gray-300">TOP_VENTAS_SEMANAL_POR_DIAS</h2>
      </div>
      <span class="text-[10px] bg-cyan-950/40 text-cyan-400 border border-cyan-500/30 px-2 py-0.5 rounded font-mono">
        RENDIMIENTO
      </span>
    </div>

    <!-- Canvas contenedor de los puntos flotantes -->
    <div class="h-64 relative">
      <Line :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>