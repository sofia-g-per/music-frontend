<template>
    <div class="img-text">
        <div :hidden="!coverImgURL" class="music-list-item__img-wrapper">
            <img :src="coverImgURL" alt="Обложка песни">
        </div>
        <div class="music-list-item__info">
            <h2 class="music-list-item__info__title heading-tretriary">{{songData.name}}</h2>
            <div class="music-list-item__artist-wrapper">
                <p v-for="artist in songData.artists" :key="artist.artistId" class="music-list-item__info__artist main-text">
                    {{artist.isFeatured? "feat. "+ artist.artist.stagename: artist.artist.stagename}}
                </p>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
    name: "MusicListItem",
    props: [
        'songData',
    ],
    methods:{
       
    }, 
    computed: {
        coverImgURL(){
            return this.songData.coverImg? this.$store.getters.filePath(
                'songs',
                this.songData.coverImg
            ) : ''
        }
    }

})
</script>
<style scoped>
    .img-text{
        display: flex;
    }
</style>
