<template>
    <div class="search-and-filters">
    <div class="search-bar__wrapper">
        <input type="text" class="search-bar" placeholder="Поиск..." @keydown.enter="handleSearch" v-model="searchQuery">
    </div>
        <div>
            <div class="genre-filters" v-if=" withFilters && genreOptions">
                    <label v-for="option in genreOptions" 
                    :key="option.id" 
                    class="genre-filter" 
                    :for="option.id" 
                    >
                        <span>{{option.name}}</span>
                        <input type="checkbox" :id="option.id" v-model="genreIds" @change="handleFilterChange"  name="genreIds" :value="option.id"/>
                    </label>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import axios from 'axios'

export default defineComponent({
    name: 'TheSearchBar',
    data() {
        return {
            searchQuery: '',
            genreIds: [],
            genreOptions: []
        }
    },
    emits: [
        'onSearchResponse',
        'onEmptyFilters'
    ],
    props: [
        'searchAPIURL',
        'withFilters'
    ],
    mounted(){
        // жанры
        axios.get(`${this.$store.state.APIURL}${this.$store.state.APIExtensions.getGenres}`)
        .then((response) => {
          if(response.status === 200 && response.data){
              this.genreOptions =  response.data;
          }
       })
        .catch((error)=>{
              console.log(error)
          })

    },
    computed: {
        filterApiUrl(){
            return this.$store.getters.fullURL('globalFilter')
        }
    },
    methods:{
        handleSearch(){
            let params:any = {
                searchQuery: this.searchQuery,
            }
            axios.get(this.searchAPIURL, { 
                withCredentials: true,
                params: params
            })
            .then((response) => {
                if(response.status === 200 && response.data){
                    this.$emit('onSearchResponse', response.data);                    
                }

            })
            .catch((error) =>{
                console.log(error);
            })
        },
        toggleFilterClass(e){
            if(e.target){
                e.target.closest('.genre-filter').classList.toggle('genre-filter--active')
            }
        },
        handleFilterChange(e){
            this.toggleFilterClass(e);
            if(this.genreIds && this.genreIds.length){

                let params = {genreIds: JSON.stringify(this.genreIds)};
                axios.get(this.filterApiUrl, { 
                    withCredentials: true,
                    params: params
                })
                .then((response) => {
                    if(response.status === 200 && response.data){
                        this.$emit('onSearchResponse', response.data);  
                    }

                })
                .catch((error) =>{
                    console.log(error);
                })
            }else{
                this.$emit('onEmptyFilters')
            }
        }

    }
})
</script>


<style scoped>
    


</style>
