<template>
    <router-link class="circle-btn align-right" to="/add-song"></router-link>

    <div class="song-list" v-if="songs && songs.length > 0">
        <music-list-item v-for="song in songs" :key="song.id" :songData="song">
            <template v-slot>
                <div class="music-list-item__buttons">
                    <edit-btn @click.stop :link="'/edit-song/'+song.id"></edit-btn>
                    <xbtn @click.stop="handleDelete(song.id)">x</xbtn>
                </div>
            </template>
        </music-list-item>
    </div>
    <div v-else>
        <p class="no-results">У вас пока нет добавленных песен</p>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import MusicListItem from '@/components/songs/MusicListItem.vue'
import Xbtn from '@/components/UI/buttons/Xbtn.vue'
import axios from 'axios'
import EditBtn from '@/components/UI/buttons/EditBtn.vue'
export default defineComponent({
    name:"UsersSongsPage",
    components:{
        MusicListItem,
        Xbtn,
        EditBtn
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
                if(response.status === 201){
                    let index = this.songs.findIndex((song)=>song.id = songId);
                    this.songs.splice(index, 1);
                }
            })
        },
    }
})
</script>
