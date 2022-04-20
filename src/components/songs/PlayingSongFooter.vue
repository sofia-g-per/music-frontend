<template>
    <li class="music-list-item playing-song-footer">
        <div class="music-list-item__info">
            <h2 class="music-list-item__info__title heading-tretriary">{{songData.name}}</h2>
           <div class="music-list-item__artist-wrapper">
                <p v-for="artist in songData.artists" :key="artist.artistId" class="music-list-item__info__artist main-text">{{artist.artist.stagename}}</p>
           </div>
        </div>
        <div class="music-list-item__audio">
        </div>
        <div class="music-list-item__buttons" >
            <button class="play-btn icon-btn" @click="onClickPlay">
                    <svg  fill="white" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                        viewBox="0 0 490 490" style="enable-background:new 0 0 490 490;" xml:space="preserve">
                    <path d="M0.665,0v490l488.669-245L0.665,0z M15.977,24.806L455.183,245L15.977,465.208V24.806z"/>
                    <g>
                    </g>
                    <g>
                    </g>
                    <g>
                    </g>
                    <g>
                    </g>
                    <g>
                    </g>
                    <g>
                    </g>
                    <g>
                    </g>
                    <g>
                    </g>
                    <g>
                    </g>
                    <g>
                    </g>
                    <g>
                    </g>
                    <g>
                    </g>
                    <g>
                    </g>
                    <g>
                    </g>
                    <g>
                    </g>
                    </svg>
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
        box-sizing: border-box;
        border-top: 1px solid rgba(255, 255, 255, 0.349);
        padding: 2rem 5rem !important;
        background: linear-gradient(rgb(17, 0, 36), rgba(0, 0, 0, 1));
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

        .music-list-item__artist-wrapper{
        padding: 1rem 1rem 0 1rem;
        display: flex;
        flex-direction: column;
        gap: .5rem;

    }

    .music-list-item__info__artist{
        opacity: .8;
    }
</style>
