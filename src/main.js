import { createApp } from 'vue'

import App from './App.vue'
import router from './router'

import NavBar from './components/core/NavBar.vue';
import SpinnerL from './components/core/SpinnerL.vue';

import VueNumberFormat from 'vue-number-format'

/**
 * Font Awesome Icons
 * 
 */
import "../node_modules/@fortawesome/fontawesome-free/css/all.css"

/**
* Bootstrap CSS, JS
 * 
*/
 // Import Bootstrap and BootstrapVue CSS files (order is important)
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";

import "./styles.css"

const app = createApp(App);
app.component('NavBar', NavBar);
app.component('SpinnerL', SpinnerL);
app.use(router);
app.use(VueNumberFormat, {prefix: 'US$ ', decimal: ',', thousand: '.'});

app.config.globalProperties.$filters = {
    real(value) {
      return parseFloat(value).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
    },
    porcentagem(value) {
        return value + '%' 
    }
}

app.mount('#app');