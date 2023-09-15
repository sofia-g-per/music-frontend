<template>
    <div class="add-song-page-wrapper">
        <h1 class="page-title gradient-text">Добавление песни</h1>
        <add-song-form :validationSchema="schema" :fullApiUrl="fullApiUrl" @onSubmitSuccessful="handleSuccessfulSubmit">

        </add-song-form>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AddSongForm from '@/components/forms/AddSongForm.vue'
export default defineComponent({
    name: "AddSongPage",
    components: {
        AddSongForm
    },
    setup(){
        const schema = {
            name: 'required|max:70',
            audioFile: "required|mimes:audio/mpeg",
            releaseDate: {
                "required": true,
                "isReleaseDateValid": true
            },
            coverImg: "mimes:image/jpeg,image/jpg,image/png",
            lyrics:"mimes:text/plain"

        };
        return {
            schema
        }
    },    
    data(){
        return{
            apiUrlExtension: 'upload-song', 
        }
    },
    computed: {
        fullApiUrl():string {
            return `${this.$store.state.APIURL}${this.apiUrlExtension}`;
        }
    },
    methods: {
        handleSuccessfulSubmit(){
            this.$router.push('/my-songs');
        }
    }
})
</script>

<style scoped>
.add-song-page-wrapper{
    padding: 0 0 2rem 0;
}
</style>
