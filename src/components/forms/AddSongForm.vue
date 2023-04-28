<template>
    <Form method="post" :validation-schema="schema" @submit="onSubmit" class="form" v-slot="{meta}">
        <text-field 
            :field-data="fieldsData.name" 
            v-model="fieldsValues.name"
            defaultError="Заполните поле (максимум 70 символов)"
        />
        <date-select 
            :field-data="fieldsData.releaseDate"
            defaultError="Заполните, начиная с 01/01/1900 и до нынешней даты"
            v-model="fieldsValues.releaseDate"
        />
        <text-area-field 
            class="span-2"
            :field-data="fieldsData.description" 
            v-model="fieldsValues.description"
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
        <file-field 
            :field-data="fieldsData.audioFile"
            class="span-2" 
            v-model="fieldsValues.audioFile" 
            defaultError="Прикрепите файл в формате mp3"
        /> 
        <genre-select            
            :initialGenreIds="genreIds"
            :initialSelectedGenres="[]"
            @onGenreIdsChange="handleGenreIdsChange"
        />
        <multiple-select
            v-if="artistOptions"
            :initialOptionIds="artistIds"
            :initialSelected="[]"
            displayProperty="stagename"
            :optionsProp="artistOptions"
            title="Другие артисты"
            @onMultipleSelectChange="handleArtistIdsChange"
        >
        </multiple-select>

        <p class="form-field__error-label">{{formError}}</p>
        <button :disabled="!meta.valid" class="main-btn main-btn--fill" @click="setStatus('draft')">
            <span>Сохранить как черновик</span>
        </button>
        <p v-if="artistIds && artistIds.length > 0">Для публикования песни необходимо дождатся подтверждения от выбранных вами артистов.</p>


        <button v-if="!artistIds || artistIds.length == 0" :disabled="!meta.valid" class="main-btn main-btn--fill" @click="setStatus('released')" >
            <span>Опубликовать</span>
        </button>

    </Form>
</template>

<script lang="ts">
import { defineComponent, toRaw } from 'vue'
import { Form, Field } from 'vee-validate'
import TextField from '../UI/form/TextField.vue'
import FileField from '../UI/form/FileField.vue';
import TextAreaField from '../UI/form/TextAreaField.vue';
import axios from 'axios';
import { CreateSongDto } from '@/dtos/createSong.dto';
import DateSelect from '../UI/form/DateSelect.vue';
import GenreSelect from '../UI/form/GenreSelect.vue';
import MultipleSelect from '../UI/form/MultipleSelect.vue';

export default defineComponent({
    name: 'AddSongForm',
    components: {
        TextField,
        Form,
        FileField,
        TextAreaField,
        DateSelect,
        GenreSelect,
        MultipleSelect
    },
    data(){
        return{
            apiUrlExtension: 'add-song', 
            fieldsValues: new CreateSongDto,
            // объект с названиями полей формы
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
                },
                status: {
                    name: 'status' 
                }
            },
            //хранит Id выбранных пользователем жанров
            genreIds: [],
            artistIds: [],
            artistOptions: [],
            formError: '',
            // хранит доступные для выбора жанра
            // genreOptions: [],
        }
    },
    setup(){
        const schema = {
            name: 'required|max:70',
            audioFile: "required|mimes:audio/mpeg",
            releaseDate: {
                "required": true,
                "isReleaseDateValid": true
            },
            coverImg: "mimes:image/jpeg,image/jpg,image/png",
            lyrics:"mimes:text/plain"

        };
        return {
            schema
        }
    },
    mounted(){
        // получение вариантов артистов с сервера
        axios.get(`${this.$store.state.APIURL}${this.$store.state.APIExtensions.getArtists}`, {withCredentials:true})
        .then((response) => {
            console.log(response);
          if(response.status === 200 && response.data){
            this.artistOptions =  toRaw(response.data);
          }
       })
        .catch((error)=>{
            console.log(error)
        })
    },
    methods: {
        // проверка и отправка формы
        onSubmit(){
        var formData = new FormData();

        for ( const [key, value] of Object.entries(this.fieldsValues) ) {
            if(key === 'audioFile' || key === 'coverImg' || key === 'lyrics'){
                formData.append(key, this.fieldsValues[key][0]);
                
            }else if(key === 'releaseDate'){
                formData.append(key, new Date(this.fieldsValues.releaseDate).toUTCString());
            }
            else if(key === 'status'){
                formData.append(key, this.fieldsValues[key]);
            }
            else{
                formData.append(key, this.fieldsValues[key]);
            }
        }
        if(this.genreIds && this.genreIds.length > 0){
            formData.append('genreIds', JSON.stringify(toRaw(this.genreIds)));
        }

        if(this.artistIds && this.artistIds.length > 0){
            const artists = this.artistIds.map(id => {
               return {
                artistId: id,
                isFeatured: true
               }
            });
            console.log(artists);

            formData.append('artists', JSON.stringify(toRaw(artists)));
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
              if( error.statusCode === 400){
                  this.errors = error.message;
              }else{
                  this.formError = 'Простите, произошла ошибка при загрузке данных'
              }
          })
        },
        setStatus(status:string){
            this.fieldsValues.status = status;
        },
        // обновление id жанров
        handleGenreIdsChange(genreIds){
            this.genreIds = genreIds;
        },
        handleArtistIdsChange(artistIds){
            this.artistIds = artistIds;
        }
    },

    computed: {
        // адрес для загрузки песни
        fullApiUrl():string {
            return `${this.$store.state.APIURL}${this.$store.state.APIExtensions.uploadSong}`;
        },
    },

})
</script>

<style scoped>
.genre-select{
    min-height: 20vh;
    min-width: 35vw;
}

.genre-select__item{
    display: flex;
    justify-content: space-between;
    padding: 1rem;
}
</style>
