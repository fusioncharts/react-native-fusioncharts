<template>
  <div>
    <div class="card shadow">
      <div class="card-body chart-wrapper">
        <div class="chart-wrapper-inner">
          <fusioncharts
            :options="options"
            :dataSource="dataSource"
            ref="fc"
            :style="{ 'text-align': 'center' }"
          ></fusioncharts>
          <br>
          <div style="display: flex;">
            <div id="select-text">Choose a theme:</div>
            <div class="change-type">
              <div>
                <input name="theme" type="radio" @change="onChangeTheme" value="Fusion" checked>
                <label>Fusion</label>
              </div>
              <div>
                <input name="theme" type="radio" @change="onChangeTheme" value="Gammel">
                <label>Gammel</label>
              </div>
              <div>
                <input name="theme" type="radio" @change="onChangeTheme" value="Candy">
                <label>Candy</label>
              </div>
              <div>
                <input name="theme" type="radio" @change="onChangeTheme" value="Zune">
                <label>Zune</label>
              </div>
              <div>
                <input name="theme" type="radio" @change="onChangeTheme" value="Ocean">
                <label>Ocean</label>
              </div>
              <div>
                <input name="theme" type="radio" @change="onChangeTheme" value="Carbon">
                <label>Carbon</label>
              </div>
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
import sampleCode from '../../../assets/samples.js';
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

export default {
  data() {
    return {
      codeOptions: {
        lineNumbers: true,
        theme: 'dracula',
        tabSize: '4',
        smartIndent: true,
        readOnly: true,
        mode: 'javascript'
      },
      sourceData: `{
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
}`,
      options: {
        width: '100%',
        height: '400',
        type: 'column2d',
        dataFormat: 'json',
        creditLabel: 'false'
      },
      selectedPanel: 0,
      panels: [
        {
          type: 'Javascript',
          code: sampleCode['ex7'].code,
          mode: 'javascript'
        },
        {
          type: 'Data',
          code: jsonData,
          mode: 'javascript'
        }
      ]
    };
  },
  computed: {
    dataSource: function() {
      return JSON.parse(this.sourceData);
    }
  },
  methods: {
    onChangeTheme: function(e) {
      const chart = this.$refs.fc.chartObj,
        theme = e.target.value.toLowerCase();
      chart.setChartAttribute('theme', theme);
    },
    selectTab: function(num) {
      this.selectedPanel = num;
    }
  }
};
</script>

<style>
</style>
