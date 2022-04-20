<template>
    <div class="form-field">
        <label :for="fieldData.name" class="form-field__label">
          {{fieldData.label}}
        </label>
        <Field class="form-field__input" :name="fieldData.name" type="text" v-bind="$attrs" />
        <ErrorMessage class="form-field__error-label" :name="fieldData.name"/>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Field, ErrorMessage, useField } from 'vee-validate'

export default defineComponent({

  name: "TextField",

  components: {
    Field,
    ErrorMessage
  },  
  props: ['fieldData'], 
    setup(props) {
    const { errorMessage } = useField(props.fieldData.name as string);
    return {
      errorMessage
    }
  },
})
</script>

<style>

</style>