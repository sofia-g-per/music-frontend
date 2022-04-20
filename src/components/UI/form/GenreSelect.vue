<template>
            <multiselect 
                v-model="value"
                :options="options"
                mode="tags"
                :multiple="true"
                placeholder="Выбор жанров"
                label="name"
                track-by="name"
                custom-label="Введите название жанра"
                :searchable="true"

                @select="onValueChange"
            >
            </multiselect>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Multiselect from '@vueform/multiselect'
import axios from 'axios'
export default defineComponent({
    name: "GenreSelect",
    components: {
        Multiselect
    },
    data(){
        return{
            options:[],
            value:[]
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
        onValueChange(){
            console.log('artist chanegs', this.value);
        }
    },
    watchers: {
        onValueChange(){
            console.log('artist chanegs', this.value);
        }
    },
    mounted() {
        axios.get(`${this.$store.state.APIURL}${this.$store.state.APIExtensions.getGenres}`)
       .then((response) => {
            if(response.status === 200 && response.data){
                this.options = response.data;
            }

        })
        // .catch((error) =>{        
        // })
    }

})
</script>
<style src="@vueform/multiselect/themes/default.css"></style>