<template>
    <div :class="{'form-field': true, 'form-field--error': errorMessage}">
        <label :for="fieldData.name" class="main-btn main-btn--outline main-btn--with-icon">
          <p class="main-btn--with-icon__text gradient-text">{{fieldData.label}}</p>
          <!-- <img :src="'@/assets/images/search_icon.svg'" aria-hidden> -->
        </label>
        <Field :name="fieldData.name"  type="file" v-bind="$attrs" v-slot="{handleChange, handleBlur}" aria-hidden>
            <input :id="fieldData.name" type="file" class="file-input" @change="handleChange" @blur="handleBlur" />
        </Field>
        <p class="form-field__error-label" v-show="errorMessage">
          {{defaultError}}
        </p>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Field, ErrorMessage, useField } from 'vee-validate'
import { file } from '@babel/types';

export default defineComponent({
    name: "FileField",
    props: [
        'fieldData',
        'defaultError'
    ],
    components: {
        Field
    }, 
    setup(props) {
        const { errorMessage } = useField(props.fieldData.name as string);
        return {
            errorMessage
        }
    }

})
</script>

<style scoped src="@/assets/styles/UI/form/fileField.css">
</style>
