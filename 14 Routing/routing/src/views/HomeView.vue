<script setup>
import { useTodoStore } from '../stores/todo'
const store = useTodoStore()
</script>

<template>
  <div>
    <h2>Все задачи</h2>
    <ul v-if="store.tasks.length > 0">
      <li v-for="task in store.tasks" :key="task.id" style="margin-bottom: 15px;">
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