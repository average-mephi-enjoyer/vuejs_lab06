<script setup>
import { ref, onMounted } from 'vue'
import Popup from './popup.vue'

const newTask = ref('')
const tasks = ref([])
const isLoading = ref(true)

const isPopupOpen = ref(false)
const taskToDelete = ref(null)

const API_URL = 'https://jsonplaceholder.typicode.com/todos'
const USER_ID = 1

const fetchTasks = async () => {
  try {
    isLoading.value = true
    const response = await fetch(`${API_URL}?userId=${USER_ID}&_limit=5`)
    if (!response.ok) throw new Error('Не удалось загрузить задачи')
    tasks.value = await response.json()
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false
  }
}

onMounted(fetchTasks)

const addTask = async () => {
  const title = newTask.value.trim()
  if (!title) return

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=UTF-8' },
      body: JSON.stringify({ title, completed: false, userId: USER_ID })
    })
    if (!response.ok) throw new Error('Не удалось добавить задачу')

    const createdTask = await response.json()
    tasks.value.unshift(createdTask)
    newTask.value = ''
  } catch (error) {
    console.error(error)
  }
}

const toggleTaskStatus = async (task) => {
  const updatedCompleted = !task.completed
  try {
    const response = await fetch(`${API_URL}/${task.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json; charset=UTF-8' },
      body: JSON.stringify({ completed: updatedCompleted })
    })
    if (!response.ok) throw new Error('Не удалось изменить статус')
    task.completed = updatedCompleted
  } catch (error) {
    console.error(error)
  }
}

const confirmRemove = (id) => {
  taskToDelete.value = id
  isPopupOpen.value = true
}

const executeRemoveTask = async () => {
  if (!taskToDelete.value) return

  try {
    const response = await fetch(`${API_URL}/${taskToDelete.value}`, {
      method: 'DELETE'
    })
    if (!response.ok) throw new Error('Не удалось удалить задачу')

    tasks.value = tasks.value.filter(task => task.id !== taskToDelete.value)
    isPopupOpen.value = false
    taskToDelete.value = null
  } catch (error) {
    console.error(error)
  }
}

const cancelRemove = () => {
  isPopupOpen.value = false
  taskToDelete.value = null
}
</script>

<template>
  <div class="todo-wrapper">
    <h2>ToDo List</h2>

    <div class="input-section">
      <input
        v-model="newTask"
        @keyup.enter="addTask"
        type="text"
        placeholder="New task"
      />
      <button @click="addTask" class="add-btn">Add</button>
    </div>

    <p v-if="isLoading" class="info-text">Загрузка задач...</p>

    <ul v-else class="task-list">
      <li v-for="task in tasks" :key="task.id" class="task-item">
        <label class="task-label" :class="{ done: task.completed }">
          <input
            type="checkbox"
            :checked="task.completed"
            @change="toggleTaskStatus(task)"
          />
          <span>{{ task.title }}</span>
        </label>

        <button @click="confirmRemove(task.id)" class="delete-btn">🗑</button>
      </li>
    </ul>

    <p v-if="!isLoading && tasks.length === 0" class="info-text">Список задач пуст</p>

    <Popup 
      v-if="isPopupOpen" 
      @close="cancelRemove" 
      @confirm="executeRemoveTask"
    >
      <div class="popup-alert">
        <div class="alert-icon">!</div>
        <h3>Delete?</h3>
        <p>Please ensure and then confirm!</p>
      </div>
    </Popup>

  </div>
</template>

<style scoped>
:global(html), :global(body), :global(#app) {
  margin: 0; padding: 0; width: 100%; min-height: 100vh; background: #f3f4f6;
}
:global(*) { box-sizing: border-box; }

.todo-wrapper {
  position: fixed;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  width: min(520px, calc(100vw - 32px));
  max-height: calc(100vh - 32px);
  overflow: auto;
  background: #ffffff;
  padding: 24px;
  border-radius: 14px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
  color: #333;
}

h2 { margin: 0 0 20px; text-align: center; }
.input-section { display: flex; gap: 10px; margin-bottom: 18px; }
.input-section input { flex: 1; padding: 10px 12px; border: 1px solid #cfcfcf; border-radius: 8px; }
.add-btn { border: none; background: #4a90e2; color: white; border-radius: 8px; padding: 10px 16px; cursor: pointer; }
.task-list { list-style: none; margin: 0; padding: 0; }
.task-item { display: flex; justify-content: space-between; align-items: center; gap: 12px; padding: 12px; border: 1px solid #ececec; border-radius: 8px; margin-bottom: 10px; }
.task-label { display: flex; align-items: center; gap: 10px; flex: 1; }
.done span { text-decoration: line-through; color: #8a8a8a; }
.delete-btn { border: none; background: transparent; cursor: pointer; font-size: 16px; color: #d9534f; }
.info-text { text-align: center; color: #7a7a7a; }

.popup-alert { display: flex; flex-direction: column; align-items: center; }
.alert-icon { width: 60px; height: 60px; border: 3px solid #fb923c; border-radius: 50%; display: flex; justify-content: center; align-items: center; font-size: 32px; color: #fb923c; font-weight: bold; margin-bottom: 15px; }
.popup-alert h3 { margin: 0 0 10px; font-size: 24px; color: #4b5563 ;}
.popup-alert p { margin: 0; color: #9ca3af; font-size: 14px }
</style>