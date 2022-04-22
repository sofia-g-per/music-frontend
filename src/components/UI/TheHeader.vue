<template>
    <header class="main-header">
        <div class="site-nav">
            <listener-nav v-if="isAuth"></listener-nav>
            <artist-nav v-if="isArtist"></artist-nav>
        </div>
        <div class="main-header__auth-links" v-if="!isAuth" >
            <router-link to="/">Главная</router-link>
            <router-link to="/login">Вход</router-link>
            <router-link to="/sign-up">Регистрация</router-link>
        </div>
    </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ArtistNav from './nav/ArtistNav.vue'
import ListenerNav from '@/components/UI/nav/ListenerNav.vue'
import { isArgumentPlaceholder } from '@babel/types'
export default defineComponent({
    name: "TheHeader",
    components: {
        ArtistNav,
        ListenerNav
    },
    computed:{
        isAuth(){
            return this.$store.state.isAuth;
        },
        isArtist(){
            console.log(this.$store.getters.user, this.$store.getters.user.artist)
            return this.isAuth && this.$store.getters.user && this.$store.getters.user.artist;
        }
    }
})
</script>

<style scoped>
    .main-header{
        min-height: 3vh;
        padding: 2rem;
        border-bottom: 2px solid var(--font-color);
        margin-bottom: 2rem;
    }

  .site-nav,
  .main-header__auth-links{
      display: flex;
      justify-content: space-around;
  }


  .main-header__auth-links{
      display: flex;
      gap: 1rem;
  }
</style>