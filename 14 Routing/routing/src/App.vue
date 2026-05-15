<template>
  <div class="app-container">
    <nav class="navigation">
      <router-link to="/">Список задач</router-link>
      <router-link to="/add">Добавить задачу</router-link>
      <router-link to="/about">О нас</router-link>
    </nav>
    
    <main class="content">
      <router-view />
    </main>
  </div>
</template>

<style>
body { margin: 0; font-family: Arial, sans-serif; background: #f5f5f5; }
.app-container { max-width: 600px; margin: 40px auto; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
.navigation { display: flex; gap: 15px; border-bottom: 1px solid #eee; padding-bottom: 15px; margin-bottom: 20px; }
.navigation a { text-decoration: none; color: #4a90e2; font-weight: bold; }
.navigation a.router-link-active { color: #d9534f; }
</style>