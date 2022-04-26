<template>
    <router-link class="circle-btn align-right" to="/add-album"></router-link>

    <div v-if="albums  && albums.length > 0" class="item-grid">
        <playlist-item 
            v-for="album in albums" 
            :key="album.id" 
            :itemData="album">
            <template v-slot>
                <div class="playlist__edit-buttons">
                    <edit-btn :link="'/edit-album/'+album.id"></edit-btn>
                    <xbtn @click.stop="handleDelete(album.id)"></xbtn>
                </div>
            </template>
        </playlist-item>
    </div>
    <div v-else>
        <p class="no-results">У вас пока нет добавленных альбомов</p>
    </div>

</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PlaylistItem from '@/components/songs/PlaylistItem.vue'
import Xbtn from '@/components/UI/buttons/Xbtn.vue'
import EditBtn from '@/components/UI/buttons/EditBtn.vue'
import axios from 'axios'
export default defineComponent({
    name:"UsersAlbumsPage",
    components:{
        PlaylistItem,
        Xbtn,
        EditBtn
    },
    data() {
        return {
            albums: [],
        }
    },
    mounted(){
        axios.get(this.apiURL, {withCredentials: true})
       .then((response) => {
              if(response.status === 200 && response.data){
                  this.albums = response.data;
                  console.log(this.albums);
              }

        })
    },
    computed:{
        apiURL(){
            return this.$store.getters.fullURL('getCurrentArtistAlbums');
        },
        deleteAlbumApiUrl(){
            return this.$store.getters.fullURL('deleteAlbum');
        }
    },
    methods:{
        handleDelete(albumId:number){
        axios.get(this.deleteAlbumApiUrl, {
            withCredentials: true,
            params: {
                albumId: albumId
            }
        })
       .then((response) => {
              if(response.status === 200){
                    let index = this.albums.findIndex((album)=>
                    {
                        return album.id === albumId
                    });
                    this.albums.splice(index, 1);
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