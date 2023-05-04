<template>
    <Form method="post" :validation-schema="schema" @submit="onSubmit" class="playlist-form" v-slot="{meta}">
        <text-field 
            :field-data="fieldsData.name" 
            v-model="fieldsValues.name"
            rules="required"
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
            :initialSelectedSongs="[]"
            @onSongIdsChange="handleSongIdsChange"
        />

        <!-- <p class="form-field__error-label" v-show="errors.songIds">{{errors.songIds}}</p> -->
        <button :disabled="!meta.valid" class="main-btn main-btn--fill" type="submit">Добавить</button>
    </Form>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Form, Field, useForm, ErrorMessage } from 'vee-validate'
import TextField from '../UI/form/TextField.vue'
import SongSelect from '../UI/form/SongSelect.vue';
import axios from 'axios';
import {CreateAlbumDto} from '@/dtos/createAlbum.dto'
import DateSelect from '../UI/form/DateSelect.vue';
import FileField from '../UI/form/FileField.vue';

export default defineComponent({
    name: 'AddAlbumForm',
    components: {
        TextField,
        Form,
        SongSelect,
        DateSelect,
        FileField
    },
    setup(){
        const schema = {
            name: 'required',
            releaseDate: {
                "required": true,
                "isReleaseDateValid": true
            },
            coverImg: "mimes:image/jpeg,image/jpg,image/png",
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
            formError: ''
        }
    },
    computed: {
        getSongsURL() {
            return this.$store.getters.fullURL('getCurrentArtistSongs');
        },
        addAlbumURL(){
            return this.$store.getters.fullURL('createAlbum')
        }
    },
    methods: {
        onSubmit(){
            this.fieldsValues.songs = this.songIds.map((songId, id) => {
                return {
                    songId: songId,
                    songIndex: id,
                }
            });
            this.fieldsValues.songs = JSON.stringify(this.fieldsValues.songs)
            var formData = new FormData();
            console.log('album', this.fieldsValues);
            for ( const [key, value] of Object.entries(this.fieldsValues) ) {
                if( key === 'coverImg'){
                    formData.append(key, this.fieldsValues[key][0]);
                    
                }else if(key === 'releaseDate'){
                    console.log('releaseDate', value);
                    formData.append(key, new Date(this.fieldsValues.releaseDate).toUTCString());
                }else{
                    formData.append(key, this.fieldsValues[key]);
                }
            }

            axios.post(this.addAlbumURL, formData, { 
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
        },
        
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
    /* max-height: 50vh; */
    /* min-height: 20vh;   */
    padding-bottom: 2rem;
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