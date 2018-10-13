<template>
  <div>
    <!-- Demo Section start -->
    <div class="demo bg-light-purple pt-4 pb-4">
      <div class="container container-1200 info-wrapper">
        <!-- <router-view></router-view> -->
        <!-- Chart selection for mobile devices - start -->
        <div class="row">
          <div class="side-nav col-3 d-none d-md-block">
            <div class="nav-heading">Quick Demo:</div>
            <!-- Demo List -->
            <div class="nav-list demo-list">
              <router-link to="/column_2d">
                <a>
                  <div v-bind:class="getClassColumn()">
                    <div class="h5">{{sampleCode['ex1'].title}}</div>
                    <div class="p item-desc">{{sampleCode['ex1'].description}}</div>
                  </div>
                </a>
              </router-link>
              <router-link to="/3d_pie_chart">
                <a>
                  <div v-bind:class="getClassPie()">
                    <div class="h5">{{sampleCode['ex2'].title}}</div>
                    <div class="p item-desc">{{sampleCode['ex2'].description}}</div>
                  </div>
                </a>
              </router-link>
              <router-link to="/update_chart_data">
                <a>
                  <div v-bind:class="getClassUpdate()">
                    <div class="h5">{{sampleCode['ex3'].title}}</div>
                    <div class="p item-desc">{{sampleCode['ex3'].description}}</div>
                  </div>
                </a>
              </router-link>
              <router-link to="/listen_events_chart">
                <a>
                  <div v-bind:class="getClassListenEvents()">
                    <div class="h5">{{sampleCode['ex4'].title}}</div>
                    <div class="p item-desc">{{sampleCode['ex4'].description}}</div>
                  </div>
                </a>
              </router-link>
              <router-link to="/drill_down">
                <a>
                  <div v-bind:class="getClassDrillDown()">
                    <div class="h5">{{sampleCode['ex5'].title}}</div>
                    <div class="p item-desc">{{sampleCode['ex5'].description}}</div>
                  </div>
                </a>
              </router-link>
              <router-link to="/gauge">
                <a>
                  <div v-bind:class="getClassGauge()">
                    <div class="h5">{{sampleCode['ex6'].title}}</div>
                    <div class="p item-desc">{{sampleCode['ex6'].description}}</div>
                  </div>
                </a>
              </router-link>
              <router-link to="/theme">
                <a>
                  <div v-bind:class="getClassTheme()">
                    <div class="h5">{{sampleCode['ex7'].title}}</div>
                    <div class="p item-desc">{{sampleCode['ex7'].description}}</div>
                  </div>
                </a>
              </router-link>
              <router-link to="/change_type_runtime">
                <a>
                  <div v-bind:class="getClassChangeType()">
                    <div class="h5">{{sampleCode['ex8'].title}}</div>
                    <div class="p item-desc">{{sampleCode['ex8'].description}}</div>
                  </div>
                </a>
              </router-link>
            </div>
          </div>
          <div class="col-md-9 col-12" ng-controller="DemoController">
            <router-view></router-view>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Samples from '../../assets/samples.js';
export default {
  name: 'DemoSectionComponent',
  data() {
    return {
      sampleCode: Samples
    };
  },
  methods: {
    getClassColumn() {
      return this.$route.path === '/column_2d'
        ? 'nav-item selected'
        : 'nav-item';
    },
    getClassPie() {
      return this.$route.path === '/3d_pie_chart'
        ? 'nav-item selected'
        : 'nav-item';
    },
    getClassUpdate() {
      return this.$route.path === '/update_chart_data'
        ? 'nav-item selected'
        : 'nav-item';
    },
    getClassListenEvents() {
      return this.$route.path === '/listen_events_chart'
        ? 'nav-item selected'
        : 'nav-item';
    },
    getClassDrillDown() {
      return this.$route.path === '/drill_down'
        ? 'nav-item selected'
        : 'nav-item';
    },
    getClassGauge() {
      return this.$route.path === '/gauge' ? 'nav-item selected' : 'nav-item';
    },
    getClassTheme() {
      return this.$route.path === '/theme' ? 'nav-item selected' : 'nav-item';
    },
    getClassChangeType() {
      return this.$route.path === '/change_type_runtime'
        ? 'nav-item selected'
        : 'nav-item';
    }
  }
};
</script>