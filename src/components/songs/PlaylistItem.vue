<template>
    <div class="playlist-wrapper">
        <slot></slot>
        <h3 class="playlist-title">{{itemData.name}}</h3>
        <music-list-item
        class="playlist__song"
         v-for="(song, key) in itemData.songs" 
                :key="song.id"
                :songData="song.song? song.song : song"
                :playlist="itemData"
                playlistType="liked"
                :songInPlaylistId="key"
        >

        </music-list-item>


        <!-- <div class="playlist-wrapper__songs">
            <p class="playlist-wrapper__songs__song" v-for="(song, id) in itemData.songs" :key="song.id">{{id+1}} {{song.song.name}}</p>
        </div> -->
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import MusicListItem from './MusicListItem.vue'
export default defineComponent({
    name: "PlaylistItem",
    props: ['itemData'],
    components:{
        MusicListItem
    },
    mounted() {
        console.log('playlist', this.itemData);
    }
})
</script>

<style scoped>

 .playlist-wrapper{
     position: relative;
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

 .playlist__song{
     margin-left: 4rem;
 }
</style>