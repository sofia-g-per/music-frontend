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
                    <xbtn></xbtn>
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
        position: absolute;
        display: flex;
        gap: 1rem;
        top: -5%;
        right: -10%;
        transform: translate(-50%, -50%);
    }

    .playlist__edit-buttons>*{
        background: var(--accent-color-1);
        border-radius: 50%;
        width: 5rem;
        height: 5rem;
        display: flex;
        align-items: center;
    }
</style>