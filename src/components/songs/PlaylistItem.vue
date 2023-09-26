<template>
    <router-link :class="itemMainClass" :to="playlistLink" v-if="itemData.songs && itemData.songs.length > 0">
        <slot >
        </slot>
        <img v-if="itemData.coverImg" :src="coverImgLink" alt="Обложка">
        <div :class="`${itemMainClass}__content`">
        <h3 :class="`${itemMainClass}__title`">{{itemData.name}}</h3>
        <div v-if="itemData.artists">
            <p v-for="artist in itemData.artists" :key="artist.artistId" class="music-list-item__info__artist main-text">
                {{artist.isFeatured? "feat. "+ artist.artist.stagename: artist.artist.stagename}}
            </p>
        </div>
        <div :class="`${itemMainClass}__song-list`">
            <div v-for="(song, key) in itemData.songs" 
                :key="song.song? song.song.id: song.id">
                    {{key+1+'.'}} {{ song.song? song.song.name: song.name }} 
                <p v-for="artist in song.song? song.song.artists: song.artists" :key="artist.artistId" class="music-list-item__info__artist main-text">
                    {{artist.isFeatured? "feat. "+ artist.artist.stagename: artist.artist.stagename}}
                </p>
            </div>
        </div>
        </div>
    </router-link>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
// import MusicListItem from './MusicListItem.vue'
export default defineComponent({
    name: "PlaylistItem",
    props: ['itemData', 'itemType'],
    components:{
        // MusicListItem
    },
    computed:{
        itemMainClass(){
            return this.itemData.coverImg? "album-card": "playlist-card";
        },
        playlistLink(){
            // if(this.itemData.type){
            //     return `/${this.itemData.type}`;
            // }
            // if
            let link = `/${this.itemType}`;
            if(this.itemData.id){
                link += `/${this.itemData.id}`;
            }
            return link;
            
        },
            coverImgLink(){
                return this.itemData.coverImg? this.$store.getters.filePath(
                'coverImg',
                this.itemData.coverImg) : '';
            }
        

    }

})
</script>

<style scoped src="@/assets/styles/components/playlistAlbumCard.css"></style>