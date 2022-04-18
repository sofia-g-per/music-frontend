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

        <!-- <div class="form-field">
            <label :for="fieldsData.audioFile.name" class="form-field__label">
                {{fieldsData.audioFile.label}}
            </label>
            <Field :name="fieldsData.audioFile.name" rules="mimes:audio/mpeg"  v-model="fieldsValues.audioFile"  type="file" v-slot="{handleChange, handleBlur}">
                <input type="file" @change="handleChange" @blur="handleBlur" />
            </Field>
            <ErrorMessage class="form-field__error-label" :name="fieldsData.audioFile.name"/>
        </div> -->
        
        <button type="submit">Добавить песню</button>
    </Form>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Form } from 'vee-validate'
import TextField from '../UI/form/TextField.vue'
import FileField from '../UI/form/FileField.vue';
import axios from 'axios';
import { CreateSongDto } from '@/dtos/createSong.dto';
import { Field, ErrorMessage, useField } from 'vee-validate'

export default defineComponent({
    name: 'AddSongForm',
    components: {
        TextField,
        Form,
        // Field,
        // ErrorMessage,
        FileField
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
            if(this.fieldsValues.roleId){
                this.fieldsValues.artist = this.artistFieldsValues;
                console.log(this.fieldsValues)
            }
        axios.post(this.fullApiUrl, this.fieldsValues)
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
            return `${this.$store.state.APIURL}${this.apiUrlExtension}`;
        },
        file(){
            console.log(this.fieldsValues.audioFile)
            return this.fieldsValues.audioFile;
        }
    },
    //     setup() {
    //     const { errorMessage } = useField('audioFile');
    //     return {
    //         errorMessage
    //     }
    // }
})
</script>
