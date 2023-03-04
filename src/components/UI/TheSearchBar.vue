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

    .search-bar__wrapper{
        display: flex;
        width: fit-content;
        min-width: 70rem;
        position: relative;
        gap: .5rem;
    }
    .search-bar{
        background: var(--bg-color);
        width: 100%;
        padding: .8rem;
        border: none;
        color: var(--font-color);
        transition: .3s;
        border-bottom: 2px solid;
        border-image: var(--basic-gradient) 1;
    }

    .search-bar::placeholder{
        color: var(--font-color);
        opacity: 0.5;
    }

    .search-bar:focus{
        outline: none;
        /* transform: scale(1.015); */
    }
    .search-bar__wrapper::before{
        content:'';
        display: block;
        /* background: url('../../assets/images/search_icon.svg') no-repeat; */
        background-size: 100% auto;
        width: 2rem;
    }

    .genre-filters{
        display: flex;
        gap: 2rem;
    }

    .genre-filter{
        /* border: solid 3px var(--accent-color-2); */
        background: rgb(93, 80, 82);
        border-radius: 5rem;
        padding: .7rem;
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

    .genre-filter--active{
        background: var(--accent-color-2);
    }
    .genre-filter input{
        display: none;
    }


</style>
