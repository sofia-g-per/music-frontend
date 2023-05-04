<template>
    <image-text-card>
        <template v-slot:image>
            <img :hidden="!coverImgURL" :src="coverImgURL" alt="Обложка песни">
        </template>
        <template v-slot:main-text>
            <h2 class="music-list-item__info__title heading-tretriary">{{songData.name}}</h2>
        </template> 
        <template v-slot:secondary-text>
            <artists-list :artists="songData.artists"></artists-list>
        </template>

    </image-text-card>
    <!-- <div class="img-text">
        <div :hidden="!coverImgURL" class="music-list-item__img-wrapper">
        </div>
        <div class="music-list-item__info">
            <div class="music-list-item__artist-wrapper">
                <p v-for="artist in songData.artists" :key="artist.artistId" class="music-list-item__info__artist main-text">
                    {{artist.isFeatured? "feat. "+ artist.artist.stagename: artist.artist.stagename}}
                </p>
            </div>
        </div>
    </div> -->
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ImageTextCard from '../UI/ImageTextCard.vue';
import ArtistsList from './ArtistsList.vue';
export default defineComponent({
    name: "MusicListItem",
    props: [
        'songData',
    ],
    components: {
        ImageTextCard,
        ArtistsList
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
        flex-grow: 1;
    }
</style>
