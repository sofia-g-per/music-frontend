<template>
        <the-search-bar :searchAPIURL="searchAPIURL" @onSearchResponse="handleSearchResponse" :withFilters="false" />
        <h1 class="page-title">Ваши избранные песни</h1>
        <ul class="song-list" v-if="songs">
            <music-list-item @click="playSong(song.song.id)"
                v-for="song in songs" 
                :key="song.id"
                :songData="song.song"
                :onSearchReponse="handleSearchResponse"
            >
            <slot >
                <button @click.stop="handleDelete(song.song.id)" class="delete-btn">x</button>
            </slot>
            </music-list-item>
        </ul>
        <p v-else>У вас ещё нет избранных песен</p>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { PlayingPlaylist } from '@/interfaces/currentPlaylist';
import MusicListItem from '@/components/songs/MusicListItem.vue';
import TheSearchBar from '@/components/UI/TheSearchBar.vue';
import axios from 'axios';

export default defineComponent({
    name: "LikedPage",
    components: {
        MusicListItem,
        TheSearchBar
    },
    data(){
        return{
            songs: [],
        }
    },
    computed: {
        fullApiUrl():string {
            return `${this.$store.state.APIURL}${this.$store.state.APIExtensions.getFavouriteSongs}`;
        }, 
        searchAPIURL(){
            return `${this.$store.state.APIURL}${this.$store.state.APIExtensions.searchFavouriteSongs}`;
        },
        deleteApiURL(){
            return `${this.$store.state.APIURL}${this.$store.state.APIExtensions.deleteLiked}`;
        }
    },
    mounted(){
        axios.get(this.fullApiUrl, { withCredentials: true })
       .then((response) => {
              if(response.status === 200 && response.data){
                  this.songs = response.data;
              }

        })
        .catch((error) =>{
            // если пользователь не авторизован
            if(error.response && error.response.status === 403) {
                  this.$router.push({name: 'login'})
              }
        })
    },
    methods: {
        playSong(songId:number ){
            let playlistToPlay = new PlayingPlaylist;
            playlistToPlay.type = "liked";
            playlistToPlay.playlist = this.songs;
            let songInPlaylistId = this.songs.findIndex(song => song.song.id === songId )
            this.$store.dispatch('handleClickSong', {
                songInPlaylistId,
                playlistToPlay
            })
        },
        handleSearchResponse(response:[]){
            this.songs = response;
        },
        handleDelete(songId:number){
            const songData= {songId: songId};
            console.log(songId);
            axios.post(this.deleteApiURL, songData, {withCredentials: true})
            .then((response)=>{
                if(response.status === 201 && response.data){
                    let index = this.songs.findIndex((song)=>song.id = songId);
                    this.songs.splice(index, 1);
                }
            })
            .catch((error)=>{
                console.log(error)
            })

        }
    }
    
})
</script>

<style scoped>
    .delete-btn{
        color: var(--font-color);
        font-size: 4rem;
        background: none;
        outline: none;
        border: none;
    }
</style>