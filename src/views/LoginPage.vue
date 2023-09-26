<template>
  <div class="login-page">
    <div class="login-page__image-wrapper">
      <img src="@/assets/images/Vectors-cropped.svg" >
    </div>
    
    <login-form></login-form>

  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import LoginForm from "@/components/forms/LoginForm.vue";

export default defineComponent({
  name: 'LoginPage',
  components: {
    LoginForm
  },
  props: {
  },
  data(){
    return{
    }
  },
});
</script>

<style scoped src="@/assets/styles/pages/loginPage.css">

</style>
