<template>
  <the-header></the-header>

  <div class="page-wrapper">
    <router-view></router-view>

  </div>

<!-- проигрываемая песня -->
  <playing-song-footer 
    v-if="currentSong" 
    :songData="currentSong.song"
  >
    <!-- <template v-slot:music-item-buttons>

    </template> -->
  </playing-song-footer>

</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PlayingSongFooter from './components/songs/PlayingSongFooter.vue'
import TheHeader from './components/UI/TheHeader.vue'
export default defineComponent({
  components:{
    TheHeader,
    PlayingSongFooter
  },
  computed:{
    currentSong(){
      if(this.$store.state.currentSongDefined){
        console.log(this.$store.state.currentPlaylist.playlist[this.$store.state.currentSongId])
        return this.$store.state.currentPlaylist.playlist[this.$store.state.currentSongId];
      }else{
        return null;
      }
    },
  }
})
</script>

<style>
  /* ------------------------------ */
  /* VARIABLES */
  /* ------------------------------ */
  :root{
    --bg-color: black;
    --font-color: white;
    --accent-color-1: rgb(147, 0, 201);
    --accent-color-2: rgb(255, 0, 81);
    --accent-color-2--dark: rgb(17, 0, 36); 

    --main-font-family: sans-serif;
    font-size: 62.5%;
  }
  /* ------------------------------ */
  /* GENERAL */
  /* ------------------------------ */
  body{
    background-color: var(--bg-color);
    color: var(--font-color);
    font-family: var(--main-font-family);
    box-sizing: border-box;
    height: 100vh;
  }

  *{
    margin: 0;
        box-sizing: border-box;
  }

  .icon-btn{
    background: none;
    outline: none;
    border: none;
    cursor:pointer;
  }

    .icon-btn:focus,
    .icon-btn:hover{
      border:none;
      outline: none;
      padding: 0 1rem;
    }

    .main-btn{
      border: 2px solid white ;
      background: none;
      padding: 1rem;
      color: white;
      cursor: pointer;
      transition: .5s;
      margin: 2rem 0;
    }

    .main-btn:hover{
      background: rgb(38, 0, 78);
      color: white !important;

    }

  /* ------------------------------ */
  /* TEXT */
  /* ------------------------------ */
  .section-heading{

  }

  .page-title{
    padding: 2rem;
  }

  .page-wrapper{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .page-error{
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--accent-color-2);
    padding: 20vw 0;
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
  
  /* ------------------------------ */
  /* CONTAINERS */
  /* ------------------------------ */
  .container--2-clmn{
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  .song-list{
    border-radius: 1rem;
        display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem 0;
    min-width: 60vw;

  }
  /* ------------------------------ */
  /* FORM */
  /* ------------------------------ */
  .form{
    width: 60vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 2rem;
    max-width: 25rem;

  }

  .form-field{
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
  }

  .form-field__error-label{
    color: var(--accent-color-2);
  }

  .form-field__input{
    background: var(--bg-color);
    border: 2px solid var(--font-color);
    color: var(--font-color);
  }

  .form-field__input.form-field--error{
    border-color: var(--accent-color-2);
  }
</style>
