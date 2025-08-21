<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
      
      <!-- Title -->
      <h2 class="text-2xl font-semibold text-gray-900 text-center mb-6">
        Create your account
      </h2>

      <!-- Form -->
      <form @submit.prevent="handleRegister" class="space-y-4">

        <div class="flex flex-col">
          <label class="mb-2 text-gray-700 text-sm font-medium" for="name">Name</label>
          <input
            id="name"
            v-model="name"
            type="text"
            placeholder="Your full name"
            class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500 text-gray-900"
          />
        </div>

        <div class="flex flex-col">
          <label class="mb-1 text-gray-700 text-sm font-medium" for="email">Email address</label>
          <input
            id="email"
            v-model="email"
            type="email"
            placeholder="you@example.com"
            class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500 text-gray-900"
          />
        </div>

        <div class="flex flex-col">
          <label class="mb-1 text-gray-700 text-sm font-medium" for="password">Password</label>
          <input
            id="password"
            v-model="password"
            type="password"
            placeholder="Create a password"
            class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500 text-gray-900"
          />
        </div>

        <div class="flex flex-col">
          <label class="mb-1 text-gray-700 text-sm font-medium" for="confirmPassword">Confirm password</label>
          <input
            id="confirmPassword"
            v-model="confirmPassword"
            type="password"
            placeholder="Confirm your password"
            class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500 text-gray-900"
          />
        </div>

        <button
          type="submit"
          class="w-full bg-gray-900 text-white py-2.5 rounded-md font-medium hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          Sign up
        </button>
      </form>

      <!-- Login Link -->
      <p class="text-center text-gray-600 mt-4 text-sm">
        Already have an account?
        <router-link to="/login" class="text-blue-600 hover:underline">
          Sign in
        </router-link>
      </p>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const auth = useAuthStore()
const router = useRouter()

const handleRegister = async () => {
  try {
    await auth.register({
      name: name.value,
      email: email.value,
      password: password.value,
      confirm_password: confirmPassword.value,
    })
    router.replace('/login')
  } catch (e) {
    console.error('Registration failed', e)
  }
}
</script>
