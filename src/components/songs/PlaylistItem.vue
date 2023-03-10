<template>
    <router-link :class="itemMainClass" :to="playlistLink">
        <slot></slot>
        <p :class="`${itemMainClass}__song-list`">
            <span  v-for="song in itemData.songs" 
                :key="song.id">{{ song.name }} 
                <span v-for="artist in song.artists" :key="artist.artistId" class="music-list-item__info__artist main-text">
                    {{artist.isFeatured? "feat. "+ artist.artist.stagename: artist.artist.stagename}}
                </span>
            </span>
        </p>
        <h3 :class="`${itemMainClass}__title`">{{itemData.name}}</h3>
        <!-- <music-list-item
        class="playlist__song"
         v-for="(song, key) in itemData.songs" 
                :key="song.id"
                :songData="song.song? song.song : song"
                :playlist="itemData"
                playlistType="liked"
                :songInPlaylistId="key"
        >

        </music-list-item> -->


        <!-- <div class="playlist-wrapper__songs">
            <p class="playlist-wrapper__songs__song" v-for="(song, id) in itemData.songs" :key="song.id">{{id+1}} {{song.song.name}}</p>
        </div> -->
    </router-link>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
// import MusicListItem from './MusicListItem.vue'
export default defineComponent({
    name: "PlaylistItem",
    props: ['itemData'],
    components:{
        // MusicListItem
    },
    computed:{
        itemMainClass(){
            return this.itemData.type && this.itemData.type == "album"? "album-card": "playlist-card";
        },
        playlistLink(){
            let link = `/${this.itemData.type}`;
            console.log(this.itemData.id)
            if(this.itemData.id){
                link += `/${this.itemData.id}`;
            }
            console.log(link);
            return link;
        }

    }

})
</script>

<style scoped>

    .playlist-card{
        width: 20rem;
        border-radius: 1.5rem;
        padding-bottom: 40%;
        padding-left: 1.5rem;
        padding-right: 1.5rem;
        padding-top: 40%;
        display: flex;
        flex-direction: column;
        position: relative;
        box-sizing: content-box;
    }

    .playlist-card:nth-child(2n -1){
        background: linear-gradient(225deg, #27DABA 9.33%, #01D10A 92.67%);
        }

    .playlist-card:nth-child(3n -1){
        background: linear-gradient(225deg, #FA7474 9.33%, #F1BC01 92.67%);
        }

    .playlist-card:nth-child(3n){
        background: linear-gradient(225deg, #FA7474 9.33%, #C001F1 92.67%);
    }

    .playlist-card__title{
        font-size: 2.4rem;
        font-weight: normal;
        text-align: center;
        z-index: 1;
    }

    .playlist-card__song-list{
        z-index: 0;
        text-align: center;
        padding: 1rem 0 ;
    }
</style>