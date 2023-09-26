<template>
  <the-header></the-header>
  <div :class="{'page-wrapper':true, 'page-wrapper--collapsed':isSongListOpen}">
    <router-view></router-view>

  </div>

<!-- проигрываемая песня -->
  <Transition name="slide-from-bottom">
    <playing-song-footer 
      v-if="playing && !routeExcludesFooter" 
      :songData="playing.song"
      :playlist="playing.playlist"
      :songAudio="playing.songAudio"
      @onToggleSongList="handleToggleSongList"
    >
    </playing-song-footer>
  </Transition>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PlayingSongFooter from './components/songs/PlayingSongFooter.vue'
import TheHeader from './components/UI/TheHeader.vue'
import { Transition } from 'vue'

export default defineComponent({
  components:{
    TheHeader,
    PlayingSongFooter,
    Transition
  },
  data() {
    return {
      // playlist: PlayingPlaylist,
      isSongListOpen:false,
      routeExcludesFooter: false,
      //массива наименований маршрутов на которых не показывается элемент проигрывания песни
      routesToExcludeOn: [
        'edit-profile',
        'edit-album',
        'edit-playlist',
        'edit-song',
        'add-song',
        'add-album',
        'signup',
        'login',
      ]
    }
  },
  computed:{
    playing(){
      if(this.$store.state.currentSongDefined){
        const playing = {
          song: null,
          playlist: null,
          songAudio :null
        }
        const song =  this.$store.state.currentPlaylist.playlist.songs[this.$store.state.currentSongId];

        playing.songAudio = this.$store.state.currentSongAudio;
        playing.playlist = this.$store.state.currentPlaylist.playlist;
        if(song.song){
          playing.song = song.song;
        }else{
          playing.song = song
        }

        return playing;
      }else{
        return {};
      }
    },
    
  },
  methods: {
    handleToggleSongList(isOpen:boolean){
      this.isSongListOpen = isOpen;
    },
    // updateAudio(){
    //   if(this.$store.state.currentSongAudio && this.playing){
    //     this.playing.songAudio = this.$store.state.currentSongAudio;
    //     console.log("updating audio",this.playing.songAudio.seek());

    //   }
    // }
  },
  watch:{
      $route(to, from){
          if (this.routesToExcludeOn.includes(to.name)){
            this.$store.dispatch('pauseCurrentSong');
            this.routeExcludesFooter = true;
          }else{
            this.routeExcludesFooter = false;

          }

      }
  },
  // mounted() {
  //   setInterval(this.updateAudio, 500);
  // }
})
</script>

<style  src="@/assets/styles/common.css"></style>
<style  src="@/assets/styles/UI/btns/circleBtn.css"></style>
<style  src="@/assets/styles/UI/btns/iconBtn.css"></style>
<style  src="@/assets/styles/UI/btns/mainBtn.css"></style>
<style  src="@/assets/styles/UI/btns/iconLink.css"></style>
<style  src="@/assets/styles/UI/btns/editBtn.css"></style>
<style  src="@/assets/styles/UI/btns/likeBtn.css"></style>
<style  src="@/assets/styles/UI/searchbar.css"></style>
<style  src="@/assets/styles/UI/genreFilters.css"></style>
<style  src="@/assets/styles/UI/form.css"></style>
<style  src="@/assets/styles/components/musicListItem.css"></style>
<style  src="@/assets/styles/components/songList.css"></style>
<style>
 
</style>
