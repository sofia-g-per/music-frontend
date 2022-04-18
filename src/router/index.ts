import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
const LoginPage = () => import('@/views/LoginPage.vue')
const HomePage = () => import('@/views/HomePage.vue')
const LikedPage = () => import('@/views/LikedPage.vue')
const SignupPage = () => import('@/views/SignupPage.vue')
const AddSongPage = () => import('@/views/AddSongPage.vue')
const UsersSongsPage = () => import('@/views/UsersSongsPage.vue')
import store from '@/store'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    component: LoginPage
  },
  {
    path: '/sign-up',
    name: 'signup',
    component: SignupPage
  },
  {
    path: '/',
    name: 'home',
    component: HomePage,
  },
  {
    path: '/liked',
    name: 'liked',
    component: LikedPage
  },
  {
    path: '/add-song',
    name: 'add-song',
    component: AddSongPage,
    beforeEnter: (to, from) => {
      return store.dispatch('isArtistGuard')
    }
  },
  {
    path: '/my-songs',
    name: 'my-song',
    component: UsersSongsPage,
    beforeEnter: (to, from) => {
      return store.dispatch('isArtistGuard')
    }
  }
]

// beforeEnter: (to, from) => {
//   return store.dispatch('authorizedGuard')
// }

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
