<template>
    <li class="music-list-item img-text--small-img" @click="playSong">
        <song-info  :songData="songData">
            <slot></slot>
        </song-info>

    </li>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { PlayingPlaylist } from '@/interfaces/currentPlaylist';
import SongInfo from './SongInfo.vue';
export default defineComponent({
    name: "MusicListItem",
    components: {
        SongInfo
    },
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
            playlistToPlay.isShuffled = false;
            if(this.playlist.songs[0].song){
                playlistToPlay.playlist = this.playlist.songs.map(song=>{
                    return song = song.song
                })
            }else{
                playlistToPlay.playlist = JSON.parse(JSON.stringify(this.playlist));

            }
            this.$store.dispatch('handleClickSong', {
                songInPlaylistId: this.songInPlaylistId,
                playlistToPlay: playlistToPlay
            })
        },
    }, 
    computed: {
        coverImgURL(){
            return this.songData.coverImg? this.$store.getters.filePath(
                'songs',
                this.songData.coverImg
            ) : ''
        }
    }

})
</script>
<style scoped>

</style>
