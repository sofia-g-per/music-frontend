<template>
    <Form method="post" :validation-schema="schema" @submit="onSubmit" class="form" v-slot="{meta}">
        <text-field 
            :field-data="fieldsData.email" 
            v-model="fieldsValues.email"
        />

        <Field name="password" v-slot="{errorMessage, field}" v-model="fieldsValues.password">
            <div :class="{'form-field': true, 'form-field--error': errorMessage}">
            <label for="password" class="form-field__label">
                Пароль
            </label>
            <input type="password" class="form-field__input" v-bind="field"/>
            <p class="form-field__error-label" name="password" v-show="errorMessage">
                Заполните данное поле
            </p>
        </div>

        </Field>
        <p class="form-field__error-label">{{formError}}</p>

        <button :disabled="!meta.valid" class="main-btn main-btn--fill" type="submit">Войти</button>

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
                email: 'required',
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
            console.log("error", error);
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

</style>