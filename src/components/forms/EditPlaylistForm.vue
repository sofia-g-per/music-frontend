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
        <file-field 
            :field-data="fieldsData.coverImg" 
            v-model="fieldsValues.coverImg" 
            defaultError="Файл должен быть в формате jpeg, jpg или png"
        />  
        <song-select 
            v-if="initialSelectedSongs"
            :getSongsURL="getSongsURL"
            :initialSongIds="songIds"
            :initialSelectedSongs="initialSelectedSongs"
            @onSongIdsChange="handleSongIdsChange"
        />
        <button class="main-btn main-btn--fill" type="submit">Добавить</button>
    </Form>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Form, Field, useForm, ErrorMessage } from 'vee-validate'
import SongSelect from '../UI/form/SongSelect.vue';
import TextField from '../UI/form/TextField.vue'
import axios from 'axios';
import { CreatePlaylistDto } from '@/dtos/createPlaylist.dto';

export default defineComponent({
    name: 'AddSongForm',
    components: {
        TextField,
        Form,
        SongSelect
        // Field
    },
    setup(){
        const schema = {
            songIds: (value) => {
                if (value && value.length) {
                    return true;
                }
                
                return 'Выберите хотя бы одну песню';
            },
            coverImg: "mimes:image/jpeg,image/jpg,image/png",
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
                coverImg: {
                    name: 'coverImage',
                    label: 'Обложка'
                }
            },
            songs: [],
            initialData: {},
            songIds: [],
            initialSelectedSongs: [],
            formError: ''
        }
    },
    methods: {
        onSubmit(){
            this.fieldsValues.isPublic = false;
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

            var formData = new FormData();
            for ( const [key, value] of Object.entries(this.fieldsValues) ) {
                if(key === 'coverImg'){
                    formData.append(key, this.fieldsValues[key][0]);
                    
                }else{
                    formData.append(key, this.fieldsValues[key]);
                }
            }
        axios.post(this.addPlaylistURL, this.fieldsValues, { 
            withCredentials: true,
            headers: {
                'Content-Type': 'multipart/form-data'
                }
        }
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
        },
        handleSongIdsChange(songIds){
            this.songIds = songIds;
        }
    },
    computed: {
        getSongsURL() {
            return this.$store.getters.fullURL('getSongs');
        },
        addPlaylistURL(){
            return this.$store.getters.fullURL('editPlaylist')
        }
    },
    mounted(){
        const playlistId = this.$route.params.id;
        //загрузка редактируемого плейлиста
        axios.get(`${this.$store.state.APIURL}${this.$store.state.APIExtensions.getPlaylist}`,
            { 
                params: {
                playlistId: playlistId
            }
        })
        .then((response) => {
          if(response.status === 200 && response.data){
            this.initialData =  response.data;
            //запись стартовых значений для формы    
            for (const [key, value] of Object.entries(this.initialData)) {
                if(key !== 'songs'){
                    this.fieldsValues[key] = value; 
                }else{
                    this.initialSelectedSongs = [];
                    this.songIds = [];
                    for(const song of this.initialData.songs){
                        this.songIds.push(song.songId);
                        this.initialSelectedSongs.push(song.song);
                    }
                    console.log(this.initialSelectedSongs, this.initialData.songs)
                }
            }
          }
       })
        .catch((error)=>{
            console.log(error)
            if(error.response.status === 403){
                this.$router.push({name: 'login'})
              }
        })
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


</style>