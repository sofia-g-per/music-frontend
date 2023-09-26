<template>
  <div class="form-field boolean-field">
      <label class="form-field__label">
          {{fieldData.label}}
      </label>
      <Field :name="fieldData.name" type="checkbox" v-model="$attrs" value="artist" :unchecked-value="false" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Field, ErrorMessage, useField } from 'vee-validate'

export default defineComponent({

  name: "BooleanField",

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
  }
})
</script>

<style scoped src="@/assets/styles/UI/form/booleanField.css">

</style>
