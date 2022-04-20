<template>
    <li class="music-list-item playing-song-footer">
        <!-- <div v-if="songData.coverImg" class="music-list-item__cover-img">
            <img class="music-list-item__cover-img__img" :src="songData.coverImg" alt="Обложка песни {{songData.name}}">
        </div> -->
        <div class="music-list-item__info">
            <h3 class="music-list-item__info__title heading-tretriary">{{songData.name}}</h3>
            <!-- add is featured -->
            <p v-for="artist in songData.artists" :key="artist.artistId" class="music-list-item__info__artist main-text">{{artist.artist.stagename}}</p>
        </div>
        <div class="music-list-item__audio">
            <!-- <audio :src="audioPath"></audio> -->
        </div>
        <div class="music-list-item__buttons" >
            <button class="play-btn" @click="onClickPlay">
                <img src="@/assets/images/play-icon.svg" alt="Запустить песню">
            </button>
        </div>
    </li>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: "MusicListItem",
    props: [
        'songData'
    ],
    computed: {
        audioPath(): string{
            let audiopath =  this.$store.getters.filePath(
                'songs',
                this.songData.filePath
            );

            console.log('audioPAth', audiopath);


            return audiopath;
        }
    },
    methods: {
        onClickPlay(){
            this.$store.dispatch('playCurrentSong')
        }
    }

})
</script>
<style scoped>
    .playing-song-footer{
        border-top: 1px solid var(--font-color);
    }
    .music-list-item{
        padding: 1rem 0;
        width: 100%;
        display: flex;
    }

    .music-list-item__info{
        width: 100%;
    }
    .music-list-item__buttons{
        display: flex;
        justify-content: space-evenly;
    }

    .play-btn{
        color: var(--font-color);
        background: none;
        width: 3rem;
        transition: .3s;
        opacity: .6;
    }

    .play-btn:hover{
        /* transform: scale(1.1); */
        opacity: 1;
    }
</style>
