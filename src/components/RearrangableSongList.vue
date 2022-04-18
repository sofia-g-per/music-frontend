<template>
    <draggable class="song-list" v-model="myList">
        <music-list-item>

        </music-list-item>
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
                return this.$store.state.myList
            },
            set(value) {
                // emit change
                this.$store.commit('updateList', value)
            }
        }
    }
})
</script>
