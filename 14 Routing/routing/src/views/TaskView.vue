<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useTodoStore } from '../stores/todo'

const route = useRoute()
const store = useTodoStore()

const task = computed(() => store.tasks.find(t => t.id === Number(route.params.id)))
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
      <p>Задача не найдена.</p>
    </div>
    <router-link to="/">Вернуться назад</router-link>
  </div>
</template>