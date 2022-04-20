<template>
    <the-search-bar :searchAPIURL="searchUrl" @onSearchResponse="handleSearchResponse" />
    <div v-if="songs" class="song-list">
        <music-list-item
            v-for="song in songs" :key="song.id" :songData="song"
        >
        </music-list-item>
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
        }
    },
    mounted(){
        axios.get(this.getSongsURL)
       .then((response) => {
              if(response.status === 200 && response.data){
                  this.songs = response.data;
              }

        })
        // .catch((error) =>{
        // })
    },
    computed: {
        getSongsURL(){
            return this.$store.getters.fullURL('getSongs')
        },
        searchUrl(){
            return this.$store.getters.fullURL('globalSearch')
        }
    },
    methods: {
        handleSearchResponse(response:[]){
            this.songs = response;
        }
    }
})
</script>
