<script setup>
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

onMounted(() => {
  const taskId = Number(route.params.id)
  const savedTasks = JSON.parse(localStorage.getItem('todo-tasks') || '[]')
  
  const updatedTasks = savedTasks.filter(t => t.id !== taskId)
  localStorage.setItem('todo-tasks', JSON.stringify(updatedTasks))
})
</script>

<template>
  <div>
    <h2 style="color: red;">Task deleted</h2>
    <p>Задача успешно удалена.</p>
    <router-link to="/">Вернуться к списку</router-link>
  </div>
</template>