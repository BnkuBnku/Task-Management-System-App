<template>
  <div class="max-w-xl mx-auto p-6">
    <h1 class="text-2xl font-bold mb-4">Task Manager</h1>
    <TaskForm />
    <TaskList />
  </div>
</template>

<script setup>
import TaskForm from '@/components/TaskForm.vue'
import TaskList from '@/components/TaskList.vue'
</script>
