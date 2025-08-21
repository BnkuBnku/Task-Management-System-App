<template>
  <form @submit.prevent="submitTask" class="space-y-2 p-4 bg-white rounded shadow">
    <input v-model="title" type="text" placeholder="Task title" class="w-full border p-2 rounded" />
    <textarea v-model="description" placeholder="Task description" class="w-full border p-2 rounded"></textarea>
    
    <select v-model="priority" class="border p-2 rounded">
      <option value="low">Low</option>
      <option value="medium">Medium</option>
      <option value="high">High</option>
    </select>
    
    <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Add Task</button>
  </form>
</template>

<script setup>
import { ref } from 'vue';
import { useTasks } from '../stores/tasks';

const { addTask } = useTasks();

const title = ref('');
const description = ref('');
const priority = ref('low');

const submitTask = async () => {
  if (!title.value) return;

  await addTask({
    title: title.value,
    description: description.value,
    status: 'pending',
    priority: priority.value,
    order: 1
  });

  // Clear form
  title.value = '';
  description.value = '';
  priority.value = 'low';
};

</script>
