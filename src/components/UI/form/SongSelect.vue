<template>
    <p class="form-field__label">Песни: </p>
        <div class="song-select">
            <div v-for="song in songs" :key="song.id" class="music-list-item">
                <div class="music-list-item__info">
                    <h2 class="music-list-item__info__title heading-tretriary">{{song.name}}</h2>
                    <div class="music-list-item__artist-wrapper">
                        <p v-for="artist in song.artists" :key="artist.artistId" class="music-list-item__info__artist main-text">{{artist.artist.stagename}}</p>
                    </div>
                </div>
                <div class="music-list-item__buttons">
                    <Field type="checkbox" v-model="songIds" name="songIds" :value="song.id"/>
                </div>
            </div>
        </div>
        <p>child {{songIds}}</p>
        <!-- <p class="form-field__error-label" v-show="errors.songIds">{{errors.songIds}}</p> -->
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Field } from 'vee-validate';
import axios from 'axios';
export default defineComponent({
    props: ['getSongsURL'],
    emits: ['onSongIdsChange'],
    components:{
        Field
    },
    data() {
        return {
            songs: [],
            songIds: []
        }
    },
    mounted(){
        axios.get(this.getSongsURL)
       .then((response) => {
              if(response.status === 200 && response.data){
                  this.songs = response.data;
              }

        })
        .catch((error)=>{
              if(error.response && error.reponse.status === 400){
                //   this.errors = error.data;
              }else{
                //   this.formError = 'Простите, произошла ошибка при загрузке данных'
              }
          })

    },
    watch:{
        songIds(){
            console.log('emited')
            this.$emit('onSongIdsChange', this.songIds)
        }
    }
})
</script>

<style scoped>
.song-select{
    /* max-height: 50vh; */
    min-height: 20vh;
    min-width: 35vw;
    /* overflow-y: scroll; */
}

.music-list-item{
    display: flex;
    justify-content: space-between;
    padding: 1rem;
}

.music-list-item__artist-wrapper{
    padding-left: 1rem;
}
</style>