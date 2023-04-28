<template>
    <div class="form-field form-field--text-area">
        <label :for="fieldData.name" class="form-field__label">
          {{fieldData.label}}
        </label>
        <Field v-slot="{ field }" v-bind="$attrs" :name="fieldData.name"   aria-autocomplete="off" autcomplete="off" >
            <textarea  class="form-field__input form-field__input--text-area" v-bind="field" :name="fieldData.name"/>
        </Field>
        <p class="form-field__error-label" :name="fieldData.name">
          {{errorMessage? 'Заполните данное поле': ''}}
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

.form-field__input--text-area{
  min-height: 8rem;
}
</style>