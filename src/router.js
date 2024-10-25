import { createRouter, createWebHistory } from 'vue-router';
import useUserHook from './hooks/user';
import LoginPage from '@/views/LoginPage.vue';
import RegisterPage from '@/views/RegisterPage.vue';
import DashboardPage from '@/views/DashboardPage.vue';
import PubArticles from '@/views/PubArticles.vue';
import UnpubArticles from '@/views/UnpubArticles.vue';
import ArticleView from '@/views/ArticleView.vue';
import CreateArticleView from '@/views/CreateArticleView.vue';

const routes = [
  { path: '/', name: 'Home', component: LoginPage },
  { path: '/login', name: 'Login', component: LoginPage },
  { path: '/register', name: 'Register', component: RegisterPage },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardPage,
    meta: { requiresAuth: true },
  },
  {
    path: '/article/publish',
    name: 'PublishArticles',
    component: PubArticles,
    meta: { requiresAuth: true },
  },
  {
    path: '/article/unpublish',
    name: 'UnpublishArticles',
    component: UnpubArticles,
    meta: { requiresAuth: true },
  },
  {
    path: '/article/:id',
    name: 'SingleArticle',
    component: ArticleView,
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: '/create-article',
    name: 'CreateArticle',
    component: CreateArticleView,
    props: true,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('accessToken');
  const { curUSer } = useUserHook();

  if (token && curUSer && (to.path === '/' || to.path === '/login')) {
    return next({ path: '/dashboard' });
  } else if (to.meta.requiresAuth && !token && !curUSer) {
    return next({ path: '/login' });
  } else {
    next();
  }
});

export default router;
