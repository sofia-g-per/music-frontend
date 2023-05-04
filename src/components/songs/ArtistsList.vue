<template>
    <!-- <div class="music-list-item__artist-wrapper"> -->
        <p v-for="artist in artists" :key="artist.artistId" class="music-list-item__info__artist main-text">
            {{artist.isFeatured? "feat. "+ artist.artist.stagename: artist.artist.stagename}}
        </p>
    <!-- </div> -->
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props: ['artists']
})
</script>
