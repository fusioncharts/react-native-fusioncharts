import Vue from 'vue/dist/vue';
import Router from 'vue-router';
import Column2DComponent from '../components/demo-section/sample-components/Column2DComponent';
import Pie3DComponent from '../components/demo-section/sample-components/Pie3DComponent';
import UpdateChartData from '../components/demo-section/sample-components/UpdateChartData';
import ListenEventsComponent from '../components/demo-section/sample-components//ListenEventsComponent';
import DrillDownComponent from '../components/demo-section/sample-components//DrillDownComponent';
import GaugeComponent from '../components/demo-section/sample-components//GaugeComponent';
import ThemeComponent from '../components/demo-section/sample-components//ThemeComponent';
import ChangeTypeComponent from '../components/demo-section/sample-components//ChangeTypeComponent';

Vue.use(Router);

export default new Router({
  routes: [
    { path: '/', redirect: '/column_2d' },
    { path: '/column_2d', component: Column2DComponent },
    { path: '/3d_pie_chart', component: Pie3DComponent },
    { path: '/update_chart_data', component: UpdateChartData },
    { path: '/listen_events_chart', component: ListenEventsComponent },
    { path: '/drill_down', component: DrillDownComponent },
    { path: '/gauge', component: GaugeComponent },
    { path: '/theme', component: ThemeComponent },
    { path: '/change_type_runtime', component: ChangeTypeComponent }
  ]
});
