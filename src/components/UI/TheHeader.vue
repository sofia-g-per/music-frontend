<template>
    <header class="main-header">
        <div class="site-nav" v-if="isAuth">
            <listener-nav ></listener-nav>
            <artist-nav v-if="isArtist"></artist-nav>
            <div class="profile-links">
                <router-link to="/edit-profile" >
                    <svg class="profile-icon" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                    <title>Редактировать профиль</title>
                    <path d="M332.64,64.58C313.18,43.57,286,32,256,32c-30.16,0-57.43,11.5-76.8,32.38-19.58,21.11-29.12,49.8-26.88,80.78C156.76,206.28,203.27,256,256,256s99.16-49.71,103.67-110.82C361.94,114.48,352.34,85.85,332.64,64.58Z"/><path d="M432,480H80A31,31,0,0,1,55.8,468.87c-6.5-7.77-9.12-18.38-7.18-29.11C57.06,392.94,83.4,353.61,124.8,326c36.78-24.51,83.37-38,131.2-38s94.42,13.5,131.2,38c41.4,27.6,67.74,66.93,76.18,113.75,1.94,10.73-.68,21.34-7.18,29.11A31,31,0,0,1,432,480Z"/>
                    </svg>
                </router-link>
                <a @click.prevent="logOut">
                    <svg class="exit-icon" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                    viewBox="0 0 55 55" style="enable-background:new 0 0 55 55" xml:space="preserve">
                    <title>Выйти</title>
                    <path d="M54.924,23.618c-0.051-0.123-0.125-0.234-0.217-0.327L42.708,11.293c-0.391-0.391-1.023-0.391-1.414,0s-0.391,1.023,0,1.414
                        L51.587,23H36.001V1c0-0.553-0.447-1-1-1h-34c-0.032,0-0.06,0.015-0.091,0.018C0.854,0.023,0.805,0.036,0.752,0.05
                        C0.658,0.075,0.574,0.109,0.493,0.158C0.467,0.174,0.435,0.174,0.411,0.192C0.38,0.215,0.356,0.244,0.328,0.269
                        c-0.017,0.016-0.035,0.03-0.051,0.047C0.201,0.398,0.139,0.489,0.093,0.589c-0.009,0.02-0.014,0.04-0.022,0.06
                        C0.029,0.761,0.001,0.878,0.001,1v46c0,0.125,0.029,0.243,0.072,0.355c0.014,0.037,0.035,0.068,0.053,0.103
                        c0.037,0.071,0.079,0.136,0.132,0.196c0.029,0.032,0.058,0.061,0.09,0.09c0.058,0.051,0.123,0.093,0.193,0.13
                        c0.037,0.02,0.071,0.041,0.111,0.056c0.017,0.006,0.03,0.018,0.047,0.024l22,7C22.797,54.984,22.899,55,23.001,55
                        c0.21,0,0.417-0.066,0.59-0.192c0.258-0.188,0.41-0.488,0.41-0.808v-6h11c0.553,0,1-0.447,1-1V25h15.586L41.294,35.293
                        c-0.391,0.391-0.391,1.023,0,1.414C41.489,36.902,41.745,37,42.001,37s0.512-0.098,0.707-0.293l11.999-11.999
                        c0.093-0.092,0.166-0.203,0.217-0.326C55.025,24.138,55.025,23.862,54.924,23.618z M20.929,32.371
                        C20.773,32.763,20.397,33,20.001,33c-0.124,0-0.25-0.022-0.371-0.071l-5-2c-0.513-0.205-0.763-0.787-0.558-1.3
                        c0.205-0.515,0.791-0.763,1.3-0.558l5,2C20.884,31.276,21.134,31.858,20.929,32.371z M34.001,46h-10V8
                        c0-0.436-0.282-0.821-0.697-0.953L7.442,2h26.559V46z"/>
                    <g>
                    </g>
                    <g>
                    </g>
                    <g>
                    </g>
                    <g>
                    </g>
                    <g>
                    </g>
                    <g>
                    </g>
                    <g>
                    </g>
                    <g>
                    </g>
                    <g>
                    </g>
                    <g>
                    </g>
                    <g>
                    </g>
                    <g>
                    </g>
                    <g>
                    </g>
                    <g>
                    </g>
                    <g>
                    </g>
                    </svg>
                </a>
            </div>


        </div>
        <div class="main-header__auth-links" v-if="!isAuth" >
            <router-link to="/"><img  class="logo" src="@/assets/images/logo.png" alt=""></router-link>
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
            return this.$store.state.isAuth;
        },
        isArtist(){
            return this.isAuth && this.$store.state.isArtist && this.$store.getters.user && this.$store.getters.user.artist;
        }
    },
    methods:{
        logOut(){
            this.$store.dispatch('logOut');
            this.$router.push({name:'login'});
        }
    }
})
</script>

<style scoped>

    .main-header{
        min-height: 3vh;
        padding: 2rem;
        border-bottom: 2px solid var(--font-color);
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

  .exit-icon,
  .profile-icon
  {
     width: 2.8rem;
     fill: white;
  }

  .profile-links{
      display: flex;
      align-items: center;
      gap: 4rem;
      justify-content: flex-start;
  }
  
</style>