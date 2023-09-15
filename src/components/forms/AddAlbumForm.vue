<template>
    <Form method="post" :validation-schema="validationSchema" @submit="onSubmit" class="playlist-form" v-slot="{meta}">
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
            :initialSongIds="initialSongIds"
            :initialSelectedSongs="initialSongs"
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

        <div class="flex">
            <button class="main-btn main-btn--fill" @click="setStatus('draft')">
                <span>Сохранить как черновик</span>
            </button>
            <button :disabled="!meta.valid || artistIds.length > 0" class="main-btn main-btn--fill" @click="setStatus('released')" >
                <span>Опубликовать</span>
            </button>
        </div>

        <div>
            <p v-if="artistIds && artistIds.length > 0">Для публикации песни необходимо дождаться подтверждения от выбранных вами артистов.</p>
            <p v-if="!meta.valid">Для публикования песни исправьте ошибки</p>
            <p v-if="formError">{{ formError }}</p>
        </div>

        <!-- <p class="form-field__error-label" v-show="errors.songIds">{{errors.songIds}}</p> -->
    </Form>
</template>

<script lang="ts">
import { defineComponent, toRaw } from 'vue'
import { Form, Field, useForm, ErrorMessage } from 'vee-validate'
import TextField from '../UI/form/TextField.vue'
import SongSelect from '../UI/form/SongSelect.vue';
import axios from 'axios';
import {CreateAlbumDto} from '@/dtos/createAlbum.dto'
import DateSelect from '../UI/form/DateSelect.vue';
import FileField from '../UI/form/FileField.vue';
import TextAreaField from '../UI/form/TextAreaField.vue';
import MultipleSelect from '../UI/form/MultipleSelect.vue';

export default defineComponent({
    name: 'AddAlbumForm',
    components: {
        TextField,
        Form,
        SongSelect,
        DateSelect,
        FileField,
        TextAreaField,
        MultipleSelect
    },
    props: {
        initialData: CreateAlbumDto, 
        validationSchema: {

        },
        submitURL: String

    },
    // emits: [
    //     'onSubmitSuccessful'
    // ],
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
            initialSongs: [],
            initialSongIds: [],
            artistOptions: [],
            artistIds: [],
            formError: ''
        }
    },
    computed: {
        getSongsURL() {
            return this.$store.getters.fullURL('getCurrentArtistSongs');
        },
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
        if(this.initialData){
            this.fieldsValues = this.initialData;
        
            if(this.initialData.songs){
                this.initialSongIds = [];
                this.initialSongs = [];
                for(const song of this.initialData.songs){
                    this.initialSongIds.push(song.songId);
                    this.initialSongs.push(song.song);
                }
            }
            if(this.initialData.genres){
                this.genreIds = [];
                for(const genre of this.initialData.genres){
                    this.genreIds.push(genre.id);
                }
            }
            // this.meta.validate();
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

            this.fieldsValues.songs = JSON.stringify(this.fieldsValues.songs);

            if(this.artistIds && this.artistIds.length > 0 || this.fieldsValues.artists ){
                const artists = this.artistIds.map(id => {
                    return {
                        artistId: id,
                        isFeatured: true
                    }
                });
                console.log(artists);

                this.fieldsValues.artists = JSON.stringify(toRaw(artists));
            }
            
            const formData = new FormData();
            for ( const [key, value] of Object.entries(this.fieldsValues) ) {
                if(!this.initialData || value !== this.initialData[key]){
                    if( key === 'coverImg'){
                        formData.append(key, this.fieldsValues[key][0]);
                    }else if(key === 'releaseDate'){
                        formData.append(key, new Date(this.fieldsValues.releaseDate).toUTCString());
                    }else{
                        formData.append(key, this.fieldsValues[key]);
                        console.log(key, this.fieldsValues[key]);
                    }
                }
            }

            axios.post(this.submitURL, formData, { 
                withCredentials: true,
                headers: {
                'Content-Type': 'multipart/form-data'
                }
            })
            .then(
                (response) => {
                if(response.status === 201 && response.data){
                        this.$emit('onSubmitSuccessful');
                }
                }
            )            
            .catch((error)=>{
                if(error.status === 400){
                    this.formError = error.data;
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
    gap: 1rem;
}
.form-field{
    width: 100%;
}

.flex{
    display: flex;
    justify-content: space-between;
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