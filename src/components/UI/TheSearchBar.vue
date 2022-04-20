<template>
    <div class="search-bar__wrapper">
        <input type="text" class="search-bar" placholder="Введите запрос..." @keydown.enter="handleSearch" v-model="searchQuery">
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
    props: [
        'searchAPIURL'
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
                    this.songs = response.data;
                    console.log('songs',this.songs);
                    //emit event to show search results
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
    }
    .search-bar{
        width: 50%;
        background: var(--bg-color);
        border-bottom: 2px solid var(--font-color);
    }

    .search-bar::placeholder{
        color: var(--font-color);
    }

    .search-bar:focus{
        border-bottom-color: var(--accent-color-1);
    }
</style>
