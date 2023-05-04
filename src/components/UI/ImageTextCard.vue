<template>
    <div class="img-text">
        <div  class="img-text__img-wrapper">
            <slot name="image">
            </slot>
        </div>
        <div class="music-list-item__info">
            <div class="music-list-item__info__title heading-tretriary">
                <slot name="main-text" ></slot>

            </div>
            <div class="music-list-item__artist-wrapper music-list-item__info__artist main-text">
                <slot name="secondary-text" >
                </slot>
            </div>

        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
    name: "ImageTextCard",
})
</script>
<style scoped>
    .img-text{
        display: flex;
    }

    .img-text__img-wrapper{
        width: 30%;
    }
</style>
