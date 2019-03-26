<template>
  <div>
    <div class="card shadow">
      <div class="card-body chart-wrapper">
        <div class="chart-wrapper-inner">
          <fusioncharts
            :type="type"
            :width="width"
            :height="height"
            :dataFormat="dataFormat"
            :dataSource="dataSource"
            ref="fc"
            @dataPlotClick="onSliceClick"
          ></fusioncharts>
          <div class="change-type">
            <div>
              <input
                name="items"
                type="radio"
                v-model="radioValue"
                @change="onChangeItem"
                value="none"
                checked
              >
              <label>None</label>
            </div>
            <div>
              <input
                name="items"
                type="radio"
                v-model="radioValue"
                @change="onChangeItem"
                value="0"
              >
              <label>Apache</label>
            </div>
            <div>
              <input
                name="items"
                type="radio"
                v-model="radioValue"
                @change="onChangeItem"
                value="1"
              >
              <label>Microsoft</label>
            </div>
            <div>
              <input
                name="items"
                type="radio"
                v-model="radioValue"
                @change="onChangeItem"
                value="2"
              >
              <label>Zeus</label>
            </div>
            <div>
              <input
                name="items"
                type="radio"
                v-model="radioValue"
                @change="onChangeItem"
                value="3"
              >
              <label>Other</label>
            </div>
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
    "caption": "Market Share of Web Servers",
    "plottooltext": "<b>$percentValue</b> of web servers run on $label servers",
    "showLegend": "1",
    "showPercentValues": "1",
    "legendPosition": "bottom",
    "useDataPlotColorForLabels": "1",
    "enableMultiSlicing": "0",
    "theme": "fusion",
    "showlegend":"0"
    },
    "data": [
        {
            "label": "Apache",
            "value": "32647479"
        },
        {
            "label": "Microsoft",
            "value": "22100932"
        }, {
            "label": "Zeus",
            "value": "14376"
        }, {
            "label": "Other",
            "value": "18674221"
        }
    ]
}`;

const myDataSource = {
  chart: {
    caption: "Market Share of Web Servers",
    plottooltext: "<b>$percentValue</b> of web servers run on $label servers",
    showLegend: "1",
    showPercentValues: "1",
    legendPosition: "bottom",
    useDataPlotColorForLabels: "1",
    enableMultiSlicing: "0",
    theme: "fusion",
    showlegend: "0"
  },
  data: [
    {
      label: "Apache",
      value: "32647479"
    },
    {
      label: "Microsoft",
      value: "22100932"
    },
    {
      label: "Zeus",
      value: "14376"
    },
    {
      label: "Other",
      value: "18674221"
    }
  ]
};
export default {
  name: "SpecialChartApi",
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
      type: "pie2d",
      width: "100%",
      height: "400",
      dataFormat: "json",
      dataSource: myDataSource,
      selectedPanel: 0,
      radioValue: "none",
      lastActive: "none",
      panels: [
        {
          type: "Javascript",
          code: sampleCode["ex25"].code,
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
    onChangeItem: function() {
      const chart = this.$refs.fc.chartObj,
        lastActive = this.lastActive,
        value = this.radioValue;
      this.lastActive = value;
      if (value === "none") {
        chart.slicePlotItem(lastActive, false);
      } else {
        chart.slicePlotItem(value, true);
      }
    },
    onSliceClick: function(e) {
      var isSliced = e.data.isSliced;
      if (isSliced) {
        this.lastActive = this.radioValue = "none";
      } else {
        this.lastActive = this.radioValue = e.data.index;
      }
    },
    selectTab: function(num) {
      this.selectedPanel = num;
    }
  }
};
</script>

