<template>
    <div class="add-song-page-wrapper">
        <edit-song-form>

        </edit-song-form>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import EditSongForm from '@/components/forms/EditSongForm.vue'
export default defineComponent({
    name: "EditSongPage",
    components: {
        EditSongForm
    },
})
</script>
