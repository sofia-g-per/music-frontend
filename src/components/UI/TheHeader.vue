<template>
    <header class="main-header">
        <div class="site-nav">
            <listener-nav v-if="isAuth"></listener-nav>
            <artist-nav v-if="isArtist"></artist-nav>
        </div>
        <div v-if="isAuth" class="main-header__auth-user">

        </div>
        <div v-else class="main-header__auth-links">
            <router-link to="/login">Вход</router-link>
            <router-link to="/sign-up">Регистрация</router-link>
        </div>
    </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ArtistNav from './nav/ArtistNav.vue'
import ListenerNav from '@/components/UI/nav/ListenerNav.vue'
export default defineComponent({
    name: "TheHeader",
    components: {
        ArtistNav,
        ListenerNav
    },
    computed:{
        isAuth(){
            return this.$store.state.user && this.$store.state.user.id
        },
        isArtist(){

            return this.isAuth && this.$store.state.user.artist
        }
    }
})
</script>

<style scoped>
    .main-header{
        min-height: 3vh;
        padding: 2rem;
    }
  a{
    color: var(--font-color);
    font-size: 1.8rem;
    text-transform: uppercase;
    text-decoration: none;
    transition: .3s;
  }

  a:hover{
      color: var(--accent-color-1);
  }

  .site-nav{
      display: flex;
      justify-content: space-around;
  }
  .main-header__auth-links{
      display: flex;
      gap: 1rem;
  }
</style>