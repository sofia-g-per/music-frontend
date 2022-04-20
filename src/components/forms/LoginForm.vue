<template>
    <Form method="post" @submit="onSubmit" class="form">
        <text-field 
            :field-data="fieldsData.email" 
            v-model="fieldsValues.email"
            rules="required|email"
        />

        <text-field 
            :field-data="fieldsData.password" 
            v-model="fieldsValues.password"
            rules="required"

        />
        <button type="submit">Войти</button>
    </Form>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { LoginDto } from '@/dtos/login.dto'
import { Form, useForm } from 'vee-validate'
import TextField from '../UI/form/TextField.vue'
import axios from 'axios';


export default defineComponent({
    name: 'LoginForm',
    components: {
        TextField,
        Form
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
            }
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
        //   .catch(function(error){
        //   })
        }
    },
    computed: {
        fullApiUrl():string {
        return `${this.$store.state.APIURL}${this.apiUrlExtension}`;
        
        }
    }
})
</script>
