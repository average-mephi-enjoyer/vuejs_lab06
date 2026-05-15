<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useTodoStore } from '../stores/todo'

const newTaskTitle = ref('')
const router = useRouter()
const store = useTodoStore()

const handleAddTask = () => {
  if (!newTaskTitle.value.trim()) return
  
  store.addTask(newTaskTitle.value)
  
  router.push('/')
}
</script>

<template>
  <div>
    <h2>Добавление задачи</h2>
    <input 
      v-model="newTaskTitle" 
      @keyup.enter="handleAddTask" 
      type="text" 
      placeholder="Название задачи..." 
      style="padding: 8px; width: 70%;"
    />
    <button @click="handleAddTask" style="padding: 8px 15px; margin-left: 10px;">Добавить</button>
  </div>
</template>