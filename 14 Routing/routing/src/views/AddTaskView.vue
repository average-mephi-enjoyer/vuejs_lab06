<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const newTaskTitle = ref('')
const router = useRouter()

const addTask = () => {
  if (!newTaskTitle.value.trim()) return

  const savedTasks = localStorage.getItem('todo-tasks')
  const tasks = savedTasks ? JSON.parse(savedTasks) : []

  const newId = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1

  tasks.push({
    id: newId,
    title: newTaskTitle.value,
    completed: false
  })

  localStorage.setItem('todo-tasks', JSON.stringify(tasks))
  
  router.push('/')
}
</script>

<template>
  <div>
    <h2>Добавление задачи</h2>
    <input 
      v-model="newTaskTitle" 
      @keyup.enter="addTask" 
      type="text" 
      placeholder="Название задачи..." 
      style="padding: 8px; width: 70%;"
    />
    <button @click="addTask" style="padding: 8px 15px; margin-left: 10px;">Добавить</button>
  </div>
</template>