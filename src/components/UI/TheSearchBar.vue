<template>
    <div class="search-bar__wrapper">
        <input type="text" class="search-bar" @keydown.enter="handleSearch" v-model="searchQuery">
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
            const fullApiUrl = `${this.$store.state.APIURL}${this.searchAPIURL}`
            axios.get(fullApiUrl, { 
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
