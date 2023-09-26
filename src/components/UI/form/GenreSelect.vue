<template>
    <!-- <div class="genre-select-wrapper"> -->
        <div class="select-wrapper">
            <span class="select-title">Жанры: </span>
            <div class="genre-filters" v-if="genres">
                    <label v-for="option in genres" 
                    :key="uniqueElementId(option.id)" 
                    class="genre-filter" 
                    :for="uniqueElementId(option.id)" 
                    >
                        <span>{{option.name}}</span>
                        <Field type="checkbox" :id="uniqueElementId(option.id)" v-model="genreIds" @change="onAddGenre($event, option)"  name="genreIds" :value="option.id"/>
                    </label>
            </div>
        </div>
        <div class="select-wrapper">
            <span class="select-title chosen-title">Выбранные жанры: </span>
            <div class="genre-filters" v-if="genres">
                    <label v-for="(option, index) in selectedGenres" 
                    :key="uniqueElementId(index)" 
                    class="genre-filter genre-filter--active" 
                    :for="uniqueElementId(option.id)" 
                    >
                        <span>{{option.name}}</span>
                        <Field type="checkbox" :id="uniqueElementId(option.id)" v-model="selectedGenres" @change="onRemoveGenre($event, option)"  name="genreIds" :value="option.id"/>
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
          console.log('initial', this.initialSelectedGenres)
          if(this.initialSelectedGenres){
            this.initialSelectedGenres.forEach(genre => {
                this.onAddGenre(null, genre);
            })
        }

    },
    watch:{
        selectedGenres(){
            let genreIds = this.selectedGenres.map((genre)=> {
                return genre.id
            })
            this.$emit('onGenreIdsChange', genreIds)
        },
        initialGenreIds(){
            this.genreIds = this.initialGenreIds;
        },
        initialSelectedGenres(){
            this.initialSelectedGenres.forEach((genre)=>{
                this.selectedGenres.push(genre);
                const index = this.genres.findIndex((item)=> item.id === genre.id)
                this.genres.splice(index, 1);
            })

        },
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
        },
        uniqueElementId(id){
            return 'genre-' + id;
        },
    }
})
</script>

<style src="@/assets/styles/UI/form/genreSelect.css"></style>