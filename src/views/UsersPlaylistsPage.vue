<template>
    <router-link class="circle-btn align-right" to="/add-playlist"></router-link>

    <div v-if="playlists  && playlists.length > 0" class="item-grid">
        <playlist-item 
            v-for="playlist in playlists" 
            :key="playlist.id" 
            :itemData="playlist">
            <template v-slot>
                <div class="playlist__edit-buttons">
                    <edit-btn :link="'/edit-playlist/'+playlist.id"></edit-btn>
                    <xbtn @click.stop="handleDelete(playlist.id)"></xbtn>
                </div>
            </template>
        </playlist-item>
    </div>
    <div v-else>
        <p class="no-results">У вас пока нет добавленных плейлистов</p>
    </div>

</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PlaylistItem from '@/components/songs/PlaylistItem.vue'
import Xbtn from '@/components/UI/buttons/Xbtn.vue'
import EditBtn from '@/components/UI/buttons/EditBtn.vue'
import axios from 'axios'
export default defineComponent({
    name:"UsersSongsPage",
    components:{
        PlaylistItem,
        Xbtn,
        EditBtn
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
        },
        deletePlaylistApiUrl(){
            return this.$store.getters.fullURL('deletePlaylist');
        }
    },
    methods:{
        handleDelete(playlistId:number){
        axios.get(this.deletePlaylistApiUrl, {
            withCredentials: true,
            params: {
                playlistId: playlistId
            }
        })
       .then((response) => {
              if(response.status === 200){
                    let index = this.playlists.findIndex((playlist)=>
                    {
                    return playlist.id === playlistId
              });
                    this.playlists.splice(index, 1);
                }
            })
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

    .playlist__edit-buttons{
        display: flex;
        gap: 1rem;
        justify-content: flex-end;
        align-content: center;
        position: relative;
        right: -1rem;
        top: -1rem;
    }

    .playlist__edit-buttons>*{
        background: var(--accent-color-2);
        border-radius: 50%;
        width: 3rem;
        height: 3rem;
        display: flex;
        align-items: center;
    }
</style>