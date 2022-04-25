<template>
    <Form method="post" :validation-schema="schema" @submit="onSubmit" class="form">
        <text-field 
            :field-data="fieldsData.email" 
            v-model="fieldsValues.email"
            rules="required|email"
        />

        <div class="form-field">
            <label for="password" class="form-field__label">
                Пароль
            </label>
            <Field type="password" class="form-field__input" name="password"  v-model="fieldsValues.password" />
            <p class="form-field__error-label" name="password" v-show="false">
                Заполните данное поле
            </p>
        </div>
        <p class="form-field__error-label">{{formError}}</p>
        <button  class="main-btn" type="submit">Войти</button>
    </Form>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { LoginDto } from '@/dtos/login.dto'
import { Form, Field} from 'vee-validate'
import TextField from '../UI/form/TextField.vue'
import axios from 'axios';


export default defineComponent({
    name: 'LoginForm',
    components: {
        TextField,
        Form,
        Field
    },
    data(){
        return{
            apiUrlExtension: 'log-in', 
            fieldsValues: new LoginDto,
            fieldsData: {
                email: {
                    name: 'email',
                    label: 'Почта'
                },
                password: {
                    name: 'password',
                    label: 'Пароль'
                }
            },
            formError: '',
        }
    },
    setup(){
            const schema = {
                email: 'required|email',
                password: 'required'
            };
        return {
            schema
        }
    },
    methods: {
        onSubmit(){
             axios.post(this.fullApiUrl, this.fieldsValues, { withCredentials: true })
          .then(
            (response) => {
              if(response.status === 201 && response.data){
                  this.$store.dispatch('saveUser', {user: response.data})
                  this.$router.push('/');
              }
            }
          )
          .catch((error)=>{
              if(error.response.status === 400){
                  this.formError = 'Проверьте правильность заполненных данных';
              }else{
                  this.formError = 'Простите, произошла ошибка при загрузке данных';
              }
          })
        }
    },
    computed: {
        fullApiUrl():string {
        return `${this.$store.state.APIURL}${this.apiUrlExtension}`;
        
        }
    }
})
</script>

<style scoped>
    .form-field__label{
    font-size: 1.8rem;
    }

    .form-field__input{
    padding: .5rem;
    border-radius: .5rem;
    }
</style>