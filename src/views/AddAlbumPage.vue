<template>
        <add-album-form>

        </add-album-form>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AddAlbumForm from '@/components/forms/AddAlbumForm.vue'
export default defineComponent({
    name: "AddAlbumPage",
    components: {
        AddAlbumForm
    },
})
</script>
