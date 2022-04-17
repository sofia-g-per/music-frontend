import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
const LoginPage = () => import('@/views/LoginPage.vue')
const HomePage = () => import('@/views/HomePage.vue')
const SignupPage = () => import('@/views/SignupPage.vue')
const AddSongPage = () => import('@/views/AddSongPage.vue')
import store from '@/store'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'login',
    component: LoginPage
  },
  {
    path: '/sign-up',
    name: 'signup',
    component: SignupPage
  },
  {
    path: '/home',
    name: 'home',
    component: HomePage,
    beforeEnter: (to, from) => {
      return store.dispatch('authorizedGuard')
    }
  },
    {
      path: '/add-song',
      name: 'add-song',
      component: AddSongPage,
      beforeEnter: (to, from) => {
        return store.dispatch('isArtistGuard')
      }
    }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
