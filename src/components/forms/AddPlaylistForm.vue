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

        <button class="main-btn main-btn--fill" type="submit">Добавить</button>
    </Form>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Form, Field, useForm, ErrorMessage } from 'vee-validate'
import TextField from '../UI/form/TextField.vue'
import SongSelect from '../UI/form/SongSelect.vue';
import axios from 'axios';
import { CreatePlaylistDto } from '@/dtos/createPlaylist.dto';

export default defineComponent({
    name: 'AddSongForm',
    components: {
        TextField,
        Form,
        // Field,
        SongSelect
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
            },
            // songs: [],
            songIds: [],
            formError: ''
        }
    },
    methods: {
        onSubmit(){
            this.fieldsValues.isPublic = true;
            this.fieldsValues.songIds = this.songIds.map((songId, id) => {
                return {
                    songId: songId,
                    songIndex: id,
                }
            });
        axios.post(this.addPlaylistURL, this.fieldsValues, { 
            withCredentials: true}
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
            console.log('chenged', songIds)
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
    max-width: 30vw;
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