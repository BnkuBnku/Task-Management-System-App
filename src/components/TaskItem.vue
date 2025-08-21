<template>
  <div
    :class="[
      'p-4 rounded shadow mb-2 flex justify-between items-center transition-colors',
      priorityClass,
      task.status === 'completed' ? 'opacity-50 line-through' : ''
    ]"
  >
    <div>
      <p class="font-bold">{{ task.title }}</p>
      <p class="text-sm">{{ task.description }}</p>
    </div>
    <div class="flex items-center space-x-2">
      <input type="checkbox" v-model="localStatus" @change="toggleStatus" />
      <button v-if="isAdmin" @click="$emit('delete', task.id)" class="text-red-500">Delete</button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useTasks } from '../stores/tasks';

const props = defineProps({
  task: Object,
  isAdmin: Boolean
});

const emit = defineEmits(['delete']);

const { updateTask } = useTasks();

const localStatus = ref(props.task.status === 'completed');

watch(localStatus, async (newVal) => {
  await updateTask(props.task.id, { status: newVal ? 'completed' : 'pending' });
});

const toggleStatus = () => {
  localStatus.value = !localStatus.value;
};

const priorityClass = computed(() => {
  switch (props.task.priority) {
    case 'high': return 'bg-red-100';
    case 'medium': return 'bg-yellow-100';
    case 'low': return 'bg-green-100';
  }
});
</script>
