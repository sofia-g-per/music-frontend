<template>
    <Form method="post" :validation-schema="schema" @submit="onSubmit" class="form">
        <text-field 
            :field-data="fieldsData.name" 
            v-model="fieldsValues.name"
            rules="required"
        />
        <text-field 
            :field-data="fieldsData.username" 
            v-model="fieldsValues.username"
            rules="required"
        />
        <text-field 
            :field-data="fieldsData.email" 
            v-model="fieldsValues.email"
            rules="required"
        />

        <div class="form-field">
            <label for="password" class="form-field__label">
                Пароль
            </label>
            <Field type="password" class="form-field__input" name="password"  v-model="fieldsValues.password" />
            <p class="form-field__error-label" name="password" v-show="true">
                Заполните данное поле
            </p>
        </div>
        <div class="form-field boolean-field">
            <label class="form-field__label">
                {{fieldsData.roleId.label}}
            </label>
            <Field :name="fieldsData.roleId.name" type="checkbox" v-model="fieldsValues.roleId" value="artist" :unchecked-value="false" />
        </div>
        <file-field 
            :field-data="fieldsData.avatar" 
            v-model="fieldsValues.avatar" 
            rules="required|mimes:audio/mpeg"
            defaultError="Прикрепите файл в формате mp3"
        > </file-field>
        <div
            v-if="fieldsValues.roleId && fieldsValues.roleId === fieldsData.roleId.value"
            :fieldsValues="fieldsValues"
            :fieldsData="fieldsData"
        >
            <text-field 
                :field-data="fieldsData.artist.stagename" 
                v-model="artistFieldsValues.stagename"
                rules="required"
            />
            <text-field 
                :field-data="fieldsData.artist.description" 
                v-model="artistFieldsValues.description"
            />
        </div>

        <p class="form-field__error-label">{{formError}}</p>
        <button  class="main-btn main-btn--fill" type="submit">Сохранить</button>
    </Form>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Form, Field } from 'vee-validate'
import TextField from '../UI/form/TextField.vue'
import FileField from '../UI/form/FileField.vue';
import axios from 'axios';
import { CreateUserDto } from '@/dtos/createUser.dto';
import { CreateArtistDto } from '@/dtos/createArtist.dto';
import { defineRule } from 'vee-validate';

export default defineComponent({
    name: 'SignUpForm',
    components: {
        TextField,
        Field,
        Form,
        FileField
    },
    setup(){
        const schema = {
            name: 'required',
            username: 'required',
            email: 'required',
            password: 'required',
            // avatar:
            // stagename: 'validateArtist'
        };
        return {
            schema
        }
    },
    data(){
        return{
            apiUrlExtension: 'sign-up', 
            fieldsValues: new CreateUserDto,
            artistFieldsValues: new CreateArtistDto,
            isArtist: false,
            fieldsData: {
                email: {
                    name: 'email',
                    label: 'Почта'
                },
                password: {
                    name: 'password',
                    label: 'Пароль'
                },
                name: {
                    name: 'name',
                    label: 'Имя'
                },
                username: {
                    name: 'username',
                    label: 'Имя пользователя'
                },
                roleId: {
                    name: 'roleId',
                    value: 'artist',
                    label: 'Вы хотите зарегистрироваться как артист?'
                },
                avatar:{
                    name: 'avatar',
                    label: 'Загрузить аватар'
                },
                artist: {
                    stagename: {
                        name: 'stagename',
                        label: 'Псевдоним'
                    },
                    description: {
                        name: 'description',
                        label: 'Описание'
                    },
                }
            },
            options: [],
            formError: ''
        }
    },
    methods: {
        onSubmit(){
            if(this.fieldsValues.roleId){
                this.fieldsValues.artist = this.artistFieldsValues;
            }
        axios.post(this.fullApiUrl, this.fieldsValues)
          .then((response) => {
              if(response.status === 201 && response.data){
                  this.$router.push('/login');
              }
            })
            .catch((error)=>{
              if(error.response.message){
                  this.formError = error.response.message;
              }else{
                  this.formError = 'Простите, произошла ошибка при загрузке данных'
              }
          })
        },
        test(){
            console.log(this.fieldsValues.roleId)
        }
    },
    computed: {
        fullApiUrl():string {
            return `${this.$store.state.APIURL}${this.apiUrlExtension}`;
        }
    },

})
</script>

<style scoped>
.form{
    width: 40vw;
    max-width: auto;
}
</style>
