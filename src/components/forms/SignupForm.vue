<template>
    <Form method="post" :validation-schema="schema" @submit="onSubmit" class="form" v-slot="{meta}">
        <text-field 
            :field-data="fieldsData.name" 
            v-model="fieldsValues.name"
            defaultError="Заполните поле (максимум 35 символов)"

        />
        <text-field 
            :field-data="fieldsData.username" 
            v-model="fieldsValues.username"
            defaultError="Заполните поле (максимум 35 символов)"

        />
        <text-field 
            :field-data="fieldsData.email" 
            v-model="fieldsValues.email"
            defaultError="Проверьте корректность почты"

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
        <file-field 
            :field-data="fieldsData.avatar" 
            v-model="fieldsValues.avatar" 
            rules="mimes:image/jpg, image/png, image/jpeg"
            defaultError="Файл должен быть в формате jpg, png или jpeg"
        > </file-field>
        <div class="form-field boolean-field">
            <label class="form-field__label">
                {{fieldsData.roleName.label}}
            </label>
            <Field :name="fieldsData.roleName.name" type="checkbox" v-model="fieldsValues.roleName" value="artist" :unchecked-value="false" />
        </div>
        <div
            v-if="fieldsValues.roleName && fieldsValues.roleName === fieldsData.roleName.value"
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
        <button :disabled="!meta.valid" class="main-btn main-btn--fill" type="submit">Сохранить</button>
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
            name: 'required|max:35',
            username: 'required|max:35',
            email: 'required|125',
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
                roleName: {
                    name: 'roleName',
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
            if(this.fieldsValues.roleName){
                this.fieldsValues.artist = this.artistFieldsValues;
            }
        axios.post(this.fullApiUrl, this.fieldsValuesy
        )
          .then((response) => {
            console.log(response);
              if(response.status === 201 && response.data){
                  this.$router.push('/login');
              }else{
                // if(response.message){
                //   this.formError = response.message[0];
            //   }else{
                  this.formError = 'Простите, произошла ошибка при загрузке данных'
            //   }
              }
            })
            .catch((error)=>{
                console.log(error);
              if(error.response.message){
                  this.formError = error.response.message[0];
              }else{
                  this.formError = 'Простите, произошла ошибка при загрузке данных'
              }
          })
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
