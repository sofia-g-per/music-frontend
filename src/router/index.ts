import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
const LoginPage = () => import('@/views/LoginPage.vue')
const HomePage = () => import('@/views/HomePage.vue')

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'login',
    component: LoginPage
  },
  {
    path: '/home',
    name: 'home',
    component: HomePage
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
