// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import TasksView from '@/views/TasksView.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/tasks', name: 'tasks', component: TasksView, meta: { requiresAuth: true } },
  { path: '/login', name: 'login', component: LoginView, meta: { guestOnly: true } },
  { path: '/register', name: 'register', component: RegisterView, meta: { guestOnly: true } },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Ensure auth state is known before first navigation
let bootstrapped = false

router.beforeEach(async (to) => {
  const auth = useAuthStore()
  if (!bootstrapped) {
    bootstrapped = true
    await auth.fetchUser() // try to restore session
  }

  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return { name: 'login', query: { redirect: to.fullPath } }
  }
  if (to.meta.guestOnly && auth.isAuthenticated) {
    return { name: 'tasks' }
  }
})

export default router
