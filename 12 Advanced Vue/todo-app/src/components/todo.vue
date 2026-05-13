<script setup>
import { ref } from 'vue'

const newTask = ref('')
const tasks = ref([
  { id: 1, text: 'My first task', completed: false },
])

const addTask = () => {
  if (newTask.value.trim() === '') return
  
  tasks.value.push({
    id: Date.now(),
    text: newTask.value,
    completed: false
  })
  newTask.value = ''
}

const removeTask = (id) => {
  tasks.value = tasks.value.filter(task => task.id !== id)
}
</script>

<template>
  <div class="todo-wrapper">
    <h2>ToDo List</h2>
    
    <div class="input-section">
      <input 
        v-model="newTask" 
        @keyup.enter="addTask" 
        placeholder="New Task" 
        type="text" 
      />
      <button @click="addTask" class="add-btn">Add</button>
    </div>

    <ul class="task-list">
      <li v-for="task in tasks" :key="task.id" class="task-item">
        <label :class="{ done: task.completed }">
          <input type="checkbox" v-model="task.completed" />
          {{ task.text }}
        </label>
        <button @click="removeTask(task.id)" class="delete-btn">🗑</button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.todo-wrapper {
  max-width: 500px;
  margin: 40px auto;
  font-family: sans-serif;
  color: #333;
}
.input-section {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}
.input-section input {
  flex-grow: 1;
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.add-btn {
  background-color: #4A90E2;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0 15px;
  cursor: pointer;
}
.task-list {
  list-style: none;
  padding: 0;
}
.task-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border: 1px solid #eee;
  margin-bottom: 5px;
  border-radius: 4px;
}
.done {
  text-decoration: line-through;
  color: #888;
}
.delete-btn {
  background: none;
  border: none;
  color: #d9534f;
  cursor: pointer;
  font-size: 16px;
}
</style>