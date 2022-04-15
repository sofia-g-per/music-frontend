<template>
    <div class="form-field">
        <label :for="fieldData.name" @click="Test" class="form-field__label">{{fieldData.label}}</label>
        <Field :name="fieldData.name" type="text" v-bind="$attrs" />
        <ErrorMessage class="form-field__error-label" :name="fieldData.name"/>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Field, ErrorMessage, useField } from 'vee-validate'
import { toRefs, toRef } from 'vue'
import FieldData from '@/interfaces/fieldData'

export default defineComponent({

  name: "TextField",

  components: {
    Field,
    ErrorMessage
  },  
  props: ['fieldData'], 
    setup(props) {
    // const { fieldData } = toRefs(props);
    // const name = fieldData.name as string;
    const { errorMessage } = useField(props.fieldData.name as string);
    return {
      errorMessage
    }
  },
  methods: {
    Test(){
      console.log(this.errorMessage);
    }
  }


})
</script>
