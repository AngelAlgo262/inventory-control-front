import axios from 'axios'

const apiClient = axios.create({
    baseURL: 'http://127.0.0.1:8000/api', // URL de API Laravel
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
})

// Interceptor de Peticiones (Request)
apiClient.interceptors.request.use(
    (config) => {
        // ⚠️ ATENCIÓN AQUÍ: La clave debe ser 'auth_token' (igual a la de tu store)
        const token = localStorage.getItem('auth_token')

        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }

        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default apiClient