<template>
    <the-search-bar :searchAPIURL="searchUrl" @onSearchResponse="handleSearchResponse" :withFilters="true">
    </the-search-bar>
    <div v-if="songs && songs.length > 0" class="song-list">
        <music-list-item
            v-for="song in songs" :key="song.id" :songData="song"
        >
            <template v-if="isAuth">
                <button class="icon-btn" @click.stop="likeSong(song.id)">
                    🤍
                </button>
            </template>
        </music-list-item>
    </div>
    <div v-else class="page-error">
        <span>К сожалению, по вашему запросу ничего не найдено</span>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TheSearchBar from '@/components/UI/TheSearchBar.vue'
import MusicListItem from '@/components/songs/MusicListItem.vue'
import axios from 'axios'
export default defineComponent({
    name: 'HomePage',
    components:{
        TheSearchBar,
        MusicListItem
    },
    data() {
        return {
            songs: [],
            genres: [],
            genreIds: []
        }
    },
    mounted(){
        axios.get(this.getSongsURL)
       .then((response) => {
              if(response.status === 200 && response.data){
                  this.songs = response.data;
              }

        })

        axios.get(`${this.$store.state.APIURL}${this.$store.state.APIExtensions.getGenres}`)
        .then((response) => {
          if(response.status === 200 && response.data){
              this.genres =  response.data;
          }
       })
        .catch((error)=>{
              console.log(error)
        })
    },
    computed: {
        getSongsURL(){
            return this.$store.getters.fullURL('getSongs')
        },
        searchUrl(){
            return this.$store.getters.fullURL('globalSearch')
        },
        likeSongUrl(){
            return this.$store.getters.fullURL('likeSong')
        },
        isAuth(){
            return this.$store.state.isAuth;
        }
    },
    methods: {
        handleSearchResponse(response:[]){
            this.songs = response;
        },
        likeSong(songId:number){
            const like = {songId: songId}
            axios.post(this.likeSongUrl, like, {withCredentials: true})
            .then((response) => {
              if(response.status === 200 && response.data){
                  this.songs = response.data;
              }

            })
            .catch((error) =>{
                console.log(error)
            })
        }
    },

})
</script>
