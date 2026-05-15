import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AddTaskView from '../views/AddTaskView.vue'
import AboutView from '../views/AboutView.vue'
import TaskView from '../views/TaskView.vue'
import TaskDeleteView from '../views/TaskDeleteView.vue'
import TaskCompleteView from '../views/TaskCompleteView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/add', name: 'add', component: AddTaskView },
    { path: '/about', name: 'about', component: AboutView },
    
    { path: '/task/:id', name: 'task', component: TaskView },
    { path: '/task/:id/delete', name: 'task-delete', component: TaskDeleteView },
    { path: '/task/:id/complete', name: 'task-complete', component: TaskCompleteView }
  ]
})

export default router