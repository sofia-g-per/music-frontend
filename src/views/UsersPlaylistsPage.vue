<template>
    <router-link class="btn" to="/add-playlist">Добавить плейлист</router-link>
    <div class="song-list">
        <div v-for="playlist in playlists" :key="playlist.id">
            <h6>{{playlist.name}}</h6>
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
