<template>
    <li class="music-list-item" @click="playSong">
        <div class="music-list-item__info">
            <h2 class="music-list-item__info__title heading-tretriary">{{songData.name}}</h2>
            <div class="music-list-item__artist-wrapper">
                <p v-for="artist in songData.artists" :key="artist.artistId" class="music-list-item__info__artist main-text">
                    {{artist.isFeatured? "feat. "+ artist.artist.stagename: artist.artist.stagename}}
                </p>
            </div>
        </div>
            <slot>

            </slot>
    </li>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { PlayingPlaylist } from '@/interfaces/currentPlaylist';
export default defineComponent({
    name: "MusicListItem",
    props: [
        'songData',
        'playlist',
        'playlistType',
        'songInPlaylistId'

    ],
    methods:{
        playSong(){
            let playlistToPlay = new PlayingPlaylist;
            playlistToPlay.type = this.playlistType;
            if(this.playlist.songs[0].song){
                playlistToPlay.playlist = this.playlist.songs.map(song=>{
                    return song = song.song
                })
            }else{
                playlistToPlay.playlist = this.playlist;

            }
            this.$store.dispatch('handleClickSong', {
                songInPlaylistId: this.songInPlaylistId,
                playlistToPlay: playlistToPlay
            })
        },
    }

})
</script>
<style scoped>

</style>
