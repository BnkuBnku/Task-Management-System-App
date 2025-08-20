// src/lib/http.js
import axios from 'axios'

const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000', // your Laravel URL
  withCredentials: true, // <-- send/receive cookies (required for Sanctum)
})

// Optional: attach JSON header by default
http.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

export default http
