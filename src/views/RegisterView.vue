<template>
  <div class="flex items-center justify-center h-screen bg-gray-100">
    <div class="bg-white p-6 rounded-lg shadow-lg w-96">
      <h2 class="text-2xl font-bold mb-4">Register</h2>
      <form @submit.prevent="handleRegister" class="space-y-4">
        <input v-model="name" type="text" placeholder="Name"
          class="w-full border px-3 py-2 rounded" />
        <input v-model="email" type="email" placeholder="Email"
          class="w-full border px-3 py-2 rounded" />
        <input v-model="password" type="password" placeholder="Password"
          class="w-full border px-3 py-2 rounded" />
        <button
          class="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
          Register
        </button>
      </form>
      <p class="text-sm mt-3">
        Already have an account?
        <router-link to="/login" class="text-blue-600 hover:underline">
          Login
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
const auth = useAuthStore()
const router = useRouter()

const handleRegister = async () => {
  await auth.register({
    name: name.value,
    email: email.value,
    password: password.value,
    password_confirmation: passwordConfirm.value,
  })
  router.replace('/tasks')
}
</script>
