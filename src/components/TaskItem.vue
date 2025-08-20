<template>
  <div
    class="flex items-center justify-between p-3 mb-2 rounded shadow-sm transition"
    :class="{
      'bg-green-100 line-through': task.completed,
      'bg-red-100': task.priority === 'high' && !task.completed,
      'bg-yellow-100': task.priority === 'medium' && !task.completed,
      'bg-blue-100': task.priority === 'low' && !task.completed,
    }"
  >
    <div class="flex items-center gap-2">
      <input type="checkbox" v-model="task.completed" @change="toggleTask(task.id)" />
      <span>{{ task.title }}</span>
    </div>
    <button
      class="text-red-600 hover:text-red-800"
      @click="deleteTask(task.id)"
    >
      ✕
    </button>
  </div>
</template>

<script setup>
import { useTaskStore } from '@/stores/taskStore'
const props = defineProps({ task: Object })

const store = useTaskStore()
const toggleTask = store.toggleTask
const deleteTask = store.deleteTask
</script>
