<template>
    <div class="add-song-page-wrapper">
        <edit-album-form>

        </edit-album-form>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import EditAlbumForm from '@/components/forms/EditAlbumForm.vue'
export default defineComponent({
    name: "EditAlbumPage",
    components: {
        EditAlbumForm
    },
})
</script>
