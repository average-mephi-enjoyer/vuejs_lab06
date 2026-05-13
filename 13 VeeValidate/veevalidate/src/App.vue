<template>
  <div class="app-container">
    <RegForm />
  </div>
</template>

<script setup>
import RegForm from './components/regform.vue';
</script>

<style>
.app-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  font-family: Arial, sans-serif;
  background-color: #f5f5f5;
}

body {
  margin: 0;
}
</style>