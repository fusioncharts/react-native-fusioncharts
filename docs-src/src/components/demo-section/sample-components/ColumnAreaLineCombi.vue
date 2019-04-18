<template>
  <div>
    <div class="card shadow">
      <div class="card-body chart-wrapper">
        <div class="chart-wrapper-inner">
          <fusioncharts
            :width="width"
            :height="height"
            :type="type"
            :dataFormat="dataFormat"
            :dataSource="dataSource"
            :style="{ 'text-align': 'center' }"
          ></fusioncharts>
        </div>
      </div>
    </div>
    <div class="code-view mt-2">
      <div class="card-shadow" style="background: #03040B;">
        <div class="code-nav-btns btn-group" role="group" aria-label="Basic example">
          <button
            v-for="(panel,i) in panels"
            :class="`btn btn-code ${selectedPanel === i ? 'selected' : ''}`"
            :key="`btnpanel-${i}`"
            @click="()=>selectTab(i)"
          >{{ panel.type }}</button>
        </div>
        <div
          v-for="(panel,i) in panels"
          :class="`card-body p-0`"
          :key="`btnpanel-${i}`"
          :style="`display: ${selectedPanel === i ? 'block' : 'none'}`"
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
  chart: {
    caption: "Expense Analysis",
    subCaption: "ACME Inc.",
    xAxisname: "Region",
    yAxisName: "Amount (In USD)",
    numberPrefix: "$",
    theme: "fusion"
  },
  categories: [
    {
      category: [
        {
          label: "East"
        },
        {
          label: "West"
        },
        {
          label: "South"
        },
        {
          label: "North"
        }
      ]
    }
  ],
  dataset: [
    {
      seriesName: "Actual Expenses",
      data: [
        {
          value: "1441290"
        },
        {
          value: "855912"
        },
        {
          value: "911404"
        },
        {
          value: "648136"
        }
      ]
    },
    {
      seriesName: "Budgeted Expenses",
      renderAs: "line",
      data: [
        {
          value: "1297430"
        },
        {
          value: "776485"
        },
        {
          value: "685352"
        },
        {
          value: "726791"
        }
      ]
    },
    {
      seriesName: "Unknown liabilities",
      renderAs: "area",
      showAnchors: "0",
      data: [
        {
          value: "143860"
        },
        {
          value: "79427"
        },
        {
          value: "226052"
        },
        {
          value: "78655"
        }
      ]
    }
  ]
}`;

const myDataSource = {
  chart: {
    caption: "Expense Analysis",
    subCaption: "ACME Inc.",
    xAxisname: "Region",
    yAxisName: "Amount (In USD)",
    numberPrefix: "$",
    theme: "fusion"
  },
  categories: [
    {
      category: [
        {
          label: "East"
        },
        {
          label: "West"
        },
        {
          label: "South"
        },
        {
          label: "North"
        }
      ]
    }
  ],
  dataset: [
    {
      seriesName: "Actual Expenses",
      data: [
        {
          value: "1441290"
        },
        {
          value: "855912"
        },
        {
          value: "911404"
        },
        {
          value: "648136"
        }
      ]
    },
    {
      seriesName: "Budgeted Expenses",
      renderAs: "line",
      data: [
        {
          value: "1297430"
        },
        {
          value: "776485"
        },
        {
          value: "685352"
        },
        {
          value: "726791"
        }
      ]
    },
    {
      seriesName: "Unknown liabilities",
      renderAs: "area",
      showAnchors: "0",
      data: [
        {
          value: "143860"
        },
        {
          value: "79427"
        },
        {
          value: "226052"
        },
        {
          value: "78655"
        }
      ]
    }
  ]
};

export default {
  name: "ColumnAreaLineCombiChart",
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
      type: "mscombi2d",
      width: "100%",
      height: "400",
      dataFormat: "json",
      dataSource: myDataSource,
      selectedPanel: 0,
      panels: [
        {
          type: "Javascript",
          code: sampleCode["ex20"].code,
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
    onChartTypeChange: function(e) {
      const chart = this.$refs.fc.chartObj,
        type = e.target.value.toLowerCase();
      chart.chartType(type);
    },
    selectTab: function(num) {
      this.selectedPanel = num;
    }
  }
};
</script>

<style>
</style>
