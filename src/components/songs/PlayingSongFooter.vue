<template>
    <li class="music-list-item">
        <div v-if="songData.coverImg" class="music-list-item__cover-img">
            <img class="music-list-item__cover-img__img" :src="songData.coverImg" alt="Обложка песни {{songData.name}}">
        </div>
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
                play
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
    .music-list-item{
        width: 100%;
        display: flex;
    }

    .music-list-item__cover-img{
        width: 4rem;
    }

    .music-list-item__info{
        width: 100%;
    }
    .music-list-item__buttons{
        display: flex;
        justify-content: space-evenly;
    }
</style>
