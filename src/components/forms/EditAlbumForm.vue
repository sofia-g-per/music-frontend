<template>
    <Form method="post" :validation-schema="schema" @submit="onSubmit" class="playlist-form">
        <text-field 
            :field-data="fieldsData.name" 
            v-model="fieldsValues.name"
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
                    <Field type="checkbox" v-model="songIds" name="songIds" :value="song.id"/>
                </div>
            </div>
        </div>
        
        <div class="song-select">
            <div v-for="option in genreOptions" :key="option.id" class="music-list-item">
                <label :for="option.id">{{option.name}}</label>
                <Field type="checkbox" :id="option.id" v-model="genreIds" name="genreIds" :value="option.id"/>
            </div>
        </div>
        <p class="form-field__error-label" v-show="errors.songIds">{{errors.songIds}}</p>
        <button class="main-btn" type="submit">Добавить</button>
    </Form>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Form, Field, useForm, ErrorMessage } from 'vee-validate'
import TextField from '../UI/form/TextField.vue'
import axios from 'axios';
import {CreateAlbumDto} from '@/dtos/createAlbum.dto'

export default defineComponent({
    name: 'AddAlbumForm',
    components: {
        TextField,
        Form,
        Field
    },
    setup(){
        const schema = {
            songIds: (value) => {
                if (value && value.length) {
                    return true;
                }
                
                return 'Выберите хотя бы одну песню';
            }
      }

        const { errors } = useForm({
            validationSchema: schema,
            });

        return {
            schema,
            errors
        }
    },
    data(){
        return{
            apiUrlExtension: 'add-album', 
            fieldsValues: new CreateAlbumDto,
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
            genreOptions: [],
            genreIds: [],
            formError: ''
        }
    },
    computed: {
        getSongsURL() {
            return this.$store.getters.fullURL('getCurrentArtistSongs');
        },
        editAlbumURL(){
            return this.$store.getters.fullURL('editAlbum')
        }
    },
    mounted(){
        // загрузка редактируемого альбома
        const albumId = this.$route.params.id;
        axios.get(`${this.$store.state.APIURL}${this.$store.state.APIExtensions.getAlbum}`,
            { 
                params: {
                albumId: albumId
            }
        })
        .then((response) => {
          if(response.status === 200 && response.data){
            this.initialData =  response.data;
            console.log('response data', response.data)
            //запись стартовых значений для формы    
            for (const [key, value] of Object.entries(this.initialData)) {
                if(key === 'songs'){
                    this.songIds = [];
                    for(const song of this.initialData.songs){
                        this.songIds.push(song.songId);
                    }
                }else if(key === 'genres'){
                    this.genreIds = [];
                    for(const genre of this.initialData.genres){
                        this.genreIds.push(genre.id);
                    }
                }else{
                    this.fieldsValues[key] = value; 
                    
                }
                console.log(key, value, this.fieldsValues)
            }

          }
       })
        .catch((error)=>{
            console.log(error)
            if(error.response.status === 403){
                this.$router.push({name: 'login'})
              }
        })

        // загрузка всех песен данного пользователя
        axios.get(this.getSongsURL, {withCredentials:true})
       .then((response) => {
              if(response.status === 200 && response.data){
                  this.songs = response.data;
              }

        })
        .catch((error)=>{
              if(error.response && error.reponse.status === 400){
                  this.errors = error.data;
              }else{
                  this.formError = 'Простите, произошла ошибка при загрузке данных'
              }
          })

        // загрузка жанров
        axios.get(`${this.$store.state.APIURL}${this.$store.state.APIExtensions.getGenres}`)
        .then((response) => {
          if(response.status === 200 && response.data){
              this.genreOptions =  response.data;
          }
       })
        .catch((error)=>{
              console.log(error)
          })

    },
    methods: {
        onSubmit(){
            this.fieldsValues.songIds = this.songIds.map((songId, id) => {
                let item:any = {
                    songId: songId,
                    songIndex: id,
                }
                let initial = this.initialData.songs.find((item)=> item.songId === songId)
                if(initial !== undefined){
                    item['id'] = initial.id;
                }
                return item
            });
            this.fieldsValues.songIds = JSON.stringify(this.fieldsValues.songIds);
            this.fieldsValues.genreIds = JSON.stringify(this.genreIds);
        axios.post(this.editAlbumURL, this.fieldsValues, { 
            withCredentials: true
        })
          .then(
            (response) => {
              if(response.status === 201 && response.data){
                  this.$router.push('/my-albums');
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