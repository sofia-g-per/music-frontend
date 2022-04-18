<template>
    <div class="music-item-wrapper">
        <div class="music-item__header">
            <div class="music-item__header__img">
                <img src="" alt="">
            </div>
            <div class="music-item__header__info">
                <h3 class="heading-secondary">Title</h3>
                <p class="">artists</p>
            </div>
            <div class="song-list">
                <music-list-item>

                </music-list-item>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import MusicListItem from '@/components/songs/MusicListItem.vue'
export default defineComponent({
    name: "SongCollectionPage",
    components: {
        MusicListItem
    },
    mounted(){
        // get from db
    }
})
</script>
