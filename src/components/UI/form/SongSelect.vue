<template>
    <div class="song-select-wrapper">
        <div class="select-wrapper">
            <p class="form-field__label">Выберите песни: </p>
            <div class="song-select">
                <!-- вынести в отдельный элемент  -->
                <div v-for="(song, index) in songs" :key="song.id" class="music-list-item">
                    <div class="music-list-item__info">
                        <h2 class="music-list-item__info__title heading-tretriary">{{song.name}}</h2>
                        <div class="music-list-item__artist-wrapper">
                            <p v-for="artist in song.artists" :key="artist.artistId" class="music-list-item__info__artist main-text">{{artist.artist.stagename}}</p>
                        </div>
                    </div>
                    <div class="music-list-item__buttons">
                        <Field type="checkbox" v-model="songIds" @change="onToggleCheckbox($event, song, index)" name="songIds" :value="song.id"/>
                    </div>
                </div>
            </div>
        </div>
        <div class="select-wrapper">
            <p class="form-field__label">Ваш плейлист: </p>
                <draggable 
                    class="song-select" 
                    v-model="selectedSongs"
                    @start="drag=true" 
                    @end="drag=false"
                >
                <template #item="{element}">
                    <div :key="element" class="music-list-item">
                        <div class="music-list-item__info">
                            <h2 class="music-list-item__info__title heading-tretriary">{{element.name}}</h2>
                            <div class="music-list-item__artist-wrapper">
                                <p v-for="artist in element.artists" :key="artist.artistId" class="music-list-item__info__artist main-text">{{artist.artist.stagename}}</p>
                            </div>
                        </div>
                        <!-- <div class="music-list-item__buttons">
                            <Field type="checkbox" v-model="songIds" name="songIds" :value="songId"/>
                        </div> -->
                    </div>
                </template>

                </draggable>
            </div>
        </div>
        <!-- <p class="form-field__error-label" v-show="errors.songIds">{{errors.songIds}}</p> -->
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Field } from 'vee-validate';
import draggable from 'vuedraggable';
import axios from 'axios';
export default defineComponent({
    props: ['getSongsURL'],
    emits: ['onSongIdsChange'],
    components:{
        Field,
        draggable
    },
    data() {
        return {
            songs: [],
            //для чекбоксов
            songIds: [],
            // для выбранных песен
            selectedSongs: []
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
        selectedSongs(){
            let songIds = this.selectedSongs.map((song)=> {
                if(song.song){
                    return song.song.id
                }else{
                    return song.id
                }
            })

            console.log('emitted', songIds)
            this.$emit('onSongIdsChange', songIds)
        }
    },
    methods:{
        onToggleCheckbox(e, song, index){
            if(e.target && e.target.checked){
                this.selectedSongs.push(song);
            }else{
                this.selectedSongs.splice(index - 1, 1);
            }
        }
    }
})
</script>

<style scoped>

.song-select-wrapper{
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
}
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