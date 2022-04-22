<template>
    <router-link class="circle-btn align-right" to="/add-playlist"></router-link>

    <div v-if="playlists  && playlists.length > 0" class="item-grid">
        <div class="playlist-wrapper" v-for="playlist in playlists" :key="playlist.id">
            <h3 class="playlist-title">{{playlist.name}}</h3>
            <div class="playlist-wrapper__songs">
                <p class="playlist-wrapper__songs__song" v-for="song, id in playlist.songs" :key="song.id">{{id+1}} {{song.song.name}}</p>
            </div>
        </div>
    </div>
    <div v-else>
        <p class="no-results">У вас пока нет добавленных плейлистов</p>
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
    padding: 2rem 2rem 4rem 2rem;
 }

 .playlist-wrapper__songs__song{
     padding-left: 2rem;
     opacity: .7;
     display: flex;
     flex-direction: column;
     gap: 1rem;
     padding-top: 1rem;
     font-size: 1.5rem;
 }

 .playlist-title{
     font-size: 3rem;
 }
</style>