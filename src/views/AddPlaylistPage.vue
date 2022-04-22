<template>
        <add-playlist-form>

        </add-playlist-form>
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
