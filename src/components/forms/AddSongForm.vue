<template>
    <Form method="post" @submit="onSubmit">
        <text-field 
            :field-data="fieldsData.name" 
            v-model="fieldsValues.name"
            rules="required"
        />
        <text-field 
            :field-data="fieldsData.description" 
            v-model="fieldsValues.description"
            rules="required"
        />
        <text-field 
            :field-data="fieldsData.lyrics" 
            v-model="fieldsValues.lyrics"
            rules="required"
        />
        <file-field 
            :field-data="fieldsData.audioFile" 
            v-model="fieldsValues.audioFile" 
        >     
        </file-field>
        <genre-select 
        v-model="fieldsValues.genreIds">

        </genre-select>
        <artist-select 
        v-model="fieldsValues.artistIds">

        </artist-select>
        <button type="submit">Добавить песню</button>
    </Form>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Form } from 'vee-validate'
import TextField from '../UI/form/TextField.vue'
import FileField from '../UI/form/FileField.vue';
import GenreSelect from '../UI/form/GenreSelect.vue';
import ArtistSelect from '../UI/form/ArtistSelect.vue';
import axios from 'axios';
import { CreateSongDto } from '@/dtos/createSong.dto';

export default defineComponent({
    name: 'AddSongForm',
    components: {
        TextField,
        Form,
        FileField,
        GenreSelect,
        ArtistSelect
    },
    data(){
        return{
            apiUrlExtension: 'add-song', 
            fieldsValues: new CreateSongDto,
            // artistFieldsValues: new CreateArtistDto,
            fieldsData: {
                name: {
                    name: 'email',
                    label: 'Почта'
                },
                released_at: {
                    name: 'password',
                    label: 'Пароль'
                },
                description: {
                    name: 'name',
                    label: 'Имя'
                },
                lyrics: {
                    name: 'surname',
                    label: 'Фамилия'
                },
                audioFile: {
                    name: 'audioFile',
                    label: 'Аудиофайл песни'
                },
                // artistIds: {
                //     name: 'username',
                //     label: 'Имя пользователя'
                // },
                // genres: {
                //     name: 'roleId',
                //     value: 'artist',
                //     label: 'Вы хотите зарегистрироваться как артист?'
                // },
                // genreIds: {
                //     stagename: {
                //         name: 'stagename',
                //         label: 'Псевдоним'
                //     },
                //     description: {
                //         name: 'description',
                //         label: 'Описание'
                //     },
                // }
            }
        }
    },
    methods: {
        onSubmit(){

        this.fieldsValues = this.fieldsValues.genreIds.map(genre => {
            return genre.id
        });
        axios.post(this.fullApiUrl, this.fieldsValues, { withCredentials: true })
          .then(
            (response) => {
              console.log(response);
              if(response.status === 201 && response.data){
                  console.log('correct');
                  this.$router.push('/');
              }
            }
          ).catch(function(error){
              console.log(error, this);
          })
        }
    },
    computed: {
        fullApiUrl():string {
            return `${this.$store.state.APIURL}${this.apiUrlExtension.uploadSong}`;
        }
    },

})
</script>
