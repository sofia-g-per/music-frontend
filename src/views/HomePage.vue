<template>
    <the-search-bar></the-search-bar>
    <div v-if="searchResults" class="song-list">
        <music-list-item
            v-for="result in searchResults" :key="result.id"
        >

        </music-list-item>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TheSearchBar from '@/components/UI/TheSearchBar.vue'
import MusicListItem from '@/components/songs/MusicListItem.vue'
export default defineComponent({
    name: 'HomePage',
    components:{
        TheSearchBar,
        MusicListItem
    },
    data() {
        return {
            searchResults: [],
        }
    },
})
</script>
