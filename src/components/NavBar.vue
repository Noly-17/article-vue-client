<template>
  <header class="dashboard-header">
    <button class="menu-toggle" @click="toggleNav">
      <span v-if="!isNavOpen">☰</span>
      <span v-else>✖</span>
    </button>
    <div class="logo" :class="{ 'logo-top': isNavOpen }">
      <router-link to="/">
        <img :src="logo" alt="Logo" class="logo-img" />
      </router-link>
    </div>
    <nav class="nav-links" :class="{ 'nav-open': isNavOpen }">
      <router-link to="/dashboard" class="nav-link" @click="closeNav"
        >Dashboard</router-link
      >
      <router-link to="/article/publish" class="nav-link" @click="closeNav"
        >Published</router-link
      >
      <router-link to="/article/unpublish" class="nav-link" @click="closeNav"
        >Unpublished</router-link
      >
      <router-link to="/create-article" class="nav-link" @click="closeNav"
        >Create Article</router-link
      >
      <div class="nav-link logout" @click="logout">Logout</div>
    </nav>
    <div class="right-section">
      <button @click="logout" class="logout-btn">Logout</button>
    </div>
  </header>
</template>

<script setup>
import { ref, defineProps } from 'vue';
import logo from '@/assets/logo.png';

const isNavOpen = ref(false);

function toggleNav() {
  isNavOpen.value = !isNavOpen.value;
}

function closeNav() {
  isNavOpen.value = false;
}

defineProps({
  logout: Function,
  first_name: String,
});
</script>

<style scoped>
.dashboard-header {
  background-color: #f8f9fa;
  padding: 20px 30px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
}

.logo {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.logo-img {
  width: 120px;
  max-width: 100%;
  height: auto;
  transition: width 0.3s ease;
}

.menu-toggle {
  font-size: 1.5rem;
  background: none;
  border: none;
  cursor: pointer;
  position: absolute;
  left: 10px;
}

.nav-links {
  display: flex;
  gap: 20px;
  align-items: center;
  transition: max-height 0.3s ease;
}

.nav-link {
  text-decoration: none;
  color: #333;
  font-weight: 500;
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: #007bff;
}

.right-section {
  display: flex;
  flex-direction: column;
}

.right-section span {
  font-size: 100;
  color: gray;
  margin-top: 3px;
}

.logout {
  display: none;
}

.logout-btn {
  background-color: #007bff;
  border: none;
  color: white;
  padding: 8px 15px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.logout-btn:hover {
  background-color: #0056b3;
}

@media (min-width: 769px) {
  .dashboard-header {
    flex-direction: row;
  }

  .logo {
    position: static;
    transform: none;
  }

  .logo-img {
    width: 100px;
  }

  .nav-links {
    justify-content: center;
    flex-grow: 1;
  }

  .logout-btn {
    display: inline-block;
    position: static;
  }

  .menu-toggle {
    display: none;
  }
}

@media (max-width: 768px) {
  .menu-toggle {
    display: block;
  }

  .logo {
    position: relative;
    left: unset;
    transform: none;
    margin-bottom: 15px;
  }

  .logo-img {
    width: 100px;
  }

  .logo-top {
    margin-bottom: 15px;
  }

  .nav-links {
    flex-direction: column;
    max-height: 0;
    overflow: hidden;
    width: 100%;
    gap: 15px;
    transition: max-height 0.3s ease;
  }

  .nav-links.nav-open {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-height: 300px;
  }

  .dashboard-header {
    flex-direction: column;
    align-items: center;
  }

  .logout {
    display: block;
  }

  .logout-btn {
    display: none;
    width: 100%;
    text-align: center;
    margin-top: 10px;
  }

  .nav-open ~ .logout-btn {
    display: block;
  }
}
</style>
