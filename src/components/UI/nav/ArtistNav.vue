<template>
    <router-link to="/my-albums" class="icon-link">
        <img src="@/assets/images/add_album_icon.svg" alt="Мои альбомы">
        <span class="icon-link__text"><span>Мои альбомы</span></span> 
    </router-link>    
    <router-link to="/my-songs" class="icon-link">
        <img src="@/assets/images/add_song_icon.svg" alt="Мои песни">
        <span class="icon-link__text"><span>Мои песни</span></span>
    </router-link>    
    <router-link to="/notifications" class="icon-link">
        <font-awesome-icon :icon="['fas', 'bell']" size="2xl" style="color: #c956ff;" alt="Мои оповещения"/>
        <span class="icon-link__text"><span>Мои оповещения</span></span>
    </router-link>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: "ArtistNav"
})
</script>

