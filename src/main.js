import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'
import './style.css'
//Importar los iconos para todo el proyecto
import {
    LayoutDashboard,
    Camera,
    User,
    Menu,
    X,
    LogOut,
    Sun,
    Moon,
    ShieldCheck,
    Edit2 // Añadimos este para el botón de lápiz del perfil
} from 'lucide-vue-next'

const app = createApp(App)

// Registras iconos globales con el nombre que sea (dejo el mismo)
const icons = {
    LayoutDashboard,
    Camera,
    User,
    Menu,
    X,
    LogOut,
    Sun,
    Moon,
    ShieldCheck,
    Edit2
}

Object.entries(icons).forEach(([name, component]) => {
    app.component(name, component)
})

app.use(createPinia())
app.use(router)

app.mount('#app')
