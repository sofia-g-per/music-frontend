import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
const LoginPage = () => import('@/views/LoginPage.vue')
const HomePage = () => import('@/views/HomePage.vue')
const LikedPage = () => import('@/views/LikedPage.vue')
const SignupPage = () => import('@/views/SignupPage.vue')
const AddSongPage = () => import('@/views/AddSongPage.vue')
const AddAlbumPage = () => import('@/views/AddAlbumPage.vue')
const UsersSongsPage = () => import('@/views/UsersSongsPage.vue')
const UsersPlaylistsPage = () => import('@/views/UsersPlaylistsPage.vue')
const UsersAlbumsPage = () => import('@/views/UsersAlbumsPage.vue')
const AddPlaylistPage = () => import('@/views/AddPlaylistPage.vue')
const EditSongPage = () => import('@/views/EditSongPage.vue')
const EditPlaylistPage = () => import('@/views/EditPlaylistPage.vue')
const EditAlbumPage = () => import('@/views/EditAlbumPage.vue')
const EditUserPage = () => import('@/views/EditUserPage.vue')
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
  },
  {
    path: '/add-playlist',
    name: 'add-playlist',
    component: AddPlaylistPage,
    beforeEnter: (to, from) => {
      return store.dispatch('authorizedGuard')
    }
  },
  {
    path: '/my-playlists',
    name: 'my-playlists',
    component: UsersPlaylistsPage,
    beforeEnter: (to, from) => {
      return store.dispatch('authorizedGuard')
    }
  },
  {
    path: '/edit-song/:id',
    name: 'edit-song',
    component: EditSongPage,
    beforeEnter: (to, from) => {
      return store.dispatch('isArtistGuard')
    }
  },
  {
    path: '/edit-playlist/:id',
    name: 'edit-playlist',
    component: EditPlaylistPage,
    beforeEnter: (to, from) => {
      return store.dispatch('authorizedGuard')
    }
  },
  {
    path: '/edit-album/:id',
    name: 'edit-album',
    component: EditAlbumPage,
    beforeEnter: (to, from) => {
      return store.dispatch('isArtistGuard')
    }
  },
  {
    path: '/add-album',
    name: 'add-album',
    component: AddAlbumPage,
    beforeEnter: (to, from) => {
      return store.dispatch('isArtistGuard')
    }
  },
  {
    path: '/my-albums',
    name: 'my-albums',
    component: UsersAlbumsPage,
    beforeEnter: (to, from) => {
      return store.dispatch('isArtistGuard')
    }
  },
  {
    path: '/edit-profile',
    name: 'edit-profile',
    component: EditUserPage,
    beforeEnter: (to, from) => {
      return store.dispatch('authorizedGuard')
    }
  },
]


const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
