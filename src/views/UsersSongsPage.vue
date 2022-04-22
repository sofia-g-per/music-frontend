<template>
    <router-link class="circle-btn align-right" to="/add-song"></router-link>

    <div class="song-list" v-if="songs && songs.length > 0">
        <music-list-item v-for="song in songs" :key="song.id" :songData="song">
            <slot>
                <button @click.stop="handleDelete(song.id)" class="delete-btn">x</button>
            </slot>
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
        axios.get(this.getSongsApiURL, {withCredentials: true})
       .then((response) => {
              if(response.status === 200 && response.data){
                  this.songs = response.data;
              }
        })
    },
    computed:{
        getSongsApiURL(){
            return this.$store.getters.fullURL('getCurrentArtistSongs');
        },
        deleteApiURL(){
            return this.$store.getters.fullURL('deleteSong');
        }
    },
    methods:{
        handleDelete(songId){
            const data = {
                songId: songId
            }
            axios.post(this.deleteApiURL, data, {withCredentials: true})
            .then((response) => {
                console.log(response)
                if(response.status === 201){
                    let index = this.songs.findIndex((song)=>song.id = songId);
                    this.songs.splice(index, 1);
                    console.log('delete executed')
                }
            })
            }
    }
})
</script>
