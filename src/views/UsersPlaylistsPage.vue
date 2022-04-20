<template>
    <router-link class="main-btn" to="/add-playlist">Добавить плейлист</router-link>
    <div class="item-grid">
        <div class="playlist-wrapper" v-for="playlist in playlists" :key="playlist.id">
            <h3>{{playlist.name}}</h3>
            <div class="playlist-wrapper__songs">
                <p class="playlist-wrapper__songs__song" v-for="song, id in playlist.songs" :key="song.id">{{id+1}} {{song.song.name}}</p>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import axios from 'axios'
export default defineComponent({
    name:"UsersSongsPage",
    components:{
    },
    data() {
        return {
            playlists: [],
        }
    },
    mounted(){
        axios.get(this.apiURL, {withCredentials: true})
       .then((response) => {
              if(response.status === 200 && response.data){
                  this.playlists = response.data;
                  console.log(this.playlists);
              }

        })
    },
    computed:{
        apiURL(){
            return this.$store.getters.fullURL('getUsersPlaylists');
        }
    }
})
</script>

<style scoped>
    .item-grid{
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 5rem;
        min-width: 60vw;
    }
 .playlist-wrapper{
    border: 2px solid white;
    min-height: 8rem;
    flex-direction: column;
    display: flex;
    /* justify-content: center; */
    padding: 1rem;
 }

 .playlist-wrapper__songs__song{
     padding-left: 1rem;
     opacity: .7;
     display: flex;
     flex-direction: column;
     gap: 1rem;
     padding-top: 1rem;
 }
</style>