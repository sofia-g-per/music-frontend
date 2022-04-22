<template>
    <Form method="post" @submit="onSubmit" class="playlist-form">
        <text-field 
            :field-data="fieldsData.name" 
            v-model="fieldsValues.name"
            rules="required"
        />
        <text-field 
            :field-data="fieldsData.description" 
            v-model="fieldsValues.description"
        />
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
                    <input type="checkbox" v-model="songIds" :value="song.id">
                </div>
            </div>
        </div>

        <button class="main-btn" type="submit">Добавить</button>
    </Form>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Form } from 'vee-validate'
import TextField from '../UI/form/TextField.vue'
import axios from 'axios';
import { CreatePlaylistDto } from '@/dtos/createPlaylist.dto';

export default defineComponent({
    name: 'AddSongForm',
    components: {
        TextField,
        Form,
    },
    data(){
        return{
            apiUrlExtension: 'add-playlist', 
            fieldsValues: new CreatePlaylistDto,
            fieldsData: {
                name: {
                    name: 'name',
                    label: 'Название'
                },
                description: {
                    name: 'description',
                    label: 'Описание'
                },
            },
            songs: [],
            songIds: [],
        }
    },
    methods: {
        onSubmit(){
            this.fieldsValues.isPublic = true;
            this.fieldsValues.songIds = this.songIds.map((songId, id) => {
                return {
                    songId: songId,
                    songIndex: id,
                }
            });
        axios.post(this.addPlaylistURL, this.fieldsValues, { 
            withCredentials: true}
            )
          .then(
            (response) => {
              if(response.status === 201 && response.data){
                  this.$router.push('/my-playlists');
              }
            }
          )            
          .catch((error)=>{
              if(error.status === 400){
                  this.errors = error.data;
              }else{
                  this.formError = 'Простите, произошла ошибка при загрузке данных'
              }
          })
        }
    },
    computed: {
        getSongsURL() {
            return this.$store.getters.fullURL('getSongs');
        },
        addPlaylistURL(){
            return this.$store.getters.fullURL('createPlaylist')
        }
    },
    mounted(){
        axios.get(this.getSongsURL)
       .then((response) => {
              if(response.status === 200 && response.data){
                  this.songs = response.data;
                  console.log(this.songs)
              }

        })

    },

})
</script>

<style scoped>
.playlist-form{
    display: flex;
    flex-direction: column;
    gap: 1rem;
}
.form-field{
    max-width: 20vw;
}
.song-select{
    max-height: 50vh;
    min-height: 20vh;
    min-width: 35vw;
    overflow-y: scroll;
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