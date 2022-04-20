<template>
    <li class="music-list-item">
        <div class="music-list-item__info">
            <h5 class="music-list-item__info__title heading-tretriary">{{songData.name}}</h5>
            <!-- add is featured -->
            <p v-for="artist in songData.artists" :key="artist.artistId" class="music-list-item__info__artist main-text">{{artist.artist.stagename}}</p>
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
        width: 100%;
        display: flex;
        border-bottom: 1px solid var(--font-color);
        cursor: pointer;
        transition: .3s;
    }

    .music-list-item:hover{
        transform: scale(1.1) translate(-2px, -3px);
    }
    /* .music-list-item__cover-img{
        width: 4rem;
    } */

    .music-list-item__info{
        width: 100%;
    }

    .music-list-item__buttons{
        display: flex;
        justify-content: space-evenly;
    }

    .music-list-item__info__artist{
        opacity: .8;
    }
</style>
