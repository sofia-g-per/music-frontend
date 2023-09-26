<template>
    <div class="song-select-wrapper">
        <div class="select-wrapper">
            <p class="page-title">Выберите песни: </p>
            <the-search-bar :searchAPIURL="searchUrl" 
                filterApiUrl=""
                @onSearchResponse="handleSearchResponse"
                @onEmptyFilters="getAllSongs"  
                :withFilters="false"/>
            <div class="song-select">
                <!-- вынести в отдельный элемент  -->
                <div v-for="(song) in songs" :key="song.id" class="music-list-item">
                    <div class="music-list-item__info">
                        <h2 class="music-list-item__info__title heading-tretriary">{{song.name}}</h2>
                        <div class="music-list-item__artist-wrapper">
                            <p v-for="artist in song.artists" :key="artist.artistId" class="music-list-item__info__artist main-text">{{artist.artist.stagename}}</p>
                        </div>
                    </div>
                    <div class="music-list-item__buttons">
                        <Field type="checkbox" v-model="songIds" @change="onToggleCheckbox($event, song)" name="songIds" :value="song.id"/>
                    </div>
                </div>
            </div>
        </div>
        <div class="select-wrapper">
            <p class="page-title chosen-title">Добавлено: </p>
                <draggable 
                    class="song-select" 
                    v-model="selectedSongs"
                    @start="drag=true" 
                    @end="onDragEnd"
                    item-key="id"
                >
                <template #item="{element, index}">
                    <div :key="element" class="music-list-item music-list-item--accent">
                        <div class="music-list-item__info">
                            <h2 class="music-list-item__info__title heading-tretriary">{{index + 1}} {{element.name}}</h2>
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
import TheSearchBar from '../TheSearchBar.vue';
import axios from 'axios';
export default defineComponent({
    props: ['getSongsURL', 'initialSongIds', 'initialSelectedSongs'],
    emits: ['onSongIdsChange'],
    components:{
        Field,
        draggable,
        TheSearchBar
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
        axios.get(this.getSongsURL, {withCredentials:true})
       .then((response) => {
              if(response.status === 200 && response.data){
                if(response.data.songs){
                    this.songs = response.data.songs;
                }else{
                    this.songs = response.data;
                }
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
    computed:{
        searchUrl(){
            return this.$store.getters.fullURL('globalSearch');
        }
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
            this.$emit('onSongIdsChange', songIds);
        },
        initialSongIds(){
            console.log('intiial ids',this.initialSongIds);
            this.songIds = this.initialSongIds;
            // selected
        },
        initialSelectedSongs(){
            console.log('intiial songs',this.initialSelectedSongs);

            this.selectedSongs = this.initialSelectedSongs;
        }
    },
    methods:{
        onToggleCheckbox(e, song){
            if(e.target && e.target.checked){
                this.selectedSongs.push(song);
            }else{
                const index = this.selectedSongs.findIndex((item)=> item.id === song.id)
                this.selectedSongs.splice(index, 1);
            }
            this.$emit('onSongIdsChange', this.songIds)

        },
        onDragEnd(){
            this.drag=false;
            this.songIds = this.selectedSongs.map((song)=>{
                if(song.song){
                    return song.song.id
                }
                else{
                    return song.id
                }
            })
        },
        handleSearchResponse(){
// 
        },
        getAllSongs(){
            // this.songs = this.songs;
        }
    }
})
</script>

<style scoped src="@/assets/styles/UI/form/songSelect.css">
</style>