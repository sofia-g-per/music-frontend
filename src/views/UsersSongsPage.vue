<template>
    <router-link class="main-btn" to="/add-song">Добавить песню</router-link>
    <div class="song-list">
        <music-list-item v-for="song in songs" :key="song.id" :songData="song">

        </music-list-item>
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
