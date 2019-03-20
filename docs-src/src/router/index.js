import Vue from 'vue/dist/vue';
import Router from 'vue-router';
import Column2DComponent from '../components/demo-section/sample-components/Column2DComponent';
import Pie3DComponent from '../components/demo-section/sample-components/Pie3DComponent';
import UpdateChartData from '../components/demo-section/sample-components/UpdateChartData';
import ListenEventsComponent from '../components/demo-section/sample-components/ListenEventsComponent';
import DrillDownComponent from '../components/demo-section/sample-components/DrillDownComponent';
import GaugeComponent from '../components/demo-section/sample-components/GaugeComponent';
import ThemeComponent from '../components/demo-section/sample-components/ThemeComponent';
import ChangeTypeComponent from '../components/demo-section/sample-components/ChangeTypeComponent';
import SimpleTimeSeriesComponent from '../components/demo-section/sample-components/SimpleTimeSeriesComponent';
import AddingReferenceLineComponent from '../components/demo-section/sample-components/AddingReferenceLineComponent';
import AnnotatingSingleData from '../components/demo-section/sample-components/AnnotatingSingleData';
import AreaTimeAxis from '../components/demo-section/sample-components/AreaTimeAxis';
import ColumnLineTimeAxis from '../components/demo-section/sample-components/ColumnLineTimeAxis';
import ColumnTimeAxis from '../components/demo-section/sample-components/ColumnTimeAxis';
import DateEventOverlay from '../components/demo-section/sample-components/DateEventOverlay';
import InteractiveCandleStick from '../components/demo-section/sample-components/InteractiveCandleStick';
import MultiTimeAxis from '../components/demo-section/sample-components/MultiTimeAxis';
import PlottingTwoVar from '../components/demo-section/sample-components/PlottingTwoVar';
import SingleEventOverlay from '../components/demo-section/sample-components/SingleEventOverlay';

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
    { path: '/change_chart_type_at_runtime', component: ChangeTypeComponent },
    {
      path: '/a_simple_timeseries_chart',
      component: SimpleTimeSeriesComponent
    },
    {
      path: '/adding_a_reference_line',
      component: AddingReferenceLineComponent
    },
    { path: '/annotating_single_data_point', component: AnnotatingSingleData },
    { path: '/area_chart_with_time_axis', component: AreaTimeAxis },
    {
      path: '/column_and_line_combination_on_time_axis',
      component: ColumnLineTimeAxis
    },
    { path: '/column_chart_with_time_axis', component: ColumnTimeAxis },
    { path: '/date_range_event_overlay', component: DateEventOverlay },
    {
      path: '/interactive_candlestick_chart',
      component: InteractiveCandleStick
    },
    {
      path: '/plotting_multiple_series_on_time_axis',
      component: MultiTimeAxis
    },
    { path: '/plotting_two_variables', component: PlottingTwoVar },
    { path: '/single_event_overlay', component: SingleEventOverlay }
  ]
});
