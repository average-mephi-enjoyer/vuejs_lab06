<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const task = ref(null)

onMounted(() => {
  const savedTasks = JSON.parse(localStorage.getItem('todo-tasks') || '[]')
  task.value = savedTasks.find(t => t.id === Number(route.params.id))
})
</script>

<template>
  <div>
    <div v-if="task">
      <h2>Задача #{{ task.id }}</h2>
      <p><strong>Название:</strong> {{ task.title }}</p>
      <p><strong>Статус:</strong> {{ task.completed ? 'Выполнена' : 'В процессе' }}</p>
    </div>
    <div v-else>
      <h2>Ошибка</h2>
      <p>Задача с таким ID не найдена.</p>
    </div>
    <router-link to="/">Вернуться назад</router-link>
  </div>
</template>