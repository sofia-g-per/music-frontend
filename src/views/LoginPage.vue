<template>
  <div class="login-page container--2-clmns">
    <div class="login-page__">

    </div>
    <div class="login-page__form-container">
      <h1 class="section-header">Вход в музыкальный мир</h1>
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
      apiUrlExtension: '/log-in', 
    }
  },
  computed: {
    fullApiUrl():string {
      return `${this.$store.state.APIURL}${this.apiUrlExtension}`;
       
    }
  }
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
