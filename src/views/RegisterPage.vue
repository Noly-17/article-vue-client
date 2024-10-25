<template>
  <div class="login-container">
    <div class="login-box">
      <div class="logo">
        <img :src="logo" class="logo-img" />
      </div>
      <h1 class="login-title">Article Writer</h1>
      <p class="login-subtitle">Register Account</p>
      <form @submit.prevent="handleRegister" class="login-form">
        <div class="input-group">
          <input
            type="text"
            v-model="username"
            class="input-field"
            placeholder="Username"
            required
          />
        </div>
        <div class="input-group">
          <input
            type="text"
            v-model="first_name"
            class="input-field"
            placeholder="First Name"
            required
          />
        </div>
        <div class="input-group">
          <input
            type="text"
            v-model="last_name"
            class="input-field"
            placeholder="Last Name"
            required
          />
        </div>
        <div class="input-group">
          <input
            type="email"
            v-model="email"
            class="input-field"
            placeholder="Email"
            required
          />
        </div>
        <div class="input-group">
          <input
            type="password"
            v-model="password"
            class="input-field"
            placeholder="Password"
            required
          />
        </div>
        <button type="submit" class="login-button" :disabled="isLoading">
          {{ isLoading ? '...' : 'Register' }}
        </button>
        <p v-if="error" class="error-message">{{ error }}</p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import useAuthHook from '@/hooks/auth';
import { useRouter } from 'vue-router';
import logo from '@/assets/logo.png';

const { register, isLoading } = useAuthHook();
const router = useRouter();
const username = ref('');
const first_name = ref('');
const last_name = ref('');
const email = ref('');
const password = ref('');

const handleRegister = async () => {
  const user = {
    username: username.value,
    email: email.value,
    first_name: first_name.value,
    last_name: last_name.value,
    password: password.value,
  };

  try {
    await register(user);
    router.push('/login');
  } catch (err) {
    console.error('Login failed', err);
  }
};
</script>

<style scoped>
.login-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f0f4f8;
  padding: 2rem;
}

.login-box {
  background-color: #ffffff;
  border-radius: 10px;
  padding: 2rem;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.logo {
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-img {
  width: 120px;
}

.login-title {
  font-size: 2rem;
  font-weight: bold;
  color: #333;
  text-align: center;
  margin-bottom: 0.5rem;
}

.login-subtitle {
  text-align: center;
  font-size: 1rem;
  color: #666;
  margin-bottom: 2rem;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.input-group {
  display: flex;
  flex-direction: column;
}

.input-field {
  padding: 0.8rem;
  border-radius: 6px;
  border: 1px solid #ddd;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s;
}

.input-field:focus {
  border-color: #3b82f6;
}

.login-button {
  background-color: #3b82f6;
  color: white;
  padding: 0.8rem;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.login-button:disabled {
  background-color: #90cdf4;
  cursor: not-allowed;
}

.login-button:hover:not(:disabled) {
  background-color: #2563eb;
}

.error-message {
  color: #e53e3e;
  font-size: 0.9rem;
  text-align: center;
}
</style>
