import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { defineRule } from 'vee-validate'
import { required, email, mimes, max } from '@vee-validate/rules';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faBell } from '@fortawesome/free-solid-svg-icons'
//для валидации данных в формах
defineRule('required', required)
defineRule('email', email)
defineRule('mimes', mimes)
defineRule('max', max)

defineRule('validateArtist', (value, [target]:any, ctx) => {
    if(ctx.form[target], value ){
        if(value !== '' && value!== undefined && value !== null){
            return true
        }
        return 'Заполните данное поле'
    }
    return true

});

defineRule('isReleaseDateValid', (value:string, [target]:any, ctx)=>{
    if(ctx.form[target], value ){
            //fix -add pattern check
            const date = new Date(value);
            if( date > new Date('1900-01-01') &&
            date <= new Date()){
                return true
            } else{
                return 'Дата должна быть от 01/01/1900 и до текущей даты'
            }
    }
    return true
})


/* add icons to the library */
library.add(faBell);

createApp(App)
    .use(store)
    .use(router)
    .component('font-awesome-icon', FontAwesomeIcon)
    .mount('#app')