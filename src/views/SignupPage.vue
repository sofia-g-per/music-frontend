<template>
    <div class="sign-up-page-wrapper">
        <h1 class="page-title gradient-text">Регистрация</h1>

        <signup-form :submitURL="fullApiUrl" :initialUser="undefined" :validationSchema="schema" @onSubmitSuccessful="handleSuccessfulSubmit">

        </signup-form>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SignupForm from '@/components/forms/SignupForm.vue'
export default defineComponent({
    name: "SignupPage",
    components: {
        SignupForm
    },
    setup(){
        const schema = {
            name: 'required|max:35',
            username: 'required|max:35',
            email: 'required|email',
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
        }
    },
    computed: {
        fullApiUrl():string {
            return `${this.$store.state.APIURL}${this.apiUrlExtension}`;
        }
    },
    methods: {
        handleSuccessfulSubmit(){
            this.$router.push('/login');
        }
    }
})
</script>
