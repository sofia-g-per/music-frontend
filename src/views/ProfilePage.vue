<template>
    <div class="vertical-flex">
        <signup-form :submitURL="fullApiUrl" :initialUser="initialUser" @onSubmitSuccessful="handleSuccessfulSubmit">

        </signup-form>
        <router-link v-if="isArtist" to="/my/stats" class="main-btn main-btn--fill">Просмотреть статистику</router-link>
    </div>
</template>

<script lang="ts">
import SignupForm from '@/components/forms/SignupForm.vue';
import { UserDto } from '@/dtos/userDto.dto';
import axios from 'axios';
import { defineComponent } from 'vue'
export default defineComponent({
    name: "ProfilePage",
    components: {
        SignupForm
    },
    data(){
        return {
            initialUser: new UserDto(),
        }
    },
    computed:{
        isAuth(){
            return this.$store.state.isAuth;
        },
        isArtist(){
            return this.isAuth && this.$store.state.isArtist;
        },
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
        },
    }
})
</script>

<style scoped>
    .vertical-flex{
        display: flex;
        flex-direction: column;
        gap: 2rem;
        align-items: center;
    }
</style>