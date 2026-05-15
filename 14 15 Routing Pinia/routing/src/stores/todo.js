import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useTodoStore = defineStore('todo', () => {
  const tasks = ref(JSON.parse(localStorage.getItem('todo-tasks') || '[]'))

  watch(tasks, (newTasks) => {
    localStorage.setItem('todo-tasks', JSON.stringify(newTasks))
  }, { deep: true })

  function addTask(title) {
    const newId = tasks.value.length > 0 ? Math.max(...tasks.value.map(t => t.id)) + 1 : 1
    tasks.value.push({
      id: newId,
      title: title,
      completed: false
    })
  }

  function toggleTaskStatus(id) {
    const task = tasks.value.find(t => t.id === id)
    if (task) {
      task.completed = !task.completed
    }
  }

  function deleteTask(id) {
    tasks.value = tasks.value.filter(t => t.id !== id)
  }

  return { tasks, addTask, toggleTaskStatus, deleteTask }
})