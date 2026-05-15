<script setup>
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

onMounted(() => {
  const taskId = Number(route.params.id)
  const savedTasks = JSON.parse(localStorage.getItem('todo-tasks') || '[]')
  
  const taskIndex = savedTasks.findIndex(t => t.id === taskId)
  if (taskIndex !== -1) {
    savedTasks[taskIndex].completed = !savedTasks[taskIndex].completed
    localStorage.setItem('todo-tasks', JSON.stringify(savedTasks))
  }
})
</script>

<template>
  <div>
    <h2 style="color: green;">Статус задачи изменен</h2>
    <router-link to="/">Вернуться к списку</router-link>
  </div>
</template>