<script setup>
import { ref, onMounted } from 'vue'

const tasks = ref([])

onMounted(() => {
  const savedTasks = localStorage.getItem('todo-tasks')
  if (savedTasks) {
    tasks.value = JSON.parse(savedTasks)
  }
})
</script>

<template>
  <div>
    <h2>Все задачи</h2>
    <ul v-if="tasks.length > 0">
      <li v-for="task in tasks" :key="task.id" style="margin-bottom: 15px;">
        <strong>[{{ task.completed ? 'Выполнено' : 'В процессе' }}]</strong> {{ task.title }}
        
        <div style="margin-top: 5px; font-size: 0.9em;">
          <router-link :to="`/task/${task.id}`">Подробнее</router-link> | 
          <router-link :to="`/task/${task.id}/complete`">Изменить статус</router-link> | 
          <router-link :to="`/task/${task.id}/delete`" style="color: red;">Удалить</router-link>
        </div>
      </li>
    </ul>
    <p v-else>Задач пока нет.</p>
  </div>
</template>