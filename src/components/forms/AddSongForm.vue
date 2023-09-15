<template>
    <Form method="post" :validation-schema="validationSchema" @submit="onSubmit" class="form" v-slot="{meta}">
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

        <button class="main-btn main-btn--fill" @click="setStatus('draft')">
            <span>Сохранить как черновик</span>
        </button>

        <button :disabled="!meta.valid || artistIds.length > 0" class="main-btn main-btn--fill" @click="setStatus('released')" >
            <span>Опубликовать</span>
        </button>
        <div>
            <p v-if="artistIds && artistIds.length > 0">Для публикации песни необходимо дождаться подтверждения от выбранных вами артистов.</p>
            <p v-if="!meta.valid">Для публикования песни исправьте ошибки</p>
            <p v-if="formError">{{ formError }}</p>
        </div>

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
    props: {
        validationSchema: {

        },
        fullApiUrl: String,

    },
    data(){
        return{
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
            genreOptions: [],
        }
    },
    watch: {
        initialSong(){
            if(this.initialSong !== undefined){
                this.fieldsValues = this.initialSong;
                console.log(this.initialUser.artist);
                if(this.initialSong.genres){
                    // this.fieldsValues.roleName = "artist";
                    // this.artistFieldsValues = this.initialUser.artist;
                }
                if(this.initialSong.artists){
                    // this.fieldsValues.roleName = "artist";
                    // this.artistFieldsValues = this.initialUser.artist;
                }
            }
        }
    },
    mounted(){
        // получение вариантов артистов с сервера
        axios.get(`${this.$store.state.APIURL}${this.$store.state.APIExtensions.getArtists}`, {withCredentials:true})
        .then((response) => {
          if(response.status === 200 && response.data){
            this.artistOptions =  toRaw(response.data);
          }
       })
        .catch((error)=>{
            this.formError = "Произошла ошибка при загрузки артистов"
            // console.log(error)
        })
        // получение вариантов жанров с сервера
        axios.get(`${this.$store.state.APIURL}${this.$store.state.APIExtensions.getGenres}`)
        .then((response) => {
          if(response.status === 200 && response.data){
            this.genreOptions =  toRaw(response.data);
          }
       })
        .catch((error)=>{
            this.formError = "Произошла ошибка при загрузки жанров"
            // console.log(error)
        })
    },
    methods: {
        // проверка и отправка формы
        onSubmit(){
            // форматирование объекта для отправки
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

// отправка в сереврную часть
        axios.post(this.fullApiUrl, formData, { 
            withCredentials: true,  
            headers: {
                'Content-Type': 'multipart/form-data'
                }
            })
          .then(
            (response) => {
              if(response.status === 201 && response.data){
                this.$emit('onSubmitSuccessful', response);
              }else {
                  this.formError = 'Простите, произошла ошибка при загрузке данных'
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
