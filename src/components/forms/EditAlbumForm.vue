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
        <date-select 
            :field-data="fieldsData.releaseDate"
            defaultError="Заполните, начиная с 01/01/1900 и до нынешней даты"
            v-model="fieldsValues.releaseDate"
        />
        <file-field 
            :field-data="fieldsData.coverImg" 
            v-model="fieldsValues.coverImg" 
            defaultError="Файл должен быть в формате jpeg, jpg или png"
        /> 
        <song-select 
            :getSongsURL="getSongsURL"
            :initialSongIds="songIds"
            :initialSelectedSongs="initialSelectedSongs"
            @onSongIdsChange="handleSongIdsChange"
        />
        <p class="form-field__error-label" v-show="errors.songIds">{{errors.songIds}}</p>
        <button class="main-btn main-btn--fill" type="submit">Добавить</button>
    </Form>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Form, Field, useForm, ErrorMessage } from 'vee-validate'
import TextField from '../UI/form/TextField.vue'
import axios from 'axios';
import {CreateAlbumDto} from '@/dtos/createAlbum.dto'
import FileField from '../UI/form/FileField.vue';
import DateSelect from '../UI/form/DateSelect.vue';
export default defineComponent({
    name: 'AddAlbumForm',
    components: {
        TextField,
        Form,
        FileField,
        DateSelect
    },
    setup(){
        const schema = {
            releaseDate: {
                "isReleaseDateValid": true
            },
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
                releaseDate: {
                    name: 'releaseDate',
                    label: 'Дата выпуска'
                },
                coverImg: {
                    name: 'coverImg',
                    label: 'Обложка'
                }
            },
            songs: [],
            songIds: [],
            formError: '',
            initialSelectedSongs: []
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
            //запись стартовых значений для формы    
            for (const [key, value] of Object.entries(this.initialData)) {
                if(key === 'songs'){
                    this.songIds = [];
                    this.initialSelectedSongs = [];
                    for(const song of this.initialData.songs){
                        this.songIds.push(song.songId);
                        this.initialSelectedSongs.push(song.song);
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
                return {
                    songId: songId,
                    songIndex: id,
                }
            });
            this.fieldsValues.songIds = JSON.stringify(this.fieldsValues.songIds)
            var formData = new FormData();
            for ( const [key, value] of Object.entries(this.fieldsValues) ) {
                if( key === 'coverImg'){
                    formData.append(key, this.fieldsValues[key][0]);
                    
                }else if(key === 'releaseDate'){
                    formData.append(key, new Date(this.fieldsValues.releaseDate).toUTCString());
                }else{
                    formData.append(key, this.fieldsValues[key]);
                }
            }
        axios.post(this.editAlbumURL, formData, { 
            withCredentials: true,
            headers: {
                'Content-Type': 'multipart/form-data'
                }
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
        },
        handleSongIdsChange(songIds){
            this.songIds = songIds;
        }
    },
    

})
</script>

<style scoped>
.playlist-form{
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
}
.form-field{
    max-width: 30vw;
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