<template>
    <router-link to="/my-songs">Мои песни</router-link>    
    <router-link to="/my-albums">Мои альбомы</router-link>    
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: "ArtistNav"
})
</script>
