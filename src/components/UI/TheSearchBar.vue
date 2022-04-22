<template>
    <div class="search-bar__wrapper">
        <input type="text" class="search-bar" placeholder="Поиск..." @keydown.enter="handleSearch" v-model="searchQuery">
        <div v-if="withFilters">
            <div class="genre-filter">
                <div v-for="option in genres" :key="option.id" class="music-list-item">
                    <label :for="option.id">{{option.name}}</label>
                    <input type="checkbox" :id="option.id" v-model="genreIds" name="genreIds" :value="option.id"/>
                </div>
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
        }
    },
    emits: [
        'onSearchResponse'
    ],
    props: [
        'searchAPIURL',
        'withFilters'
    ],
    methods:{
        handleSearch(){
            axios.get(this.searchAPIURL, { 
                withCredentials: true,
                params: {
                   searchQuery: this.searchQuery
                },
            })
            .then((response) => {
                if(response.status === 200 && response.data){
                    this.$emit('onSearchResponse', response.data);                    
                }

            })
            .catch((error) =>{
                console.log(error);
            })
        }
    }
})
</script>


<style scoped>

    .search-bar__wrapper{
        display: flex;
        width: 100%;
        justify-content: center;
        position: relative;
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
</style>
