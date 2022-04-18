<template>
    <div v-if="options">
        <label class="typo__label">Жанры: </label>
            <multiselect 
                v-model="value" 
                :options="options"
                mode="tags"
                :multiple="true"
                :close-on-select="false"
                placeholder="Выбор жанров"
                :searchable="true"
                label="name"
                track-by="name"
                custom-label="Введите название жанра"
                :show-no-results="false"
                
                >
            </multiselect>
    </div>
    <p v-else>Произошла ошибка при загрузки жанров</p>
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
    data () {
        return {
        value: null,
        options: [],
        // options: [
        //     {name: 'hi'},
        //     {name: 'hey'},
        //     {name: 'hello'},
        // ]
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
        axios.get(this.fullApiUrl)
       .then((response) => {
              if(response.status === 200 && response.data){
                  this.options = response.data;
                  console.log('genres', this.options);
              }

        })
        // .catch((error) =>{        
        // })
    },
    computed:{
        fullApiUrl(){
            return `${this.$store.state.APIURL}${this.$store.state.APIExtensions.getGenres}`;
        }
    }

})
</script>
<style src="@vueform/multiselect/themes/default.css"></style>