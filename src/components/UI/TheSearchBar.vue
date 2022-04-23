<template>
    <div class="search-bar__wrapper">
        <input type="text" class="search-bar" placeholder="Поиск..." @keydown.enter="handleSearch" v-model="searchQuery">
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
        'onSearchResponse'
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
        handleFilterChange(){
            console.log('changed')
            console.log(this.genreIds)
            if(this.genreIds){
                console.log('request')
                let params = {genreIds: JSON.stringify(this.genreIds)};
                axios.get(this.filterApiUrl, { 
                    withCredentials: true,
                    params: params
                })
                .then((response) => {
                    console.log(response)
                    if(response.status === 200 && response.data){
                        this.$emit('onSearchResponse', response.data);  
                    }

                })
                .catch((error) =>{
                    console.log(error);
                })
            }

        }
    }
})
</script>


<style scoped>

    .search-bar__wrapper{
        display: flex;
        flex-direction: column;
        width: 100%;
        align-items: center;
        position: relative;
        gap: .5rem;
    }
    .search-bar{
        width: 50%;
        background: var(--bg-color);
        padding: .8rem;
        border: 1px solid var(--font-color);
        border-radius: 1rem;
        color: var(--font-color);
        transition: .3s;
    }

    .search-bar::placeholder{
        color: var(--font-color);
    }

    .search-bar:focus{
        transform: scale(1.015);
    }
    .search-bar::after{
        content:'';
        display: block;
        background-image: url('../../assets/images/search-icon.png');
        width: 2rem;
        position: absolute;
        right: 0;
    }

    .genre-filters{
        display: flex;
        gap: 2rem;
    }

    .genre-filter{
        background: var(--accent-color-2);
        border-radius: 5rem;
        padding: 1rem;
        min-width: 7rem;
        display: flex;
        justify-content: center;
        font-size: 1.3rem;
        font-weight: 700;
        cursor: pointer;
        transition: .3s;
    }
    .genre-filter:hover{
        transform: scale(0.9);
    }
    .genre-filter input{
        display: none;
    }


</style>
