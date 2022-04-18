<template>
    <div class="form-field">
        <label :for="fieldData.name" class="form-field__label">
          {{fieldData.label}}
        </label>
        <Field :name="fieldData.name" type="file" v-bind="$attrs" v-slot="{handleChange, handleBlur}">
            <input type="file" @change="handleChange" @blur="handleBlur" />
        </Field>
        <ErrorMessage class="form-field__error-label" :name="fieldData.name"/>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Field, ErrorMessage, useField } from 'vee-validate'

export default defineComponent({
    name: "FileField",
    props: [
        'fieldData'
    ],
    components: {
        Field,
        ErrorMessage
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
