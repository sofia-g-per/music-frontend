<template>
    <li class="music-list-item">
        <div class="music-list-item__info">
            <h2 class="music-list-item__info__title heading-tretriary">{{songData.name}}</h2>
            <!-- add is featured -->
            <div class="music-list-item__artist-wrapper">
                <p v-for="artist in songData.artists" :key="artist.artistId" class="music-list-item__info__artist main-text">{{artist.artist.stagename}}</p>
            </div>
        </div>
        <slot class="music-list-item__buttons" name="music-item-buttons">

        </slot>
    </li>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: "MusicListItem",
    props: [
        'songData'
    ]

})
</script>
<style scoped>
    .music-list-item{
        width: 80%;
        padding: 1vw 1vw 2vw 1vw;
        display: flex;
        border-bottom: 1px solid var(--font-color);
        cursor: pointer;
        transition: .3s;
    }

    .music-list-item:hover{
        transform: scale(1.025) translate(-1px, -2px);
    }

    .music-list-item__info{
        width: 100%;
    }

    .music-list-item__buttons{
        display: flex;
        justify-content: space-evenly;
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
