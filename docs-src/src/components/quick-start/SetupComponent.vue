<template>
  <div>
    <div class="h5">
      <span>Step 2: Setup for different platforms</span>
    </div>
    <div class="h6">
      <span>For Android follow the below steps :</span>
    </div>
    <ul>
      <li>
        Create
        <span class="highlighted">assets</span>
        folder in
        <span class="highlighted">android/app/src/main</span>
        directory if it doesn't exist.
      </li>
      <li>
        Copy
        <span class="highlighted">FusionCharts</span>
        library in the assets folder (in most cases copy
        <span
          class="highlighted"
        >node_modules/fusioncharts</span>
        folder).
      </li>
      <li>
        Create a file named
        <span class="highlighted">fusioncharts.html</span>
        in this assets folder with the required FusionCharts module files. Find the sample html file
        <a
          href="https://github.com/fusioncharts/react-native-fusioncharts/blob/master/templates/fuioncharts-tpl-android.html"
        >here</a>
      </li>
      <li>Set libraryPath property to the FusionCharts component as follows:</li>
    </ul>
    <!-- Code frag -->
    <div class="code-view mt-2">
      <div class="card-shadow">
        <div class="card-body p-0">
          <div class="code-panel">
            <div class="codeMirrorDiv" id="c1">
              <codemirror :value="code" :options="jsxOptions"></codemirror>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- List -->
    <ul>
      <li>
        Add the following script in Application's
        <span class="highlighted">package.json</span>
        file as follows to bundle your assets when you want to genarate a signed APK :
      </li>
    </ul>
    <!-- Code frag -->
    <div class="code-view mt-2">
      <div class="card-shadow">
        <div class="card-body p-0">
          <div class="code-panel">
            <div class="codeMirrorDiv" id="c1">
              <codemirror :value="packageCode" :options="jsOptions"></codemirror>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- List -->
    <ul>
      <li>Now run the following command before genarating the signed APK:</li>
    </ul>
  </div>
</template>
<script>
import 'codemirror/mode/jsx/jsx';
import 'codemirror/mode/javascript/javascript';
const fLibraryCode = `<FusionCharts 
  ......
  libraryPath={{ uri: 'file:///android_asset/fusioncharts.html' }}/>`;
const packageCode = `......
"scripts": {
  ......
  "clean:build:android": "rm -rf android/app/build",
  "prod:android": "npm run clean:build:android  && react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res"
},
......
      `;

const cmOptions = {
  lineNumbers: true,
  theme: 'dracula',
  tabSize: '4',
  smartIndent: true,
  readOnly: true
};
export default {
  name: 'SetupComponent',
  data() {
    return {
      code: fLibraryCode,
      jsxOptions: { mode: 'jsx', ...cmOptions },
      packageCode: packageCode,
      jsOptions: { mode: 'javascript', ...cmOptions }
    };
  }
};
</script>

<style scoped>
.highlighted {
  background-color: #ece8e8;
  padding: 1px;
  padding-left: 4px;
  padding-right: 4px;
  border-radius: 3px;
}
</style>
