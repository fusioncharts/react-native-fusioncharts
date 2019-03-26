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
              <div
                class="nav-item"
                v-bind:class="sampleCode['ex9'].title === selectedTitle ? 'selected' : ''"
              >
                <div class="p" @click="openPage(9)">{{sampleCode['ex9'].title}}</div>
              </div>
              <div
                class="nav-item"
                v-bind:class="sampleCode['ex10'].title === selectedTitle ? 'selected' : ''"
              >
                <div class="p" @click="openPage(10)">{{sampleCode['ex10'].title}}</div>
              </div>
              <div
                class="nav-item"
                v-bind:class="sampleCode['ex11'].title === selectedTitle ? 'selected' : ''"
              >
                <div class="p" @click="openPage(11)">{{sampleCode['ex11'].title}}</div>
              </div>
              <div
                class="nav-item"
                v-bind:class="sampleCode['ex12'].title === selectedTitle ? 'selected' : ''"
              >
                <div class="p" @click="openPage(12)">{{sampleCode['ex12'].title}}</div>
              </div>
              <div
                class="nav-item"
                v-bind:class="sampleCode['ex13'].title === selectedTitle ? 'selected' : ''"
              >
                <div class="p" @click="openPage(13)">{{sampleCode['ex13'].title}}</div>
              </div>
              <div
                class="nav-item"
                v-bind:class="sampleCode['ex14'].title === selectedTitle ? 'selected' : ''"
              >
                <div class="p" @click="openPage(14)">{{sampleCode['ex14'].title}}</div>
              </div>
              <div
                class="nav-item"
                v-bind:class="sampleCode['ex15'].title === selectedTitle ? 'selected' : ''"
              >
                <div class="p" @click="openPage(15)">{{sampleCode['ex15'].title}}</div>
              </div>
              <div
                class="nav-item"
                v-bind:class="sampleCode['ex17'].title === selectedTitle ? 'selected' : ''"
              >
                <div class="p" @click="openPage(17)">{{sampleCode['ex17'].title}}</div>
              </div>
              <div
                class="nav-item"
                v-bind:class="sampleCode['ex18'].title === selectedTitle ? 'selected' : ''"
              >
                <div class="p" @click="openPage(18)">{{sampleCode['ex18'].title}}</div>
              </div>
              <div
                class="nav-item"
                v-bind:class="sampleCode['ex19'].title === selectedTitle ? 'selected' : ''"
              >
                <div class="p" @click="openPage(19)">{{sampleCode['ex19'].title}}</div>
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
                  <div v-bind:class="getNavClass('/a_simple_chart')">
                    <div class="h5">{{sampleCode['ex1'].title}}</div>
                    <div class="p item-desc">{{sampleCode['ex1'].description}}</div>
                  </div>
                </a>
              </router-link>
              <router-link to="/a_simple_timeseries_chart">
                <a>
                  <div v-bind:class="getNavClass('/a_simple_timeseries_chart')">
                    <div class="nav-group">
                      <div class="h5">{{sampleCode['ex9'].title}}</div>
                      <div class="h5 badge badge-normal">FusionTime</div>
                    </div>
                    <div class="p item-desc">{{sampleCode['ex9'].description}}</div>
                  </div>
                </a>
              </router-link>
              <router-link to="/column_chart_with_time_axis">
                <a>
                  <div v-bind:class="getNavClass('/column_chart_with_time_axis')">
                    <div class="nav-group">
                      <div class="h5">{{sampleCode['ex14'].title}}</div>
                      <div class="h5 badge badge-normal">FusionTime</div>
                    </div>
                    <div class="p item-desc">{{sampleCode['ex14'].description}}</div>
                  </div>
                </a>
              </router-link>
              <router-link to="/area_chart_with_time_axis">
                <a>
                  <div v-bind:class="getNavClass('/area_chart_with_time_axis')">
                    <div class="nav-group">
                      <div class="h5">{{sampleCode['ex12'].title}}</div>
                      <div class="h5 badge badge-normal">FusionTime</div>
                    </div>
                    <div class="p item-desc">{{sampleCode['ex12'].description}}</div>
                  </div>
                </a>
              </router-link>
              <router-link to="/a_3d_pie_chart">
                <a>
                  <div v-bind:class="getNavClass('/a_3d_pie_chart')">
                    <div class="h5">{{sampleCode['ex2'].title}}</div>
                    <div class="p item-desc">{{sampleCode['ex2'].description}}</div>
                  </div>
                </a>
              </router-link>
              <router-link to="/a_simple_gauge">
                <a>
                  <div v-bind:class="getNavClass('/a_simple_gauge')">
                    <div class="h5">{{sampleCode['ex6'].title}}</div>
                    <div class="p item-desc">{{sampleCode['ex6'].description}}</div>
                  </div>
                </a>
              </router-link>
              <router-link to="/column_area_line_combi">
                <a>
                  <div v-bind:class="getNavClass('/column_area_line_combi')">
                    <div class="h5">{{sampleCode['ex20'].title}}</div>
                    <div class="p item-desc">{{sampleCode['ex20'].description}}</div>
                  </div>
                </a>
              </router-link>
              <router-link to="/column_and_line_combination_on_time_axis">
                <a>
                  <div v-bind:class="getNavClass('/column_and_line_combination_on_time_axis')">
                    <div class="nav-group">
                      <div class="h5">{{sampleCode['ex13'].title}}</div>
                      <div class="h5 badge badge-normal">FusionTime</div>
                    </div>
                    <div class="p item-desc">{{sampleCode['ex13'].description}}</div>
                  </div>
                </a>
              </router-link>
              <router-link to="/plotting_multiple_series_on_time_axis">
                <a>
                  <div v-bind:class="getNavClass('/plotting_multiple_series_on_time_axis')">
                    <div class="nav-group">
                      <div class="h5">{{sampleCode['ex17'].title}}</div>
                      <div class="h5 badge badge-normal">FusionTime</div>
                    </div>
                    <div class="p item-desc">{{sampleCode['ex17'].description}}</div>
                  </div>
                </a>
              </router-link>
              <router-link to="/plotting_two_variables">
                <a>
                  <div v-bind:class="getNavClass('/plotting_two_variables')">
                    <div class="nav-group">
                      <div class="h5">{{sampleCode['ex18'].title}}</div>
                      <div class="h5 badge badge-normal">FusionTime</div>
                    </div>
                    <div class="p item-desc">{{sampleCode['ex18'].description}}</div>
                  </div>
                </a>
              </router-link>
              <router-link to="/update_chart_data">
                <a>
                  <div v-bind:class="getNavClass('/update_chart_data')">
                    <div class="h5">{{sampleCode['ex3'].title}}</div>
                    <div class="p item-desc">{{sampleCode['ex3'].description}}</div>
                  </div>
                </a>
              </router-link>
              <router-link to="/listen_to_events_from_chart">
                <a>
                  <div v-bind:class="getNavClass('/listen_to_events_from_chart')">
                    <div class="h5">{{sampleCode['ex4'].title}}</div>
                    <div class="p item-desc">{{sampleCode['ex4'].description}}</div>
                  </div>
                </a>
              </router-link>
              <router-link to="/percentage_calculation">
                <a>
                  <div v-bind:class="getNavClass('/percentage_calculation')">
                    <div class="h5">{{sampleCode['ex21'].title}}</div>
                    <div class="p item-desc">{{sampleCode['ex21'].description}}</div>
                  </div>
                </a>
              </router-link>
              <router-link to="/add_drill_down_to_chart">
                <a>
                  <div v-bind:class="getNavClass('/add_drill_down_to_chart')">
                    <div class="h5">{{sampleCode['ex5'].title}}</div>
                    <div class="p item-desc">{{sampleCode['ex5'].description}}</div>
                  </div>
                </a>
              </router-link>
              <router-link to="/adding_a_reference_line">
                <a>
                  <div v-bind:class="getNavClass('/adding_a_reference_line')">
                    <div class="nav-group">
                      <div class="h5">{{sampleCode['ex10'].title}}</div>
                      <div class="h5 badge badge-normal">FusionTime</div>
                    </div>
                    <div class="p item-desc">{{sampleCode['ex10'].description}}</div>
                  </div>
                </a>
              </router-link>
              <router-link to="/annotating_single_data_point">
                <a>
                  <div v-bind:class="getNavClass('/annotating_single_data_point')">
                    <div class="nav-group">
                      <div class="h5">{{sampleCode['ex11'].title}}</div>
                      <div class="h5 badge badge-normal">FusionTime</div>
                    </div>
                    <div class="p item-desc">{{sampleCode['ex11'].description}}</div>
                  </div>
                </a>
              </router-link>
              <router-link to="/single_event_overlay">
                <a>
                  <div v-bind:class="getNavClass('/single_event_overlay')">
                    <div class="nav-group">
                      <div class="h5">{{sampleCode['ex19'].title}}</div>
                      <div class="h5 badge badge-normal">FusionTime</div>
                    </div>
                    <div class="p item-desc">{{sampleCode['ex8'].description}}</div>
                  </div>
                </a>
              </router-link>
              <router-link to="/date_range_event_overlay">
                <a>
                  <div v-bind:class="getNavClass('/date_range_event_overlay')">
                    <div class="nav-group">
                      <div class="h5">{{sampleCode['ex15'].title}}</div>
                      <div class="h5 badge badge-normal">FusionTime</div>
                    </div>
                    <div class="p item-desc">{{sampleCode['ex15'].description}}</div>
                  </div>
                </a>
              </router-link>
              <router-link to="/render_a_map">
                <a>
                  <div v-bind:class="getNavClass('/render_a_map')">
                    <div class="nav-group">
                      <div class="h5">{{sampleCode['ex22'].title}}</div>
                    </div>
                    <div class="p item-desc">{{sampleCode['ex22'].description}}</div>
                  </div>
                </a>
              </router-link>
              <router-link to="/special_events">
                <a>
                  <div v-bind:class="getNavClass('/special_events')">
                    <div class="nav-group">
                      <div class="h5">{{sampleCode['ex24'].title}}</div>
                    </div>
                    <div class="p item-desc">{{sampleCode['ex24'].description}}</div>
                  </div>
                </a>
              </router-link>
              <router-link to="/life_cycle_events">
                <a>
                  <div v-bind:class="getNavClass('/life_cycle_events')">
                    <div class="nav-group">
                      <div class="h5">{{sampleCode['ex25'].title}}</div>
                    </div>
                    <div class="p item-desc">{{sampleCode['ex25'].description}}</div>
                  </div>
                </a>
              </router-link>
              <router-link to="/special_chart_api">
                <a>
                  <div v-bind:class="getNavClass('/special_chart_api')">
                    <div class="nav-group">
                      <div class="h5">{{sampleCode['ex26'].title}}</div>
                    </div>
                    <div class="p item-desc">{{sampleCode['ex26'].description}}</div>
                  </div>
                </a>
              </router-link>
              <router-link to="/responsive_charts">
                <a>
                  <div v-bind:class="getNavClass('/responsive_charts')">
                    <div class="nav-group">
                      <div class="h5">{{sampleCode['ex27'].title}}</div>
                    </div>
                    <div class="p item-desc">{{sampleCode['ex27'].description}}</div>
                  </div>
                </a>
              </router-link>
              <router-link to="/change_chart_type_at_runtime">
                <a>
                  <div v-bind:class="getNavClass('/change_chart_type_at_runtime')">
                    <div class="h5">{{sampleCode['ex8'].title}}</div>
                    <div class="p item-desc">{{sampleCode['ex8'].description}}</div>
                  </div>
                </a>
              </router-link>
              <router-link to="/annotation">
                <a>
                  <div v-bind:class="getNavClass('/annotation')">
                    <div class="h5">{{sampleCode['ex28'].title}}</div>
                    <div class="p item-desc">{{sampleCode['ex28'].description}}</div>
                  </div>
                </a>
              </router-link>
              <router-link to="/update_chart_attribute_api">
                <a>
                  <div v-bind:class="getNavClass('/update_chart_attribute_api')">
                    <div class="h5">{{sampleCode['ex29'].title}}</div>
                    <div class="p item-desc">{{sampleCode['ex29'].description}}</div>
                  </div>
                </a>
              </router-link>
              <router-link to="/applying_a_different_theme">
                <a>
                  <div v-bind:class="getNavClass('/applying_a_different_theme')">
                    <div class="h5">{{sampleCode['ex7'].title}}</div>
                    <div class="p item-desc">{{sampleCode['ex7'].description}}</div>
                  </div>
                </a>
              </router-link>
              <router-link to="/interactive_candlestick_chart">
                <a>
                  <div v-bind:class="getNavClass('/interactive_candlestick_chart')">
                    <div class="nav-group">
                      <div class="h5">{{sampleCode['ex16'].title}}</div>
                      <div class="h5 badge badge-normal">FusionTime</div>
                    </div>
                    <div class="p item-desc">{{sampleCode['ex16'].description}}</div>
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
import Samples from "../../assets/samples.js";
export default {
  name: "DemoSectionComponent",
  data() {
    return {
      sampleCode: Samples,
      selectedTitle: Samples["ex1"].title,
      isModalOpen: false,
      modalClasses: "show fade in"
    };
  },
  created() {
    let routePath = this.$route.path.replace("/", "");
    routePath = routePath.replace(/_/g, " ");
    routePath = routePath.charAt(0).toUpperCase() + routePath.slice(1);
    this.selectedTitle = routePath;
  },
  methods: {
    getNavClass(route) {
      return this.$route.path === route ? "nav-item selected" : "nav-item";
    },
    getModalClass() {
      return this.isModalOpen ? this.modalClasses : "fade";
    },
    getModalStyle() {
      return this.isModalOpen
        ? { display: "block", "padding-left": "0px" }
        : { display: "none" };
    },
    toggleModal(args) {
      this.isModalOpen = args;
    },
    openPage(page) {
      this.selectedTitle = this.sampleCode[`ex${page}`].title;
      this.$router.push(this.selectedTitle.replace(/\s+/g, "_").toLowerCase());
      this.isModalOpen = false;
    }
  }
};
</script>