<template>
    <div class="add-playlist-page-wrapper">
        <add-playlist-form>

        </add-playlist-form>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AddPlaylistForm from '@/components/forms/AddPlaylistForm.vue'
export default defineComponent({
    name: "AddPlaylistPage",
    components: {
        AddPlaylistForm
    },
})
</script>
