<template>
    <div >
        <h1>HOME</h1>
        <ul class="song-list" v-if="songs">
            <music-list-item @click="playSong(song.song.id)"
                v-for="song in songs" 
                :key="song.id"
                :songData="song.song"
            ></music-list-item>
        </ul>
        <p v-else>У вас ещё нет избранных песен</p>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { PlayingPlaylist } from '@/interfaces/currentPlaylist';
import MusicListItem from '@/components/songs/MusicListItem.vue';
import axios from 'axios';

export default defineComponent({
    name: "HomePage",
    components: {
        MusicListItem
    },
    data(){
        return{
            songs: [],
        }
    },
    computed: {
        fullApiUrl():string {
            return `${this.$store.state.APIURL}${this.$store.state.APIExtensions.getFavouriteSongs}`;
        }
    },
    mounted(){
        axios.get(this.fullApiUrl, { withCredentials: true })
       .then((response) => {
              if(response.status === 200 && response.data){
                  this.songs = response.data;
                  console.log('songs',this.songs);
              }

        })
        .catch((error) =>{
            console.log(error);
            // если пользователь не авторизован
            if(error.response && error.response.status === 403) {
                  this.$router.push({name: 'login'})
              }
        })
    },
    methods: {
        // emit event instead
        playSong(songId:number ){
            console.log('clicked')
            let playlistToPlay = new PlayingPlaylist;
            playlistToPlay.type = "liked";
            playlistToPlay.playlist = this.songs;
            let songInPlaylistId = this.songs.findIndex(song => song.song.id === songId )
            this.$store.dispatch('handleClickSong', {
                songInPlaylistId,
                playlistToPlay
            })
        }
    }
    
})
</script>
