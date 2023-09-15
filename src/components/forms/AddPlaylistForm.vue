<template>
    <!-- :validation-schema="schema"  -->
    <Form method="post"  @submit="onSubmit" class="playlist-form" v-slot="{meta}">
        <text-field 
            :field-data="fieldsData.name" 
            v-model="fieldsValues.name"
            rules="required"
        />
        <text-area-field 
            :field-data="fieldsData.description" 
            v-model="fieldsValues.description"
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

        <button :disabled="!meta.valid" class="main-btn main-btn--fill" type="submit">Добавить</button>
    </Form>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Form, Field, useForm, ErrorMessage } from 'vee-validate'
import TextAreaField from '../UI/form/TextAreaField.vue';
import TextField from '../UI/form/TextField.vue'
import SongSelect from '../UI/form/SongSelect.vue';
import axios from 'axios';
import { CreatePlaylistDto } from '@/dtos/createPlaylist.dto';
import FileField from '../UI/form/FileField.vue';

export default defineComponent({
    name: 'AddSongForm',
    components: {
        TextField,
        Form,
        FileField,
        SongSelect,
        TextAreaField
    },
    // setup(){
    //     const schema = {
    //         name: 'required',
    //         // проверка заполненности песен
    //         songIds: (value) => {
    //             if (value && value.length) {
    //                 return true;
    //             }
                
    //             return 'Выберите хотя бы одну песню';
    //         },
    //         coverImg: "mimes:image/jpeg,image/jpg,image/png",


    //   }

    //     const { errors } = useForm({
    //         validationSchema: schema,
    //         });

    //     return {
    //         schema,
    //         errors
    //     }
    // },
    data(){
        return{
            apiUrlExtension: 'add-playlist', 
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
            // songs: [],
            songIds: [],
            initialSongIds: [],
            initialSongs: [],
            formError: ''
        }
    },
    methods: {
        //валидация и отправка формы
        onSubmit(){
            this.fieldsValues.isPublic = false;
            this.fieldsValues.songIds =JSON.stringify(this.songIds.map((songId, id) => {
                return {
                    songId: songId,
                    songIndex: id,
                }
            }));
            var formData = new FormData();
            for ( const [key, value] of Object.entries(this.fieldsValues) ) {
                if(key === 'coverImg'){
                    formData.append(key, this.fieldsValues[key][0]);
                    
                }else{
                    formData.append(key, this.fieldsValues[key]);
                }
            }
        axios.post(this.addPlaylistURL, formData, { 
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
        //добавление песни при выборе в song-select
        handleSongIdsChange(songIds){
            this.songIds = songIds;
        },
        
    },
    computed: {
        getSongsURL() {
            return this.$store.getters.fullURL('getSongs');
        },
        addPlaylistURL(){
            return this.$store.getters.fullURL('createPlaylist')
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
    /* max-width: 30vw; */
    width: 100%;
}
.song-select{
    /* max-height: 50vh; */
    min-height: 20vh;
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