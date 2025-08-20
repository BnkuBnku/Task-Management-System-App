import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTaskStore = defineStore('task', () => {
  const tasks = ref([
    { id: 1, title: 'Setup project', completed: false, priority: 'high' },
    { id: 2, title: 'Build task list UI', completed: false, priority: 'medium' },
  ])

  const addTask = (title, priority = 'low') => {
    tasks.value.push({
      id: Date.now(),
      title,
      completed: false,
      priority
    })
  }

  const toggleTask = (id) => {
    const task = tasks.value.find(t => t.id === id)
    if (task) task.completed = !task.completed
  }

  const deleteTask = (id) => {
    tasks.value = tasks.value.filter(t => t.id !== id)
  }

  return { tasks, addTask, toggleTask, deleteTask }
})
