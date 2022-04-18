import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { defineRule } from 'vee-validate'
import { required, email, mimes } from '@vee-validate/rules';

//для валидации данных в формах
defineRule('required', required)
defineRule('email', email)
defineRule('mimes', mimes)

createApp(App).use(store).use(router).mount('#app')