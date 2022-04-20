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
        <!-- <genre-select 
            v-model="fieldsValues.genreIds">

        </genre-select>
        <artist-select 
            v-model="fieldsValues.artistIds"> 

        </artist-select> -->
        <button type="submit">Добавить песню</button>
    </Form>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Form } from 'vee-validate'
import TextField from '../UI/form/TextField.vue'
import FileField from '../UI/form/FileField.vue';
// import GenreSelect from '../UI/form/GenreSelect.vue';
// import ArtistSelect from '../UI/form/ArtistSelect.vue';
import axios from 'axios';
import { CreateSongDto } from '@/dtos/createSong.dto';

export default defineComponent({
    name: 'AddSongForm',
    components: {
        TextField,
        Form,
        FileField,
        // GenreSelect,
        // ArtistSelect
    },
    data(){
        return{
            apiUrlExtension: 'add-song', 
            fieldsValues: new CreateSongDto,
            // artistFieldsValues: new CreateArtistDto,
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
                    label: 'текст'
                },
                audioFile: {
                    name: 'audioFile',
                    label: 'Аудиофайл песни'
                }
            }
        }
    },
    methods: {
        onSubmit(){
        // console.log(this.fieldsValues.genreIds)
        // if(this.fieldsValues.genreIds){
        //     this.fieldsValues.genreIds = this.fieldsValues.genreIds.map(genre => {
        //         return genre.id
        //     });
        // }
        console.log(this.fullApiUrl)
        var formData = new FormData();
        console.log(this.fieldsValues.audioFile)
        for ( const [key, value] of Object.entries(this.fieldsValues) ) {
                if(key === 'audioFile'){
                    formData.append(key, this.fieldsValues[key][0]);
                    
                }else{
                    formData.append(key, this.fieldsValues[key]);

                }
            }
        console.log(formData)
        axios.post(this.fullApiUrl, formData, { 
            withCredentials: true,  
            headers: {
                'Content-Type': 'multipart/form-data'
                }
            })
          .then(
            (response) => {
              console.log(response);
              if(response.status === 201 && response.data){
                  console.log('correct');
                  this.$router.push('/');
              }
            }
          ).catch(function(error){
              console.log(error);
          })
        }
    },
    computed: {
        fullApiUrl():string {
            return `${this.$store.state.APIURL}${this.$store.state.APIExtensions.uploadSong}`;
        }
    },

})
</script>
