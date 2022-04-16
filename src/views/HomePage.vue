<template>
    <div >
        <h1>HOME</h1>
        <ul class="song-list" v-if="songs">
            <music-list-item 
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
              console.log(response, this);
              if(response.status === 200 && response.data){
                  console.log('correct');
                  this.songs = response.data;
                  console.log(this.songs);
                  //redirect + save user to state
              }
        })
        .catch(function(error){
              console.log(error, this);
        })
    }
    
})
</script>
