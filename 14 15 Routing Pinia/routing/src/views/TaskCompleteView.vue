<script setup>
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTodoStore } from '../stores/todo'

const route = useRoute()
const router = useRouter()
const store = useTodoStore()

onMounted(() => {
  const taskId = Number(route.params.id)
  store.toggleTaskStatus(taskId)
})
</script>

<template>
  <div>
    <h2 style="color: green;">Статус задачи изменен</h2>
    <router-link to="/">Вернуться к списку</router-link>
  </div>
</template>