<template>
    <!-- <div class="genre-select-wrapper"> -->
        <div class="select-wrapper">
            <span class="select-title">Жанры: </span>
            <div class="genre-filters" v-if="genres">
                    <label v-for="option in genres" 
                    :key="option.id" 
                    class="genre-filter" 
                    :for="option.id" 
                    >
                        <span>{{option.name}}</span>
                        <Field type="checkbox" :id="option.id" v-model="genreIds" @change="onAddGenre($event, option)"  name="genreIds" :value="option.id"/>
                    </label>
            </div>
        </div>
        <div class="select-wrapper">
            <span class="select-title chosen-title">Выбранные жанры: </span>
            <div class="genre-filters" v-if="genres">
                    <label v-for="(option, index) in selectedGenres" 
                    :key="index" 
                    class="genre-filter genre-filter--active" 
                    :for="option" 
                    >
                        <span>{{option.name}}</span>
                        <Field type="checkbox" :id="option.id" v-model="selectedGenres" @change="onRemoveGenre($event, option)"  name="genreIds" :value="option.id"/>
                    </label>
            </div>
        </div>
    <!-- </div> -->
        <!-- <p class="form-field__error-label" v-show="errors.genreIds">{{errors.genreIds}}</p> -->
</template>

<script lang="ts">
import { defineComponent, toRaw } from 'vue'
import { Field } from 'vee-validate';
import axios from 'axios';
export default defineComponent({
    props: ['initialGenreIds', 'initialSelectedGenres'],
    emits: ['onGenreIdsChange'],
    components:{
        Field
    },
    data() {
        return {
            genres: [],
            //для чекбоксов
            genreIds: [],
            // для выбранных песен
            selectedGenres: []
        }
    },
    mounted(){
        // получение вариантов жанров с сервера
        axios.get(`${this.$store.state.APIURL}${this.$store.state.APIExtensions.getGenres}`)
        .then((response) => {
          if(response.status === 200 && response.data){
              this.genres =  toRaw(response.data);
          }
       })
        .catch((error)=>{
              console.log(error)
          })

    },
    watch:{
        selectedGenres(){
            let genreIds = this.selectedGenres.map((genre)=> {
                return genre.id
            })
            this.$emit('onGenreIdsChange', genreIds)
        },
        // initialgenreIds(){
        //     this.genreIds = this.initialgenreIds;
        //     // selected
        // },
        // initialselectedGenres(){
        //     this.selectedGenres = this.initialselectedGenres;
        // }
    },
    methods:{
        onAddGenre(e, genre){
            this.selectedGenres.push(genre);
            const index = this.genres.findIndex((item)=> item.id === genre.id)
            this.genres.splice(index, 1);
            this.$emit('onGenreIdsChange', this.genreIds)

        },
        onRemoveGenre(e, genre){
            const index = this.selectedGenres.findIndex((item)=> item.id === genre.id)
            this.selectedGenres.splice(index, 1);
            this.genres.push(genre);
            this.$emit('onGenreIdsChange', this.genreIds)
        }
    }
})
</script>

<style scoped>
/*
.genre-select-wrapper{
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    width: 50vw;
}
.song-select{
    min-height: 20vh;
    max-width: 100%;
}

.select-wrapper{
    max-width: 25vw;

}
.music-list-item{
    max-width: 25vw;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    padding: 1rem;
}


.music-list-item__artist-wrapper{
    padding-left: 1rem;
}
*/
.genre-select-wrapper{
    display: flex;
    flex-direction: column;
    gap: 1rem;
}
.select-wrapper{
    display: flex;
    gap: 2rem;
    grid-column: 1/ span 2 ;

}

.genre-filter{
    height: min-content;
    white-space: nowrap;

}

.select-title{
    font-size: 1.5rem;
    color: var(--accent-color-1);
    letter-spacing: 0.3rem;

} 

.chosen-title{
    color: var(--accent-color-2)
}

</style>