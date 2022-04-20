<template>
    <router-link to="/">Главная</router-link>
    <router-link to="/liked">Избранное</router-link>
    <router-link to="/my-playlists">Мои плейлисты</router-link>    

</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'ListenerNav'
})
</script>
