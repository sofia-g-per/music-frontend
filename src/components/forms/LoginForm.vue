<template>
    <Form method="post" @submit="onSubmit">
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

    </Form>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { LoginDto } from '@/dtos/login.dto'
import { Form, useForm } from 'vee-validate'
import TextField from '../UI/form/TextField.vue'
export default defineComponent({
    name: 'LoginForm',
    components: {
        TextField,
        Form
    },
    // setup(){
    //     const { errors } = useForm();    
    // },
    data(){
        return{
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
            console.log('errors')
        }
    }
})
</script>
