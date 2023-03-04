<template>
    <Form method="post" @submit="onSubmit" class="form">
        <text-field 
            :field-data="fieldsData.name" 
            v-model="fieldsValues.name"
        />
        <text-field 
            :field-data="fieldsData.surname" 
            v-model="fieldsValues.surname"
        />
        <text-field 
            :field-data="fieldsData.username" 
            v-model="fieldsValues.username"
        />
        <text-field 
            :field-data="fieldsData.email" 
            v-model="fieldsValues.email"
            rules="email"
        />

        <text-field 
            :field-data="fieldsData.password" 
            v-model="fieldsValues.password"
        />
        <div class="form-field boolean-field">
            <label class="form-field__label">
                {{fieldsData.roleId.label}}
            </label>
            <Field :name="fieldsData.roleId.name" type="checkbox" v-model="fieldsValues.roleId" value="artist" checked-value="artist" unchecked-value="listener" />
        </div>
        <div
            v-if="fieldsValues.roleId && fieldsValues.roleId === fieldsData.roleId.value"
            :fieldsValues="fieldsValues"
            :fieldsData="fieldsData"
        >
            <text-field 
                :field-data="fieldsData.artist.stagename" 
                v-model="artistFieldsValues.stagename"
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
import axios from 'axios';
import { CreateUserDto } from '@/dtos/createUser.dto';
import { CreateArtistDto } from '@/dtos/createArtist.dto';
import { defineRule } from 'vee-validate';

export default defineComponent({
    name: 'SignUpForm',
    components: {
        TextField,
        Field,
        Form
    },
    setup(){
        // const schema = {
        //     email: 'email',
        //     stagename: 'validateArtist'
        // };
        // return {
        //     schema
        // }
    },
    data(){
        return{
            fieldsValues: {},
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
                surname: {
                    name: 'surname',
                    label: 'Фамилия'
                },
                username: {
                    name: 'username',
                    label: 'Имя пользователя'
                },
                roleId: {
                    name: 'roleId',
                    value: 'artist',
                    label: 'Вы хотите быть артистом?'
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
            initialUser:{},
            options: [],
            formError: ''
        }
    },
    mounted() {
        const userId =  this.$store.getters.user.id;
        // получение информации о пользователе
        axios.get(this.getUserUrl, {
            params:{
                userId: userId
            }
        })
        .then((response)=>            
            {
                console.log(response)
                if(response.status === 200 && response.data){

                    this.initialUser = response.data;
                    this.fieldsValues = response.data;
                    console.log(this.initialUser.artist)
                    if(this.initialUser.artist){
                        this.fieldsValues.roleId = "artist";
                        this.artistFieldsValues = this.initialUser.artist;
                    }
                }
            }
        )
        .catch((error)=>{
            console.log(error)
        })
    },
    methods: {
        onSubmit(){
            if(this.fieldsValues.roleId){
                this.fieldsValues.artist = this.artistFieldsValues;
            }
            axios.post(this.fullApiUrl, this.fieldsValues, {withCredentials:true})
            .then((response) => {
                if(response.status === 200 || response.status === 201  && response.data){
                    this.$store.dispatch('saveUser', {user: response.data});
                    this.$router.push('/');
                }else{
                    this.formError = 'Простите, произошла ошибка при загрузке данных'
                }
                })
                .catch((error)=>{
                    console.log(error)
                if(error.response && error.response.status === 400){
                    this.formError = error.response.message[0];
                }else{
                    this.formError = 'Простите, произошла ошибка при загрузке данных'
                }
            })
            }
    },
    computed: {
        getUserUrl(){
            return this.$store.getters.fullURL('getUser');
        },
        fullApiUrl():string {
            return this.$store.getters.fullURL('editUser');
        },
        deleteUrl(){
            return this.$store.getters.fullURL('deleteUser')
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
