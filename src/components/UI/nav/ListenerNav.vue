<template>

    <router-link to="/liked" class="icon-link">
        <img src="@/assets/images/liked_icon.svg" alt="Избранное">
        <div class="icon-link__text"><span>Избранное</span></div>
    </router-link>
    <router-link to="/my-playlists" class="icon-link">
        <img src="@/assets/images/playlist_icon.svg" alt="Мои плейлисты">
        <div class="icon-link__text"><span>Мои плейлисты</span></div>
    </router-link>    

</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'ListenerNav'
})
</script>
