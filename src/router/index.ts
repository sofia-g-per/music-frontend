import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
const LoginPage = () => import('@/views/LoginPage.vue')

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'LoginPage',
    component: LoginPage
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
