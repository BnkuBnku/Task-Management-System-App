import { defineStore } from 'pinia'
import axios from 'axios'

axios.defaults.baseURL = import.meta.env.VITE_API_URL
axios.defaults.headers.common['Accept'] = 'application/json'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token') || null,
  }),

  actions: {
    async login(credentials) {
      const res = await axios.post('/login', credentials)
      this.token = res.data.success
      this.user = res.data.user

      localStorage.setItem('token', this.token)
      axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
    },

    async register(payload) {
      await axios.post('/register', payload)
    },

    async logout() {
      await axios.post('/logout', {}, {
        headers: { Authorization: `Bearer ${this.token}` }
      })
      this.token = null
      this.user = null
      localStorage.removeItem('token')
      delete axios.defaults.headers.common['Authorization']
    },

    async fetchUser() {
      if (!this.token) return
      try {
        const res = await axios.get('/me', {
          headers: { Authorization: `Bearer ${this.token}` }
        })
        this.user = res.data
      } catch (e) {
        this.logout()
      }
    }
  }
})