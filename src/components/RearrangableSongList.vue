<template>
    <draggable 
    class="song-list" 
    v-model="myList"
    @start="drag=true" 
    @end="drag=false">
      <template #item="{element, index}">
        <music-list-item :playlist="myList" playlist-type="query" :songData="element" :songInPlaylistId="index">

        </music-list-item>
    </template>

    </draggable>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import draggable from 'vuedraggable'
import MusicListItem from './songs/MusicListItem.vue'

export default defineComponent({
    components: {
        draggable,
        MusicListItem
    },
    computed: {
        myList: {
            get() {
                // get
                return this.$store.state.currentPlaylist.playlist;
            },
            set(value) {
                // emit change
                this.$store.dispatch('updateCurrentPlaylist', {newPlaylistOrder: value})
            }
        }
    }
})
</script>
