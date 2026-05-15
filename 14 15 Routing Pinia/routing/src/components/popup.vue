<script setup>
defineEmits(['close', 'confirm'])
</script>

<template>
  <Teleport to="body">
    <div class="popup-overlay" @click.self="$emit('close')">
      <div class="popup-content">
        <slot></slot>
        
        <div class="popup-actions">
          <button class="btn-cancel" @click="$emit('close')">No, cancel!</button>
          <button class="btn-confirm" @click="$emit('confirm')">Yes, delete it!</button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.popup-content {
  background: white;
  padding: 30px;
  border-radius: 8px;
  max-width: 400px;
  width: 100%;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  animation: fadeIn 0.2s ease-out;
}

.popup-actions {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 25px;
}

.btn-cancel {
  background-color: #a0a0a0;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
}

.btn-confirm {
  background-color: #3b82f6;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
}

.btn-cancel:hover { background-color: #8c8c8c; }
.btn-confirm:hover { background-color: #2563eb; }

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>