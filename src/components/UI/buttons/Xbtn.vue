<template>
    <button class="delete-btn btn--grey"><span>x</span></button>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: "XBtn"
})
</script>

<style scoped>
    .delete-btn{
      cursor: pointer;
        color: var(--font-color);
        font-size: 2rem;
        background: none;
        outline: none;
        border: none;
        display: flex;
        align-items: center;
        justify-content: center;
    }

</style>