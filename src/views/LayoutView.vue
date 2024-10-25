<template>
  <div>
    <NavBar
      v-if="preventShowing"
      :logout="handleLogout"
      :first_name="curUser.username"
    />
    <router-view />
  </div>
</template>

<script setup>
import NavBar from '@/components/NavBar.vue';
import useAuthHook from '@/hooks/auth';
import useUserHook from '@/hooks/user';
import { useRouter, useRoute } from 'vue-router';
import { computed } from 'vue';

const { curUser } = useUserHook();
const { logout } = useAuthHook();
const router = useRouter();
const route = useRoute();

const preventShowing = computed(
  () =>
    route.path !== '/login' && route.path !== '/' && route.path !== '/register'
);

const handleLogout = () => {
  logout();
  router.push('/login');
};
</script>
