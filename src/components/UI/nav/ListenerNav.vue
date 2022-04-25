<template>
    <router-link to="/"><img  class="logo" src="@/assets/images/logo.png" alt=""></router-link>
    <router-link to="/liked">Избранное</router-link>
    <router-link to="/my-playlists">Мои плейлисты</router-link>    

</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'ListenerNav'
})
</script>
