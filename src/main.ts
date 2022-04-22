import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { defineRule } from 'vee-validate'
import { required, email, mimes } from '@vee-validate/rules';
// import "@vueform/multiselect/themes/default.css"
//для валидации данных в формах
defineRule('required', required)
defineRule('email', email)
defineRule('mimes', mimes)

defineRule('validateArtist', (value, [target]:any, ctx) => {
    console.log(ctx.form[target], value )
    if(ctx.form[target], value ){
        if(value !== '' && value!== undefined && value !== null){
            return true
        }
        return 'Заполните данное поле'
    }
    return true

});

createApp(App).use(store).use(router).mount('#app')