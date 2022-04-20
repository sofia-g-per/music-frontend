<template>
  <div class="login-page container--2-clmns">
    <div class="login-page__">

    </div>
    <div class="login-page__form-container">
      <login-form></login-form>
    </div>
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
</style>
