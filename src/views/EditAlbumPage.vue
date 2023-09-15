<template>
    <div class="add-song-page-wrapper">
        <add-album-form v-if="loaded" :validationSchema="schema" :initialData="initialData" @onSubmitSuccessful="handleSuccessfulSubmit" :submitURL="editAlbumURL">

        </add-album-form>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AddAlbumForm from '@/components/forms/AddAlbumForm.vue';
import axios from 'axios';
import { useForm } from 'vee-validate';

export default defineComponent({
    name: "EditAlbumPage",
    components: {
        AddAlbumForm
    },
    data() {
        return {
            initialData: undefined,
            loaded: false,
        }
    },
    setup(){
        const schema = {
            releaseDate: {
                "isReleaseDateValid": true
            },
            songIds: (value) => {
                if (value && value.length) {
                    return true;
                }
                
                return 'Выберите хотя бы одну песню';
            }
        }
      

        return {
            schema
        }
    },
    mounted(){
        // загрузка редактируемого альбома
        const albumId = this.$route.params.id;
        axios.get(`${this.$store.state.APIURL}${this.$store.state.APIExtensions.getAlbum}`,
            { 
                params: {
                id: albumId
            }
        })
        .then((response) => {
            console.log('response', response);
          if(response.status === 200 && response.data){
            this.initialData =  response.data;
            //форматирование стартовых значений для формы    
            for (const [key, value] of Object.entries(this.initialData)) {
                if(key === 'releaseDate'){
                    this.initialData[key] = new Date(Date.parse(value as string)).toLocaleDateString('en-CA');
                }
                else{
                    this.initialData[key] = value; 
                }
                
            }
            console.log('intitial data id', this.initialData.id);
            
            // this.initialData.id = albumId;
            this.loaded = true;

          }
       })
        .catch((error)=>{
            console.log(error)
            if(error.response.status === 403){
                this.$router.push({name: 'login'})
              }
        })
        },
        methods: {
            handleSuccessfulSubmit(){
                this.$router.push({name:'my-albums'});
            }
        },
        computed: {
            editAlbumURL(){
                return this.$store.getters.fullURL('editAlbum')
            }
        }

})
</script>
