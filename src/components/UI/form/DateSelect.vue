<template>
    <div class="form-field">
        <label :for="fieldData.name" class="form-field__label">
            {{fieldData.label}}
        </label>
        <Field class="form-field__input" pattern="\d{4}-\d{2}-\d{2}"
            placeholder="дд/мм/гггг" :name="fieldData.name" v-bind="$attrs" type="date"/>
        <p class="form-field__error-label" :name="fieldData.name">
            {{errorMessage? 'Заполните данное поле': ''}}
        </p>
    </div>
    <!-- <Field :name="fieldData.name" class="date-select" as="select" v-model="$attrs">
        <p>{{fieldData.label}}</p>
        <label for=""></label>
        <option v-for="option in options" :key="option.id" class="music-list-item">
            <p :for="option.id">{{option.name}}</p> 
        </option>
    </Field> -->
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Field } from 'vee-validate'

export default defineComponent({
    name: "DateSelect",
    components: {
        Field
    },
    props: ['fieldData', 'errorMessage'],
    data(){
        return{
            options:[],
            // maskOptions: {
            //     postProcess: val => {
            //         return Date.parse(val) > new Date() 
            //     },
            // },
        }
    },
    methods: {
        
    },

})
</script>
<style ></style>