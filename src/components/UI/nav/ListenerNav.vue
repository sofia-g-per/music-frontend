<template>
    <router-link to="/home">Главная</router-link>
    <router-link to="/liked">Избранное</router-link>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'ListenerNav'
})
</script>
