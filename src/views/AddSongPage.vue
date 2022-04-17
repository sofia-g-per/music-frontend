<template>
    <div class="add-song-page-wrapper">
        <add-song-form>

        </add-song-form>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AddSongForm from '@/components/forms/AddSongForm.vue'
export default defineComponent({
    name: "AddSongPage",
    components: {
        AddSongForm
    },
})
</script>
