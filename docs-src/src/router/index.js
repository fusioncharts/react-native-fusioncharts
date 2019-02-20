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
    { path: '/', redirect: '/a_simple_chart' },
    { path: '/a_simple_chart', component: Column2DComponent },
    { path: '/a_3d_pie_chart', component: Pie3DComponent },
    { path: '/update_chart_data', component: UpdateChartData },
    { path: '/listen_to_events_from_chart', component: ListenEventsComponent },
    { path: '/add_drill_down_to_chart', component: DrillDownComponent },
    { path: '/a_simple_gauge', component: GaugeComponent },
    { path: '/applying_a_different_theme', component: ThemeComponent },
    { path: '/change_chart_type_at_runtime', component: ChangeTypeComponent }
  ]
});
