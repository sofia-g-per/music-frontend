<template>
    <Form method="post" :validation-schema="schema" @submit="onSubmit" class="playlist-form">
        <text-field 
            :field-data="fieldsData.name" 
            v-model="fieldsValues.name"
            rules="required"
        />
        <text-field 
            :field-data="fieldsData.description" 
            v-model="fieldsValues.description"
        />
        <song-select 
            :getSongsURL="getSongsURL"
            :initialSongIds="songIds"
            :initialSelectedSongs="[]"
            @onSongIdsChange="handleSongIdsChange"
        />
        
        <p class="form-field__label"> Жанры: </p>
        <div class="song-select">
            <div v-for="option in genreOptions" :key="option.id" class="music-list-item">
                <label :for="option.id">{{option.name}}</label>
                <Field type="checkbox" :id="option.id" v-model="genreIds" name="genreIds" :value="option.id"/>
            </div>
        </div>
        <!-- <p class="form-field__error-label" v-show="errors.songIds">{{errors.songIds}}</p> -->
        <button class="main-btn main-btn--fill" type="submit">Добавить</button>
    </Form>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Form, Field, useForm, ErrorMessage } from 'vee-validate'
import TextField from '../UI/form/TextField.vue'
import SongSelect from '../UI/form/SongSelect.vue';
import axios from 'axios';
import {CreateAlbumDto} from '@/dtos/createAlbum.dto'

export default defineComponent({
    name: 'AddAlbumForm',
    components: {
        TextField,
        Form,
        SongSelect,
        Field
    },
    setup(){
        const schema = {
            name: 'required',
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
        addAlbumURL(){
            return this.$store.getters.fullURL('createAlbum')
        }
    },
    mounted(){
        // жанры
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
            if(this.genreIds){
                this.fieldsValues.genreIds = this.genreIds;
            }
            axios.post(this.addAlbumURL, this.fieldsValues, { 
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