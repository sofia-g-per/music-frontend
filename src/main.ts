import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { defineRule } from 'vee-validate'
import { required, email } from '@vee-validate/rules';

defineRule('required', required)
defineRule('email', email)

createApp(App).use(store).use(router).mount('#app')
