<template>
    <Form method="post" @submit="onSubmit">
        <text-field 
            :field-data="fieldsData.name" 
            v-model="fieldsValues.name"
            rules="required"
        />
        <text-field 
            :field-data="fieldsData.surname" 
            v-model="fieldsValues.surname"
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
            rules="required|email"
        />

        <text-field 
            :field-data="fieldsData.password" 
            v-model="fieldsValues.password"
            rules="required"
        />
        <boolean-field
            :field-data="fieldsData.roleId" 
            v-model="fieldsValues.roleId"
        />
        <button type="submit">Зарегистрироваться</button>
    </Form>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Form, useForm } from 'vee-validate'
import TextField from '../UI/form/TextField.vue'
import BooleanField from '../UI/form/BooleanField.vue'
import axios from 'axios';
import { CreateUserDto } from '@/dtos/createUser.dto';


export default defineComponent({
    name: 'LoginForm',
    components: {
        TextField,
        BooleanField,
        Form
    },
    data(){
        return{
            apiUrlExtension: 'sign-up', 
            fieldsValues: new CreateUserDto,
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
                    label: 'Вы хотите зарегистрироваться как артист?'
                }
            }
        }
    },
    methods: {
        onSubmit(){
            if(this.fieldsValues.roleId && this.fieldsValues.roleId.length > 0){
                this.fieldsValues.roleId = this.fieldsValues.roleId[0];
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
        }
    }
})
</script>
