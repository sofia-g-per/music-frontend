<template>
    <div class="add-song-page-wrapper">
        <signup-form :submitURL="fullApiUrl" :initialUser="initialUser" @onSubmitSuccessful="handleSuccessfulSubmit">

        </signup-form>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SignupForm from '@/components/forms/SignupForm.vue'
import axios from 'axios';
import { UserDto } from '@/dtos/userDto.dto';
export default defineComponent({
    name: "EditAlbumPage",
    components: {
        SignupForm
    },
    data(){
        return {
            initialUser: new UserDto(),
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
                if(response.status === 200 && response.data){
                    this.initialUser = response.data as UserDto;
                    console.log('this.initialUser from page', response.data);

                }
            }
        )
        .catch((error)=>{
            console.log(error)
        })
    },
    methods: {
        handleSuccessfulSubmit(response){
            this.$store.dispatch('saveUser', {user: response.data});
            this.$router.push('/');
        }
    }
    
})
</script>
