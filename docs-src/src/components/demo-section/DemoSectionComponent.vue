<template>
  <div>
    <!-- Demo Section start -->
    <div class="demo bg-light-purple pt-4 pb-4">
      <div class="container container-1200 info-wrapper">
        <!-- <router-view></router-view> -->
        <!-- Chart selection for mobile devices - start -->
        <div class="row">
          <div class="col-12 d-flex justify-content-center d-md-none">
            <div id="mobileChart-selector" class="base-dropdown chart-selector">
              <div class="selector" @click="toggleModal(true)">{{selectedTitle}}</div>
              <div class="placeholder">Quick Demo:</div>
              <div class="caret">
                <i class="fc_dropdown"></i>
              </div>
            </div>
          </div>
        </div>
        <!-- Modal for selection (Only for Mobile Devices) -->
        <div
          id="myModal"
          class="modal"
          style="z-index: 100;"
          v-bind:class="getModalClass()"
          v-bind:style="getModalStyle()"
        >
          <!-- Modal content -->
          <div class="modal-content">
            <div class="nav-list">
              <div
                class="nav-item"
                v-bind:class="sampleCode['ex1'].title === selectedTitle ? 'selected' : ''"
              >
                <div class="p" @click="openPage(1)">{{sampleCode['ex1'].title}}</div>
              </div>
              <div
                class="nav-item"
                v-bind:class="sampleCode['ex2'].title === selectedTitle ? 'selected' : ''"
              >
                <div class="p" @click="openPage(2)">{{sampleCode['ex2'].title}}</div>
              </div>
              <div
                class="nav-item"
                v-bind:class="sampleCode['ex3'].title === selectedTitle ? 'selected' : ''"
              >
                <div class="p" @click="openPage(3)">{{sampleCode['ex3'].title}}</div>
              </div>
              <div
                class="nav-item"
                v-bind:class="sampleCode['ex4'].title === selectedTitle ? 'selected' : ''"
              >
                <div class="p" @click="openPage(4)">{{sampleCode['ex4'].title}}</div>
              </div>
              <div
                class="nav-item"
                v-bind:class="sampleCode['ex5'].title === selectedTitle ? 'selected' : ''"
              >
                <div class="p" @click="openPage(5)">{{sampleCode['ex5'].title}}</div>
              </div>
              <div
                class="nav-item"
                v-bind:class="sampleCode['ex6'].title === selectedTitle ? 'selected' : ''"
              >
                <div class="p" @click="openPage(6)">{{sampleCode['ex6'].title}}</div>
              </div>
              <div
                class="nav-item"
                v-bind:class="sampleCode['ex7'].title === selectedTitle ? 'selected' : ''"
              >
                <div class="p" @click="openPage(7)">{{sampleCode['ex7'].title}}</div>
              </div>
              <div
                class="nav-item"
                v-bind:class="sampleCode['ex8'].title === selectedTitle ? 'selected' : ''"
              >
                <div class="p" @click="openPage(8)">{{sampleCode['ex8'].title}}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="side-nav col-3 d-none d-md-block">
            <div class="nav-heading">Quick Demo:</div>
            <!-- Demo List -->
            <div class="nav-list demo-list">
              <router-link to="/a_simple_chart">
                <a>
                  <div v-bind:class="getClassColumn()">
                    <div class="h5">{{sampleCode['ex1'].title}}</div>
                    <div class="p item-desc">{{sampleCode['ex1'].description}}</div>
                  </div>
                </a>
              </router-link>
              <router-link to="/a_3d_pie_chart">
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
              <router-link to="/listen_to_events_from_chart">
                <a>
                  <div v-bind:class="getClassListenEvents()">
                    <div class="h5">{{sampleCode['ex4'].title}}</div>
                    <div class="p item-desc">{{sampleCode['ex4'].description}}</div>
                  </div>
                </a>
              </router-link>
              <router-link to="/add_drill_down_to_chart">
                <a>
                  <div v-bind:class="getClassDrillDown()">
                    <div class="h5">{{sampleCode['ex5'].title}}</div>
                    <div class="p item-desc">{{sampleCode['ex5'].description}}</div>
                  </div>
                </a>
              </router-link>
              <router-link to="/a_simple_gauge">
                <a>
                  <div v-bind:class="getClassGauge()">
                    <div class="h5">{{sampleCode['ex6'].title}}</div>
                    <div class="p item-desc">{{sampleCode['ex6'].description}}</div>
                  </div>
                </a>
              </router-link>
              <router-link to="/applying_a_different_theme">
                <a>
                  <div v-bind:class="getClassTheme()">
                    <div class="h5">{{sampleCode['ex7'].title}}</div>
                    <div class="p item-desc">{{sampleCode['ex7'].description}}</div>
                  </div>
                </a>
              </router-link>
              <router-link to="/change_chart_type_at_runtime">
                <a>
                  <div v-bind:class="getClassChangeType()">
                    <div class="h5">{{sampleCode['ex8'].title}}</div>
                    <div class="p item-desc">{{sampleCode['ex8'].description}}</div>
                  </div>
                </a>
              </router-link>
            </div>
          </div>
          <div class="col-md-9 col-12">
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
      sampleCode: Samples,
      selectedTitle: Samples['ex1'].title,
      isModalOpen: false,
      modalClasses: 'show fade in'
    };
  },
  created() {
    let routePath = this.$route.path.replace('/', '');
    routePath = routePath.replace(/_/g, ' ');
    routePath = routePath.charAt(0).toUpperCase() + routePath.slice(1);
    this.selectedTitle = routePath;
  },
  methods: {
    getClassColumn() {
      return this.$route.path === '/a_simple_chart'
        ? 'nav-item selected'
        : 'nav-item';
    },
    getClassPie() {
      return this.$route.path === '/a_3d_pie_chart'
        ? 'nav-item selected'
        : 'nav-item';
    },
    getClassUpdate() {
      return this.$route.path === '/update_chart_data'
        ? 'nav-item selected'
        : 'nav-item';
    },
    getClassListenEvents() {
      return this.$route.path === '/listen_to_events_from_chart'
        ? 'nav-item selected'
        : 'nav-item';
    },
    getClassDrillDown() {
      return this.$route.path === '/add_drill_down_to_chart'
        ? 'nav-item selected'
        : 'nav-item';
    },
    getClassGauge() {
      return this.$route.path === '/a_simple_gauge'
        ? 'nav-item selected'
        : 'nav-item';
    },
    getClassTheme() {
      return this.$route.path === '/applying_a_different_theme'
        ? 'nav-item selected'
        : 'nav-item';
    },
    getClassChangeType() {
      return this.$route.path === '/change_chart_type_at_runtime'
        ? 'nav-item selected'
        : 'nav-item';
    },
    getModalClass() {
      return this.isModalOpen ? this.modalClasses : 'fade';
    },
    getModalStyle() {
      return this.isModalOpen
        ? { display: 'block', 'padding-left': '0px' }
        : { display: 'none' };
    },
    toggleModal(args) {
      this.isModalOpen = args;
    },
    openPage(page) {
      this.selectedTitle = this.sampleCode[`ex${page}`].title;
      this.$router.push(this.selectedTitle.replace(/\s+/g, '_').toLowerCase());
      this.isModalOpen = false;
    }
  }
};
</script>