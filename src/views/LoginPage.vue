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

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.login-page{
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
}

img{
  max-width: 100%;
}

.login-page__image-wrapper{
  padding: 0 3rem;
  display: flex;
  justify-content: center;
  max-height: 83.5vh;

}
</style>
