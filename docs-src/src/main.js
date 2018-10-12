import Vue from 'vue/dist/vue';
import VueCodemirror from 'vue-codemirror';
import App from './App';
import './assets/github-theme/css/codemirror.css';
import './assets/github-theme/css/dracula.css';
import './assets/github-theme/css/style.css';
import './assets/style.css'

import router from './router';

Vue.use(VueCodemirror);



Vue.config.productionTip = false

new Vue({
  router,
  template: '<App/>',
  components: { App }
}).$mount('#app')
