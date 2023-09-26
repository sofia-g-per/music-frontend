<template>
    <Form method="post" :validation-schema="schema" @submit="onSubmit" class="playlist-form" v-slot="{meta}">
        <text-field 
            :field-data="fieldsData.name" 
            v-model="fieldsValues.name"
            rules="required"
        />
        <text-area-field 
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
        <button :disabled="!meta.valid || artistIds.length > 0" class="main-btn main-btn--fill" @click="setStatus('released')" >
            <span>Сохранить</span>
        </button>
        <div>
            <p v-if="!meta.valid">Для публикования песни исправьте ошибки</p>
            <p v-if="formError">{{ formError }}</p>
        </div>
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
import TextAreaField from '../UI/form/TextAreaField.vue';
import SongSelect from '../UI/form/SongSelect.vue';
import MultipleSelect from '../UI/form/MultipleSelect.vue';
export default defineComponent({
    name: 'AddAlbumForm',
    components: {
        TextField,
        Form,
        FileField,
        DateSelect,
        TextAreaField, 
        SongSelect,
        MultipleSelect
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
            initialSelectedSongs: [],
            artistOptions: [],
            artistIds: [],
            albumId: 0,
        }
    },
    computed: {
        getSongsURL() {
            return this.$store.getters.fullURL('getCurrentArtistSongs');
        },

    },
    mounted(){
    //     // загрузка редактируемого альбома
    //     this.albumId = this.$route.params.id;
    //     axios.get(`${this.$store.state.APIURL}${this.$store.state.APIExtensions.getAlbum}`,
    //         { 
    //             params: {
    //             id: this.albumId
    //         }
    //     })
    //     .then((response) => {
    //       if(response.status === 200 && response.data){
    //         this.initialData =  response.data;
    //         //запись стартовых значений для формы    
    //         for (const [key, value] of Object.entries(this.initialData)) {
                if(this.initialData.songs){
                    this.songIds = [];
                    this.initialSelectedSongs = [];
                    for(const song of this.initialData.songs){
                        this.songIds.push(song.songId);
                        this.initialSelectedSongs.push(song.song);
                    }
                }
                if(this.initialData.genres){
                    this.genreIds = [];
                    for(const genre of this.initialData.genres){
                        this.genreIds.push(genre.id);
                    }
                }
    //             }else if(key === 'releaseDate'){
    //                 console.log('date before', value);
    //                 this.fieldsValues[key] = new Date(Date.parse(value as string)).toLocaleDateString('en-CA');
    //                 console.log('date after',this.fieldsValues[key]);
    //             }
    //             else{
    //                 this.fieldsValues[key] = value; 
    //             }

    //             this.meta.validate();
    //         }

    //       }
    //    })
    //     .catch((error)=>{
    //         console.log(error)
    //         if(error.response.status === 403){
    //             this.$router.push({name: 'login'})
    //           }
    //     })

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
                console.log('key', key, formData.get(key));

            }

        // formData.append('id', this.albumId);
        axios.post(this.editAlbumURL, formData, { 
            withCredentials: true,
            headers: {
                'Content-Type': 'multipart/form-data'
                }
        })
          .then(
            (response) => {
              if(response.status === 201 && response.data){
                // 
              }else{
                this.formError = 'Простите, произошла ошибка при загрузке данных'

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
        setStatus(status:string){
            this.fieldsValues.status = status;
        },
        handleSongIdsChange(songIds){
            this.songIds = songIds;
        },
        handleArtistIdsChange(artistIds){
            this.artistIds = artistIds;
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

<style  src="@/assets/styles/UI/form/genreSelect.css"></style>