<template>
    <!-- <div class="genre-select-wrapper"> -->
        <div class="select-wrapper">
            <span class="select-title"> {{title}} </span>
            <div class="genre-filters" v-if="options">
                <label v-for="option in options" 
                :key="uniqueElementId(option.id)" 
                class="genre-filter" 
                :for="uniqueElementId(option.id)" 
                >
                <span>{{option[displayProperty]}}</span>
                    <Field type="checkbox" :id="uniqueElementId(option.id)" v-model="optionIds" @change="onAdd($event, option)"  name="optionIds" :value="option.id"/>
                </label>
            </div>
        </div>
        <div class="select-wrapper">
            <span class="select-title chosen-title">Выбранные: </span>
            <div class="genre-filters" v-if="options">
                    <label v-for="(option, index) in selected" 
                    :key="uniqueElementId(index)" 
                    class="genre-filter genre-filter--active" 
                    :for="uniqueElementId(option.id)" 
                    >
                        <span>{{option[displayProperty]}}</span>
                        <Field type="checkbox" :id="uniqueElementId(option.id)" v-model="selected" @change="onRemove($event, option)"  name="optionIds" :value="option.id"/>
                    </label>
            </div>
        </div>
    <!-- </div> -->
        <!-- <p class="form-field__error-label" v-show="errors.optionIds">{{errors.optionIds}}</p> -->
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Field } from 'vee-validate';
export default defineComponent({
    props: ['title', 'optionsProp', 'initialOptionIds', 'initialSelected', 'displayProperty'],
    emits: ['onMultipleSelectChange'],
    components:{
        Field
    },
    data() {
        return {
            options: [],
            //для чекбоксов
            optionIds: [],
            // для выбранных песен
            selected: []
        }
    },
    mounted(){
        if(this.initialSelectedArtists){
            this.initialSelectedArtists.forEach(genre => {
                this.onAdd(null, genre);
            })
        }
    },
    watch:{
        selected(){
            let optionIds = this.selected.map((genre)=> {
                return genre.id
            })
            this.$emit('onMultipleSelectChange', optionIds)
        },
        initialOptionIds(){
            this.optionIds = this.initialOptionIds;
        },
        initialSelected(){
            this.initialSelected.forEach((genre)=>{
                this.selected.push(genre);
                const index = this.options.findIndex((item)=> item.id === genre.id)
                this.options.splice(index, 1);
            })
        },
        optionsProp(){
            this.options = this.optionsProp;
        }
    },
    methods:{
        onAdd(e, genre){
            this.selected.push(genre);
            const index = this.options.findIndex((item)=> item.id === genre.id)
            this.options.splice(index, 1);
            this.$emit('onMultipleSelectChange', this.optionIds)

        },
        onRemove(e, genre){
            const index = this.selected.findIndex((item)=> item.id === genre.id)
            this.selected.splice(index, 1);
            this.options.push(genre);
            this.$emit('onMultipleSelectChange', this.optionIds)
        },
        uniqueElementId(id){
            return this.title + '-' + id;
        },
    },
    computed:{

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