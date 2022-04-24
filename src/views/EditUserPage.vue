<template>
    <div class="add-song-page-wrapper">
        <edit-user-form>

        </edit-user-form>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import EditUserForm from '@/components/forms/EditUserForm.vue'
export default defineComponent({
    name: "EditAlbumPage",
    components: {
        EditUserForm
    },
})
</script>
