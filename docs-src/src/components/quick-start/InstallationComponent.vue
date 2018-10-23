<template>
  <div class="row">
    <div class="col-12 pt-3">
      <div class="h5">
        <span>Step 1: Install the React Native FusionCharts</span>
      </div>
      <p class="code-desc">In your react native project install FusionCharts react native plugin:</p>
      <div class="code-view mt-2">
        <div class="card-shadow">
          <div class="card-body p-0">
            <div class="code-panel">
              <div class="codeMirrorDiv" id="c1">
                <codemirror :value="code" :options="cmOptions"></codemirror>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import 'codemirror/mode/shell/shell.js';
export default {
  name: 'InstallationComponent',
  data() {
    return {
      code: '$ npm install react-native-fusioncharts --save',
      cmOptions: {
        lineNumbers: true,
        theme: 'dracula',
        tabSize: '4',
        smartIndent: true,
        readOnly: true,
        mode: 'shell'
      }
    };
  }
};
</script>
