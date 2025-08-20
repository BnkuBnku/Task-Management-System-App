<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold">Welcome to Task Manager</h1>
    <div v-if="auth.user" class="mt-4">
      <p>Hello, <span class="font-semibold">{{ auth.user.name }}</span></p>
      <button @click="auth.logout" class="bg-red-600 text-white px-4 py-2 rounded mt-2">
        Logout
      </button>
    </div>
    <div v-else>
      <router-link to="/login" class="text-blue-600 underline">Login</router-link>
      or
      <router-link to="/register" class="text-blue-600 underline">Register</router-link>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/authStore'
const auth = useAuthStore()
</script>
