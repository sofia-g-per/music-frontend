<template>
    <div class="add-song-page-wrapper">
        <edit-playlist-form>

        </edit-playlist-form>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import EditPlaylistForm from '@/components/forms/EditPlaylistForm.vue'
export default defineComponent({
    name: "EditPlaylistPage",
    components: {
        EditPlaylistForm
    },
})
</script>
