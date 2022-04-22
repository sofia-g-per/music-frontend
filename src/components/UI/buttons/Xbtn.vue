<template>
    <button class="delete-btn">x</button>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: "XBtn"
})
</script>

<style scoped>
    .delete-btn{
        color: var(--font-color);
        font-size: 4rem;
        background: none;
        outline: none;
        border: none;
    }
</style>