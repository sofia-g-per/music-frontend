<template>
    <Form method="post" :validation-schema="schema" @submit="onSubmit" class="form">
        <text-field 
            :field-data="fieldsData.name" 
            v-model="fieldsValues.name"
        />
        <text-area-field 
            class="span-2"
            :field-data="fieldsData.description" 
            v-model="fieldsValues.description"
        />   
        <date-select 
            :field-data="fieldsData.releaseDate"
            defaultError="Заполните, начиная с 01/01/1900 и до нынешней даты"
            v-model="fieldsValues.releaseDate"
        />
         <file-field 
            :field-data="fieldsData.audioFile" 
            v-model="fieldsValues.audioFile" 
            rules="mimes:audio/mpeg"
            defaultError="Прикрепите файл в формате mp3"
        />   
        <file-field 
            :field-data="fieldsData.coverImg" 
            v-model="fieldsValues.coverImg" 
            defaultError="Файл должен быть в формате jpeg, jpg или png"
        >     
        </file-field>
        <file-field 
            :field-data="fieldsData.lyrics" 
            v-model="fieldsValues.lyrics" 
            defaultError="Файл должен быть в формате srt"
        >       
        </file-field>
        <genre-select            
            :initialGenreIds="genreIds"
            :initialSelectedGenres="fieldsValues.genres"
            @onGenreIdsChange="handleGenreIdsChange"
        />
        <p class="form-field__error-label">{{formError}}</p>
        <button  class="main-btn main-btn--fill" type="submit">Сохранить</button>
    </Form>
</template>

<script lang="ts">
import { defineComponent, toRaw } from 'vue'
import { Form, Field } from 'vee-validate'
import TextField from '../UI/form/TextField.vue'
import FileField from '../UI/form/FileField.vue';
import axios from 'axios';
import { CreateSongDto } from '@/dtos/createSong.dto';
import DateSelect from '../UI/form/DateSelect.vue';
import GenreSelect from '../UI/form/GenreSelect.vue';
import TextAreaField from '../UI/form/TextAreaField.vue';
export default defineComponent({
    name: 'AddSongForm',
    components: {
        TextField,
        Form,
        FileField,
        TextAreaField,
        // Field,
        DateSelect,
        GenreSelect
    },
    data(){
        return{
            apiUrlExtension: 'add-song', 
            initialData: {},
            fieldsValues: new CreateSongDto,
            fieldsData: {
                name: {
                    name: 'name',
                    label: 'Название'
                },
                description: {
                    name: 'description',
                    label: 'Описание'
                },
                lyrics: {
                    name: 'lyrics',
                    label: 'Текст'
                },
                audioFile: {
                    name: 'audioFile',
                    label: 'Аудиофайл песни'
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
            genreIds: [],
            formError: '',
            genreOptions: []
        }
    },
    setup(){
        const schema = {
            audioFile: "mimes:audio/mpeg",
            releaseDate: {
                "isReleaseDateValid": true
            },
            coverImg: "mimes:image/jpeg,image/jpg,image/png",
            lyrics:"mimes:text/plain"
        };
        return {
            schema
        }
    },
    computed: {
        fullApiUrl():string {
            return `${this.$store.state.APIURL}${this.$store.state.APIExtensions.editSong}`;
        }
    },
    mounted(){
        const songId = this.$route.params.id;
        //загрузка редактируемой песни
        axios.get(`${this.$store.state.APIURL}${this.$store.state.APIExtensions.getSong}`,
            { 
                withCredentials: true,
                params: {
                songId: songId
            }
        })
        .then((response) => {
          if(response.status === 200 && response.data){
            this.initialData =  response.data;
            console.log(this.initialData)
            //запись стартовых значений для формы    
            for (const [key, value] of Object.entries(this.initialData)) {

                if(key !== 'genres'){
                    if(key !== 'audioFile'){
                        this.fieldsValues[key] = value; 
                    }
                }else{
                    this.fieldsValues[key] = value; 

                    this.genreIds = []; 
                    for(const genre of this.initialData.genres){
                        this.genreIds.push(genre.id);
                    }
                }
            }
            console.log('fieldsVAlues', this.fieldsValues)
          }
       })
        .catch((error)=>{
            console.log(error)
            if(error.response.status === 403){
                this.$router.push({name: 'login'})
              }
        })

        //загрузка жанров
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
            var formData = new FormData();
        for ( const [key, value] of Object.entries(this.fieldsValues) ) {
            if(key === 'audioFile' || key === 'coverImg' || key === 'lyrics'){
                if(this.fieldsValues[key]){
                    formData.append(key, this.fieldsValues[key][0]);
                }                
            }else if(key === 'releaseDate'){
                formData.append(key, new Date(this.fieldsValues.releaseDate).toUTCString());
            }else if(key !== 'artists'){
                formData.append(key, this.fieldsValues[key]);
            }
        }
        if(this.genreIds && this.genreIds.length > 0){
            formData.append('genreIds', JSON.stringify(toRaw(this.genreIds)));
        }
        axios.post(this.fullApiUrl, formData, { 
            withCredentials: true,  
            headers: {
                'Content-Type': 'multipart/form-data'
                }
            })
          .then(
            (response) => {
              if(response.status === 201 && response.data){
                  this.$router.push('/my-songs');
              }
            }
          )            
          .catch((error)=>{
              if(error && error.statusCode === 400){
                  this.errors = error.data;
              }else{
                  this.formError = 'Простите, произошла ошибка при загрузке данных'
              }
          })
        },
                // обновление id жанров
        handleGenreIdsChange(genreIds){
            this.genreIds = genreIds;
        },
    },
})
</script>
