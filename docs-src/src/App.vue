<template>
  <div id="app">
    <tab-component></tab-component>
    <div class="page-container">
      <div id="mainContainer" class="main-container">
        <banner-component></banner-component>
        <feature-component></feature-component>
        <demo-section-component></demo-section-component>
        <div class="container container-1200 info-wrapper pt-4" style="z-index: 0;">
          <!-- Quick Start -->
          <div class="row">
            <div class="col">
              <div class="h2 mt-2">Quick Start</div>
              <installation-component></installation-component>
              <setup-component></setup-component>
              <div class="h2 mt-2">Creating your first chart</div>
              <getting-started-component></getting-started-component>
              <div class="h2 mt-2">Listening to Events</div>
              <events-component></events-component>
              <div class="h2 mt-2">Calling chart APIs</div>
              <chart-api-component></chart-api-component>
              <div class="h2 mt-2">Usage and integration of FusionTime</div>
              <time-series-support></time-series-support>
            </div>
          </div>
          <div class="row">
            <div class="col-12 pt-3">
              <div class="h5">Support</div>
              <p>
                <a
                  class="ref-link"
                  href="//github.com/fusioncharts/angular-fusioncharts/issues"
                  target="_blank"
                >GitHub Issues</a> |
                <a
                  class="ref-link"
                  href="mailto:support@fusioncharts.com"
                  target="_blank"
                >Contact FusionCharts Support</a>
              </p>
            </div>
          </div>
          <div class="row">
            <div class="col-12 pt-3">
              <div class="h5">Licensing</div>
              <p>
                React Native FusionCharts module is licensed under open-source, distributed under the terms of the MIT/X11 License.
                You will still need to include FusionCharts in your page, as this project provides no direct functionality.
                You can download a free evaluation version
                <a
                  class="ref-link"
                  href="//www.fusioncharts.com/download/"
                  target="_blank"
                >here</a>. To use in a commercial environment, please
                <a
                  class="ref-link"
                  href="//www.fusioncharts.com/buy/"
                  target="_blank"
                >purchase a FusionCharts license</a>.
              </p>
            </div>
          </div>
        </div>
        <footer-component></footer-component>
      </div>
    </div>
  </div>
</template>

<script>
import TabComponent from "./components/TabComponent";
import BannerComponent from "./components/BannerComponent";
import FeatureComponent from "./components/FeatureComponent";
import FooterComponent from "./components/FooterComponent";
import InstallationComponent from "./components/quick-start/InstallationComponent";
import SetupComponent from "./components/quick-start/SetupComponent";
import GettingStartedComponent from "./components/quick-start/GettingStartedComponent";
import EventsComponent from "./components/quick-start/EventsComponent";
import ChartApiComponent from "./components/quick-start/ChartAPIComponent";
import DemoSectionComponent from "./components/demo-section/DemoSectionComponent";
import TimeSeriesSupport from "./components/quick-start/TimeSeriesSupport";

export default {
  name: "app",
  components: {
    TabComponent,
    BannerComponent,
    FeatureComponent,
    FooterComponent,
    InstallationComponent,
    SetupComponent,
    GettingStartedComponent,
    EventsComponent,
    ChartApiComponent,
    DemoSectionComponent,
    TimeSeriesSupport
  }
};
</script>

<style>
</style>
