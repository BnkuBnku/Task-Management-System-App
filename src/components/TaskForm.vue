<template>
  <form @submit.prevent="addNewTask" class="flex gap-2 mb-4">
    <input
      v-model="title"
      type="text"
      placeholder="New task..."
      class="border px-3 py-2 rounded w-full"
    />
    <select v-model="priority" class="border px-2 rounded">
      <option value="low">Low</option>
      <option value="medium">Medium</option>
      <option value="high">High</option>
    </select>
    <button class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
      Add
    </button>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { useTaskStore } from '@/stores/taskStore'

const store = useTaskStore()
const title = ref('')
const priority = ref('low')

const addNewTask = () => {
  if (title.value.trim()) {
    store.addTask(title.value, priority.value)
    title.value = ''
    priority.value = 'low'
  }
}
</script>
