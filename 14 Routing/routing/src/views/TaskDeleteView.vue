<script setup>
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTodoStore } from '../stores/todo'

const route = useRoute()
const router = useRouter()
const store = useTodoStore()

onMounted(() => {
  const taskId = Number(route.params.id)
  store.deleteTask(taskId)
})
</script>

<template>
  <div>
    <h2 style="color: red;">Задача удалена</h2>
    <p>Задача успешно удалена.</p>
    <router-link to="/">Вернуться к списку</router-link>
  </div>
</template>