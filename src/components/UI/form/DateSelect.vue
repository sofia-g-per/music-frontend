<template>
    <div class="form-field">
        <label :for="fieldData.name" class="form-field__label">
          {{fieldData.label}}
        </label>
        <Field  class="form-field__input" :name="fieldData.name"  autcomplete="off" v-bind="$attrs" type="date" />
        <p class="form-field__error-label" v-show="errorMessage" :name="fieldData.name">
          {{$attrs["defaultError"]}}
        </p>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Field, useField } from 'vee-validate'

export default defineComponent({

  name: "DateSelect",

  components: {
    Field
  },  
  props: ['fieldData', 'errors'], 
    setup(props) {
    const { errorMessage } = useField(props.fieldData.name as string);
    return {
      errorMessage
    }
  }})
</script>

<style scoped>
</style>