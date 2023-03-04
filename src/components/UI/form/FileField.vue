<template>
    <div class="form-field">
        <label :for="fieldData.name" class="main-btn main-btn--outline main-btn--with-icon">
          <p class="main-btn--with-icon__text">{{fieldData.label}}</p>
          <!-- <img :src="'@/assets/images/search_icon.svg'" aria-hidden> -->
        </label>
        <Field :name="fieldData.name" type="file" v-bind="$attrs" v-slot="{handleChange, handleBlur}" aria-hidden>
            <input type="file" class="file-input" @change="handleChange" @blur="handleBlur" />
        </Field>
        <p class="form-field__error-label" v-show="errorMessage">
          {{defaultError}}
        </p>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Field, ErrorMessage, useField } from 'vee-validate'

export default defineComponent({
    name: "FileField",
    props: [
        'fieldData',
        'defaultError'
    ],
    components: {
        Field
    }, 
    computed:{
        file(){
            console.log(this.errorMessage)
            return this.errorMessage;
        }
    } ,
    setup(props) {
        console.log(props)
        const { errorMessage } = useField(props.fieldData.name as string);
        return {
            errorMessage
        }
    }

})
</script>

<style scoped>
.file-input{
    visibility: hidden;
}
</style>
