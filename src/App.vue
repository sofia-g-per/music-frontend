<template>
  <div id="nav">
    <!-- <router-link to="/">Login</router-link> |
    <router-link to="/about">About</router-link> -->
  </div>

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

export default defineComponent({
  components:{
    PlayingSongFooter
  },
  computed:{
    currentSong(){
      console.log('currentSong changed')
      if(this.$store.state.currentSongId !== null){
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
</style>
