<template>
  <the-header></the-header>

  <router-view></router-view>

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
      console.log('currentSong changed')
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

    --main-font-family: sans-serif;
  }
  /* ------------------------------ */
  /* GENERAL */
  /* ------------------------------ */
  body{
    background-color: var(--bg-color);
    color: var(--font-color);
    font-family: var(--main-font-family);
    box-sizing: border-box;
  }

  *{
    margin: 0;
  }

  /* ------------------------------ */
  /* TEXT */
  /* ------------------------------ */
  .section-heading{

  }

  
  /* ------------------------------ */
  /* CONTAINERS */
  /* ------------------------------ */
  .container--2-clmn{
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  /* ------------------------------ */
  /* FORM */
  /* ------------------------------ */
  .form-field{
    display: flex;
    flex-direction: column;
    gap: 2rem;
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
