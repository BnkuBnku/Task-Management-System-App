<template>
  <div class="max-w-xl mx-auto p-6">
    <h1 class="text-2xl font-bold mb-4">Task Manager</h1>

    <button
      @click="showForm = true"
      class="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
    >
      Add Task
    </button>

    <TaskForm
      v-if="showForm"
      @submitted="onTaskAdded"
      @cancel="showForm = false"
    />

    <TaskList />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import TaskForm from '@/components/TaskForm.vue'
import TaskList from '@/components/TaskList.vue'
import { useTasks } from '@/stores/tasks'
import { useRouter } from 'vue-router'

const router = useRouter()
const showForm = ref(false)
const { fetchTasks } = useTasks()  // tasks is reactive

const fetchPayload = {
  keyword: '',
  status: '',
  priority: '',
  take: 10,
  skip: 0
}

const onTaskAdded = () => {
  showForm.value = false
  fetchTasks(fetchPayload) // this already updates tasks.value
}

const loadTasks = async () => {
  try {
    const result = await fetchTasks(fetchPayload) // fetchTasks sets tasks.value

    // If unauthorized
    if (result?.error?.message === 'Unauthenticated.') {
      router.push('/login')
    }
  } catch (err) {
    if (err.response?.status === 401) router.push('/login')
    else console.error('Failed fetching tasks:', err)
  }
}

onMounted(() => loadTasks())
</script>

