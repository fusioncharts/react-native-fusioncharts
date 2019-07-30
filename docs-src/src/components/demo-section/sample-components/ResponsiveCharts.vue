<template>
  <div>
    <div class="card shadow">
      <div class="card-body chart-wrapper">
        <div class="min-size">
          <div id="container" ref="container" class="chart-wrapper-inner dynamic-container">
            <fusioncharts
              :type="type"
              :width="width"
              :height="height"
              :dataFormat="dataFormat"
              :dataSource="dataSource"
              ref="fc"
              :style="{ 'width': '100%', 'height': '100%' }"
            ></fusioncharts>
          </div>
        </div>
        <br>
        <span id="select-text">Select size:</span>
        <div class="change-type">
          <div>
            <input name="chartSize" type="radio" @change="onChartSizeChange" value="400x250">
            <label>400 &#10005; 250</label>
          </div>
          <div>
            <input
              name="chartSize"
              type="radio"
              @change="onChartSizeChange"
              value="600x350"
              checked
            >
            <label>600 &#10005; 350</label>
          </div>
          <div>
            <input name="chartSize" type="radio" @change="onChartSizeChange" value="700x400">
            <label>700 &#10005; 400</label>
          </div>
        </div>
      </div>
    </div>
    <div class="code-view mt-2">
      <div class="card-shadow" style="background: #03040B;">
        <div class="code-nav-btns btn-group" role="group" aria-label="Basic example">
          <button
            v-for="(panel,i) in panels"
            :class="`btn btn-code ${selectedPanel===i?'selected':''}`"
            :key="`btnpanel-${i}`"
            @click="()=>selectTab(i)"
          >{{ panel.type }}</button>
        </div>
        <div
          v-for="(panel,i) in panels"
          :class="`card-body p-0`"
          :key="`btnpanel-${i}`"
          :style="`display: ${selectedPanel===i?'block':'none'}`"
        >
          <div v-if="selectedPanel===i" class="code-panel">
            <codemirror :code="panel.code" :options="codeOptions"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import sampleCode from "../../../assets/samples.js";

const jsonData = `{
    "chart": {
        "caption": "Countries With Most Oil Reserves [2017-18]",
        "subCaption": "In MMbbl = One Million barrels",
        "xAxisName": "Country",
        "yAxisName": "Reserves (MMbbl)",
        "numberSuffix": "K",
        "theme": "fusion"
    },
    "data": [{
        "label": "Venezuela",
        "value": "290"
    }, {
        "label": "Saudi",
        "value": "260"
    }, {
        "label": "Canada",
        "value": "180"
    }, {
        "label": "Iran",
        "value": "140"
    }, {
        "label": "Russia",
        "value": "115"
    }, {
        "label": "UAE",
        "value": "100"
    }, {
        "label": "US",
        "value": "30"
    }, {
        "label": "China",
        "value": "30"
    }]
}`;

const myDataSource = {
  chart: {
    caption: "Countries With Most Oil Reserves [2017-18]",
    subCaption: "In MMbbl = One Million barrels",
    xAxisName: "Country",
    yAxisName: "Reserves (MMbbl)",
    numberSuffix: "K",
    theme: "fusion"
  },
  data: [
    {
      label: "Venezuela",
      value: "290"
    },
    {
      label: "Saudi",
      value: "260"
    },
    {
      label: "Canada",
      value: "180"
    },
    {
      label: "Iran",
      value: "140"
    },
    {
      label: "Russia",
      value: "115"
    },
    {
      label: "UAE",
      value: "100"
    },
    {
      label: "US",
      value: "30"
    },
    {
      label: "China",
      value: "30"
    }
  ]
};
export default {
  name: "ResponsiveCharts",
  data() {
    return {
      codeOptions: {
        lineNumbers: true,
        theme: "dracula",
        tabSize: "4",
        smartIndent: true,
        readOnly: true,
        mode: "javascript"
      },
      type: "column2d",
      width: "100%",
      height: "400",
      dataFormat: "json",
      dataSource: myDataSource,
      selectedPanel: 0,
      panels: [
        {
          type: "Javascript",
          code: sampleCode["ex27"].code,
          mode: "javascript"
        },
        {
          type: "Data",
          code: jsonData,
          mode: "javascript"
        }
      ]
    };
  },
  methods: {
    // changes the height and width of the parent container of FusionCharts
    onChartSizeChange: function(e) {
      const container = this.$refs.container,
        size = e.target.value.split("x");
      container.style.width = size[0] + "px";
      container.style.height = size[1] + "px";
    },
    selectTab: function(num) {
      this.selectedPanel = num;
    }
  }
};
</script>

