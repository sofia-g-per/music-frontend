<template>
    <router-link class="circle-btn align-right" to="/add-song"></router-link>

    <div class="song-list" v-if="songs && songs.length > 0">
        <music-list-item v-for="song in songs" :key="song.id" :songData="song">
        </music-list-item>
    </div>
    <div v-else>
        <p class="no-results">У вас пока нет добавленных песен</p>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import MusicListItem from '@/components/songs/MusicListItem.vue'
import axios from 'axios'
export default defineComponent({
    name:"UsersSongsPage",
    components:{
        MusicListItem
    },
    data() {
        return {
            songs: [],
        }
    },
    mounted(){
        axios.get(this.apiURL, {withCredentials: true})
       .then((response) => {
              if(response.status === 200 && response.data){
                  this.songs = response.data;
              }

        })
    },
    computed:{
        apiURL(){
            return this.$store.getters.fullURL('getCurrentArtistSongs');
        }
    }
})
</script>
