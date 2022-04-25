<template>
    <div class="form-field">
        <label :for="fieldData.name" class="form-field__label">
          {{fieldData.label}}
        </label>
        <Field  class="form-field__input" :name="fieldData.name" aria-autocomplete="off" autcomplete="off" v-bind="$attrs" />
        <p class="form-field__error-label" :name="fieldData.name" v-show="errorMessage">
          Заполните данное поле
        </p>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Field, useField } from 'vee-validate'

export default defineComponent({

  name: "TextField",

  components: {
    Field
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
.form-field__label{
  font-size: 1.8rem;
}

.form-field__input{
padding: .5rem;
border-radius: .5rem;
}
</style>