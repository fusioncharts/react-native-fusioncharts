import Vue from 'vue/dist/vue';
import VueCodemirror from 'vue-codemirror';
import App from './App';
import './assets/github-theme/css/codemirror.css';
import './assets/github-theme/css/dracula.css';
import './assets/github-theme/css/style.css';
import './assets/style.css';
import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
import PowerCharts from 'fusioncharts/fusioncharts.powercharts';
import Widgets from 'fusioncharts/fusioncharts.widgets';
import Maps from 'fusioncharts/fusioncharts.maps';
import world from 'fusioncharts/maps/fusioncharts.world';

import VueFusionCharts from 'vue-fusioncharts';

import Gammel from 'fusioncharts/themes/fusioncharts.theme.gammel';
import Candy from 'fusioncharts/themes/fusioncharts.theme.candy';
import Zune from 'fusioncharts/themes/fusioncharts.theme.zune';
import Ocean from 'fusioncharts/themes/fusioncharts.theme.ocean';
import Carbon from 'fusioncharts/themes/fusioncharts.theme.carbon';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';

import router from './router';

Vue.use(
  VueFusionCharts,
  FusionCharts,
  Charts,
  PowerCharts,
  Widgets,
  Maps,
  world,
  Gammel,
  Candy,
  Zune,
  Ocean,
  Carbon,
  FusionTheme
);
Vue.use(VueCodemirror);

Vue.config.productionTip = false;

new Vue({
  router,
  template: '<App/>',
  components: { App }
}).$mount('#app');
