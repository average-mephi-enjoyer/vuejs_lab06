<template>
  <div class="registration-wrapper">
    <div class="registration-form">
      <h2>Регистрация</h2>
      
      <form @submit.prevent="onSubmit">
        <div class="form-group">
          <label>Email:</label>
          <input 
            v-model="email" 
            type="text" 
            placeholder="Введите email"
            :class="{ 
              'is-invalid': emailError && emailMeta.dirty, 
              'is-valid': emailMeta.valid && emailMeta.dirty 
            }"
          />
          <span v-if="emailError && emailMeta.dirty" class="error">{{ emailError }}</span>
        </div>

        <div class="form-group">
          <label>Пароль:</label>
          <input 
            v-model="password" 
            type="password" 
            placeholder="Введите пароль"
            :class="{ 
              'is-invalid': passwordError && passwordMeta.dirty, 
              'is-valid': passwordMeta.valid && passwordMeta.dirty 
            }"
          />
          
          <ul v-if="passwordMeta.dirty" class="password-criteria">
            <li :class="{ 'criteria-met': password.length >= 8, 'criteria-unmet': password.length < 8 }">
              -> Длина не менее 8
            </li>
            <li :class="{ 'criteria-met': /[0-9]/.test(password), 'criteria-unmet': !/[0-9]/.test(password) }">
              -> Цифры
            </li>
            <li :class="{ 'criteria-met': /[a-zа-яё]/.test(password), 'criteria-unmet': !/[a-zа-яё]/.test(password) }">
              -> Буквы нижнего регистра
            </li>
            <li :class="{ 'criteria-met': /[A-ZА-ЯЁ]/.test(password), 'criteria-unmet': !/[A-ZА-ЯЁ]/.test(password) }">
              -> Буквы верхнего регистра
            </li>
            <li :class="{ 'criteria-met': /[^a-zA-Zа-яА-ЯёЁ0-9\s]/.test(password), 'criteria-unmet': !/[^a-zA-Zа-яА-ЯёЁ0-9\s]/.test(password) }">
              -> Спецсимволы
            </li>
          </ul>
        </div>

        <div class="form-group checkbox-group">
          <label class="checkbox-label">
            <input 
              v-model="agreement" 
              type="checkbox" 
            />
            <span>I agree with license agreement</span>
          </label>
        </div>

        <button :disabled="!meta.valid" type="submit" class="submit-btn">
          Зарегистрироваться
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { useForm, useField } from 'vee-validate';
import * as yup from 'yup';

const schema = yup.object({
  email: yup.string()
    .required('Email обязателен')
    .email('Введите корректный email адрес'),
  password: yup.string()
    .required('Пароль обязателен')
    .min(8)
    .matches(/[0-9]/)
    .matches(/[a-zа-яё]/)
    .matches(/[A-ZА-ЯЁ]/)
    .matches(/[^a-zA-Zа-яА-ЯёЁ0-9\s]/),
  agreement: yup.boolean()
    .oneOf([true])
});

const { handleSubmit, meta } = useForm({
  validationSchema: schema,
  initialValues: {
    email: '',
    password: '',
    agreement: false
  }
});

const { value: email, errorMessage: emailError, meta: emailMeta } = useField('email');
const { value: password, errorMessage: passwordError, meta: passwordMeta } = useField('password');
const { value: agreement } = useField('agreement');

const onSubmit = handleSubmit((values) => {
  alert('Успех! Данные отправлены: ' + JSON.stringify(values));
});
</script>

<style scoped>
:global(html),
:global(body),
:global(#app) {
  margin: 0;
  padding: 0;
  width: 100%;
  min-height: 100vh;
  background-color: #ffffff;
}

:global(*) {
  box-sizing: border-box;
}

.registration-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
}

.registration-form {
  width: min(400px, calc(100vw - 32px));
  max-height: calc(100vh - 32px);
  overflow: auto;
  background: #ffffff;
  padding: 30px;
  border-radius: 14px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #333;
}

h2 {
  margin: 0 0 20px;
  font-size: 24px;
  font-weight: 600;
  color: #4b5563;
}

.form-group {
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-bottom: 20px;
}

label {
  font-size: 14px;
  color: #555;
  margin-bottom: 8px;
  font-weight: 500;
}

input[type="text"],
input[type="password"] {
  padding: 12px 15px;
  font-size: 14px;
  border: 1px solid #cfcfcf;
  border-radius: 8px;
  transition: all 0.3s ease;
  outline: none;
}

input[type="text"]:focus,
input[type="password"]:focus {
  border-color: #3085d6;
  box-shadow: 0 0 5px rgba(48, 133, 214, 0.3);
}

input.is-invalid {
  border-color: #d9534f !important;
}

input.is-invalid:focus {
  box-shadow: 0 0 5px rgba(217, 83, 79, 0.3) !important;
}

input.is-valid {
  border-color: #28a745 !important;
}

input.is-valid:focus {
  box-shadow: 0 0 5px rgba(40, 167, 69, 0.3) !important;
}

.error {
  color: #d9534f;
  font-size: 13px;
  margin-top: 5px;
}

.password-criteria {
  list-style: none;
  padding: 0;
  margin: 10px 0 0 0;
  font-size: 13px;
}

.password-criteria li {
  margin-bottom: 4px;
  transition: color 0.3s ease;
}

.criteria-met {
  color: #28a745;
}

.criteria-unmet {
  color: #d9534f;
}

.checkbox-group {
  margin-bottom: 25px;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 0;
  cursor: pointer;
  user-select: none;
}

.checkbox-label input[type="checkbox"] {
  width: 16px;
  height: 16px;
  cursor: pointer;
}

.submit-btn {
  width: 100%;
  padding: 12px;
  background-color: #3085d6;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.submit-btn:hover:not(:disabled) {
  background-color: #2778c4;
}

.submit-btn:disabled {
  background-color: #a5a5a5;
  color: #ffffff;
  cursor: not-allowed;
  opacity: 0.8;
}
</style>