<template>
            <multiselect 
                :options="options"
                mode="tags"
                :multiple="true"
                placeholder="Добавить других артистов"
                label="stagename"
                track-by="id"
                custom-label="Введите название жанра"
            >
            </multiselect>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Multiselect from '@vueform/multiselect'
import axios from 'axios'
export default defineComponent({
    name: "ArtistSelect",
    components: {
        Multiselect
    },
    data(){
        return{
            options:[]
        }
    },
    methods: {
        addTag (newTag) {
        const tag = {
            name: newTag,
            code: newTag.substring(0, 2) + Math.floor((Math.random() * 10000000))
        }
        this.taggingOptions.push(tag)
        this.taggingSelected.push(tag)
        },
    },
    mounted() {
        axios.get(`${this.$store.state.APIURL}${this.$store.state.APIExtensions.getArtists}`, { withCredentials: true })
       .then((response) => {
            if(response.status === 200 && response.data){
                this.options = response.data;
                console.log('genres', this.options);
            }

        })
        // .catch((error) =>{        
        // })
    },
    watchers:{
        options(){
            console.log(this.options);
        }
    }

})
</script>
<style src="@vueform/multiselect/themes/default.css"></style>