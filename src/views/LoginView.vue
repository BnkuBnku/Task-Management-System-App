<template>
  <div class="flex items-center justify-center h-screen bg-gray-100">
    <div class="bg-white p-6 rounded-lg shadow-lg w-96">
      <h2 class="text-2xl font-bold mb-4">Login</h2>
      <form @submit.prevent="handleLogin" class="space-y-4">
        <input v-model="email" type="email" placeholder="Email"
          class="w-full border px-3 py-2 rounded" />
        <input v-model="password" type="password" placeholder="Password"
          class="w-full border px-3 py-2 rounded" />
        <button
          class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Login
        </button>
      </form>
      <p class="text-sm mt-3">
        Don’t have an account?
        <router-link to="/register" class="text-blue-600 hover:underline">
          Register
        </router-link>
      </p>
      <p v-if="error" class="text-red-600 text-sm mt-2">{{ error }}</p>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/authStore'
import { useRouter, useRoute } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()
const route = useRoute()

const handleLogin = async () => {
  error.value = ''
  try {
    await auth.login({ email: email.value, password: password.value })
    const target = route.query.redirect || '/tasks'
    router.replace(target)
  } catch (e) {
    error.value = 'Invalid credentials'
  }
}

</script>
