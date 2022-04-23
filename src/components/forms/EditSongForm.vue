<template>
    <Form method="post" :validation-schema="schema" @submit="onSubmit" class="form">
        <text-field 
            :field-data="fieldsData.name" 
            v-model="fieldsValues.name"
        />
        <text-field 
            :field-data="fieldsData.description" 
            v-model="fieldsValues.description"
        />
        <text-field 
            :field-data="fieldsData.lyrics" 
            v-model="fieldsValues.lyrics"
        />
         <file-field 
            :field-data="fieldsData.audioFile" 
            v-model="fieldsValues.audioFile" 
            rules="mimes:audio/mpeg"
            defaultError="Прикрепите файл в формате mp3"
        >     
        </file-field>
        <div class="song-select">
            <div v-for="option in genreOptions" :key="option.id" class="music-list-item">
                <label :for="option.id">{{option.name}}</label>
                <Field type="checkbox" :id="option.id" v-model="genreIds" name="genreIds" :value="option.id"/>
            </div>
        </div>
        <p class="form-field__error-label">{{formError}}</p>
        <button  class="main-btn" type="submit">Добавить</button>
    </Form>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Form, Field } from 'vee-validate'
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
        Field
    },
    data(){
        return{
            apiUrlExtension: 'add-song', 
            initialData: {},
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
            },
            genreIds: [],
            formError: '',
            genreOptions: []
        }
    },
    setup(){
        const schema = {
            audioFile: "mimes:audio/mpeg"
        };
        return {
            schema
        }
    },
    methods: {
        onSubmit(){
        var formData = new FormData();
        for ( const [key, value] of Object.entries(this.fieldsValues) ) {
            if(key === 'audioFile' && value){
                formData.append(key, this.fieldsValues[key][0]);
                
            }else if(value && value!== this.initialData[key]){
                formData.append(key, this.fieldsValues[key]);
            }
        }
        formData.append('id', this.initialData.id)
        console.log(this.genreIds, this.genreIds.length > 0 )
        if(this.genreIds && this.genreIds.length > 0){
            formData.append('genreIds', JSON.stringify(this.genreIds));
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
              if(response.status === 201 && response.data){
                  this.$router.push('/my-songs');
              }
            }
          )            
          .catch((error)=>{
              if(error.response && error.reponse.status === 400){
                  this.errors = error.data;
              }else{
                  this.formError = 'Простите, произошла ошибка при загрузке данных'
              }
          })
        }
    },
    computed: {
        fullApiUrl():string {
            return `${this.$store.state.APIURL}${this.$store.state.APIExtensions.editSong}`;
        }
    },
    mounted(){
        const songId = this.$route.params.id;
        //загрузка редактируемой песни
        axios.get(`${this.$store.state.APIURL}${this.$store.state.APIExtensions.getSong}`,
            { 
                withCredentials: true,
                params: {
                songId: songId
            }
        })
        .then((response) => {
          if(response.status === 200 && response.data){
            this.initialData =  response.data;
            //запись стартовых значений для формы    
            for (const [key, value] of Object.entries(this.initialData)) {
                if(key !== 'genres'){
                    if(key !== 'audioFile'){
                        this.fieldsValues[key] = value; 
                    }
                }else{
                    this.genreIds = []; 
                    for(const genre of this.initialData.genres){
                        this.genreIds.push(genre.id);
                    }
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

        //загрузка жанров
        axios.get(`${this.$store.state.APIURL}${this.$store.state.APIExtensions.getGenres}`)
        .then((response) => {
          if(response.status === 200 && response.data){
              this.genreOptions =  response.data;
          }
       })
        .catch((error)=>{
              console.log(error)

        })
    }

})
</script>
