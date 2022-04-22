<template>
    <div class="song-select">
        <div v-for="option in options" :key="option.id" class="music-list-item">
            <label :for="option.id">{{option.name}}</label>
            <div class="music-list-item__buttons">
                <Field type="checkbox" v-model="$attrs" :value="option.id"/>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Field } from 'vee-validate'
export default defineComponent({
    name: "GenreSelect",
    components: {
        Field
    },
    props: ['options'],
    data(){
        return{
        }
    },
    methods: {
        
    },

})
</script>
<style src="@vueform/multiselect/themes/default.css"></style>