<template>
    <Form method="post" :validation-schema="schema" @submit="onSubmit" class="form">
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
            rules="required|mimes:audio/mpeg"
            defaultError="Прикрепите файл в формате mp3"
        >     
        </file-field>
        <button  class="main-btn" type="submit">Добавить</button>
    </Form>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Form } from 'vee-validate'
import TextField from '../UI/form/TextField.vue'
import FileField from '../UI/form/FileField.vue';
import axios from 'axios';
import { CreateSongDto } from '@/dtos/createSong.dto';

export default defineComponent({
    name: 'AddSongForm',
    components: {
        TextField,
        Form,
        FileField,
    },
    data(){
        return{
            apiUrlExtension: 'add-song', 
            fieldsValues: new CreateSongDto,
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
                }
            }
        }
    },
    setup(){
        const schema = {
            name: 'required',
            audioFile: "required|mimes:audio/mpeg"
        };
        return {
            schema
        }
    },
    methods: {
        onSubmit(){
        var formData = new FormData();
        for ( const [key, value] of Object.entries(this.fieldsValues) ) {
                if(key === 'audioFile'){
                    formData.append(key, this.fieldsValues[key][0]);
                    
                }else{
                    formData.append(key, this.fieldsValues[key]);

                }
            }
        axios.post(this.fullApiUrl, formData, { 
            withCredentials: true,  
            headers: {
                'Content-Type': 'multipart/form-data'
                }
            })
          .then(
            (response) => {
              if(response.status === 201 && response.data){
                  this.$router.push('/my-songs');
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
        }
    },
    computed: {
        fullApiUrl():string {
            return `${this.$store.state.APIURL}${this.$store.state.APIExtensions.uploadSong}`;
        }
    },

})
</script>
