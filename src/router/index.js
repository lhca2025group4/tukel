import { createRouter, createWebHistory } from 'vue-router'
import AboutPage from '@/pages/AboutPage.vue'
import LoginPage from '@/pages/LoginPage.vue'
import DashboardPage from '@/pages/DashboardPage.vue'
import CreateNewPage from '@/pages/CreateNewPage.vue'
import ShufflePage from '@/pages/ShufflePage.vue'
import DetailPage from '@/pages/DetailPage.vue'
import NotFound from '@/pages/NotFound.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: 'home',
      path: '/',
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
    {
      name: 'shuffle',
      path: '/shuffle/:id',
      component: ShufflePage,
    },
    {
      name: 'detail',
      path: '/detail/:id',
      component: DetailPage,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFound,
    },
  ],
})

export default router
