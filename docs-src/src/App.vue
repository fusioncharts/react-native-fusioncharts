<template>
  <div id="app">
    <tab-component></tab-component>
    <div class="page-container">
      <div id="mainContainer" class="main-container">
        <banner-component></banner-component>
        <feature-component></feature-component>
        <router-view></router-view>
        <div class="container container-1200 info-wrapper pt-4" style="z-index: 0;">
          <!-- Quick Start -->
          <div class="row">
            <div class="col">
              <div class="h2 mt-2">Quick Start</div>
              <installation-component></installation-component>
              <setup-component></setup-component>
            </div>
          </div>
        </div>
        <footer-component></footer-component>
      </div>
    </div>
  </div>
</template>

<script>
import TabComponent from './components/TabComponent';
import BannerComponent from './components/BannerComponent';
import FeatureComponent from './components/FeatureComponent';
import FooterComponent from './components/FooterComponent';
import InstallationComponent from './components/quick-start/InstallationComponent';
import SetupComponent from './components/quick-start/SetupComponent';
export default {
  name: 'app',
  components: {
    TabComponent,
    BannerComponent,
    FeatureComponent,
    FooterComponent,
    InstallationComponent,
    SetupComponent
  }
};
</script>

<style>
</style>
