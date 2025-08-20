import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import http from '@/lib/http'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const isAuthenticated = computed(() => !!user.value)

  // Call on app start or after refresh
  const fetchUser = async () => {
    try {
      const { data } = await http.get('/api/user') // Sanctum-protected default endpoint
      user.value = data
      return true
    } catch {
      user.value = null
      return false
    }
  }

  const csrf = () => http.get('/sanctum/csrf-cookie') // sets XSRF-TOKEN cookie

  const register = async (payload) => {
    await csrf()
    await http.post('/register', payload) // { name, email, password, password_confirmation }
    // Optionally fetch the user immediately:
    await fetchUser()
  }

  const login = async (payload) => {
    await csrf()
    await http.post('/login', payload) // { email, password }
    await fetchUser()
  }

  const logout = async () => {
    await http.post('/logout')
    user.value = null
  }

  return { user, isAuthenticated, fetchUser, register, login, logout }
})
