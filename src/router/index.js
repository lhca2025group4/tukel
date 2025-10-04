import { createRouter, createWebHistory } from 'vue-router'
import AboutPage from '@/pages/AboutPage.vue'
import LoginPage from '@/pages/LoginPage.vue'
import DashboardPage from '@/pages/DashboardPage.vue'
import CreateNewPage from '@/pages/CreateNewPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: 'home',
      path: '/',
      component: DashboardPage,
    },
    {
      name: 'dashboard',
      path: '/dashboard',
      component: DashboardPage,
    },
    {
      name: 'login',
      path: '/login',
      component: LoginPage,
    },
    {
      name: 'about',
      path: '/about',
      component: AboutPage,
    },
    {
      name: 'create-new',
      path: '/create-new',
      component: CreateNewPage,
    },
  ],
})

export default router
