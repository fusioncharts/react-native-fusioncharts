import Vue from 'vue/dist/vue';
import Router from 'vue-router'
import HelloWorld from '../components/HelloWorld';
import MyComponent from '../components/MyComponent';

Vue.use(Router);

export default new Router({
  routes: [
    { path: '/', component: HelloWorld },
    { path: '/new', component: MyComponent },

  ]
})