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
        in this assets folder with the required FusionCharts module files which you've copied from
        <span
          class="highlighted"
        >node_modules</span>. Find the sample html file
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
    <!-- Code frag -->
    <div class="code-view mt-2">
      <div class="card-shadow">
        <div class="card-body p-0">
          <div class="code-panel">
            <div class="codeMirrorDiv" id="c1">
              <codemirror :value="codeAndroidApk" :options="shellOptions"></codemirror>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="div-margin">
      Click
      <a href="https://facebook.github.io/react-native/docs/signed-apk-android">here</a>&nbsp;to find more information about genarating signed APK for Android.
    </div>
    <div class="h6">
      <span>For iOS follow the below steps :</span>
    </div>
    <ul>
      <li>
        Create
        <span class="highlighted">assets</span>
        folder in your project root if it doesn't exist.
      </li>
      <li>
        Copy
        <span class="highlighted">FusionCharts</span>&nbsp;library in this assets folder
        (requires only when the licensed version of
        <span
          class="highlighted"
        >FusionCharts</span>&nbsp;is used).
      </li>
      <li>
        Create a file named
        <span class="highlighted">fusioncharts-tpl.html</span>&nbsp; in this assets folder with the required
        <span class="highlighted">FusionCharts</span>&nbsp;module files.
        Find the sample html file
        <a
          href="https://github.com/fusioncharts/react-native-fusioncharts/blob/master/templates/fuioncharts-tpl-ios.html"
        >here</a>
      </li>
      <li>
        Add a
        <span class="highlighted">build:assets</span>&nbsp;script in Application's
        <span class="highlighted">package.json</span>&nbsp;file as follows:
      </li>
    </ul>
    <!-- Code frag -->
    <div class="code-view mt-2">
      <div class="card-shadow">
        <div class="card-body p-0">
          <div class="code-panel">
            <div class="codeMirrorDiv" id="c1">
              <codemirror :value="codeIOS" :options="jsOptions"></codemirror>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="div-margin">
      The
      <span class="highlighted">--fc-library ./assets/fusioncharts</span>&nbsp;option is only required when you copied FusionCharts library in your assets folder.
    </div>
    <div class="div-margin">
      <span class="text-bold">Notes:</span>&nbsp;
      <span class="highlighted">
        fc-build-assets
        <span>
          &nbsp; is an utility binary provided to package the
          <span class="highlighted">FusionCharts</span>&nbsp; libraries from the template .html file as needed by the React Native iOS build process.
        </span>
      </span>
    </div>
    <ul>
      <li>Run the following command before running the app:</li>
    </ul>
    <div class="code-view mt-2">
      <div class="card-shadow">
        <div class="card-body p-0">
          <div class="code-panel">
            <div class="codeMirrorDiv" id="c1">
              <codemirror :value="shellCode" :options="shellOptions"></codemirror>
            </div>
          </div>
        </div>
      </div>
    </div>
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
const packageCodeIOS = `......
"scripts": {
  ......
  "build:assets": "fc-build-assets --fc-template ./assets/fusioncharts-tpl.html --fc-library ./assets/fusioncharts"
},
......`;
const shellCode = `$ npm run build:assets`;
const codeAndroidApk = `$ npm run prod:android`;
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
      jsOptions: { mode: 'javascript', ...cmOptions },
      codeIOS: packageCodeIOS,
      shellCode: shellCode,
      shellOptions: { mode: 'shell', ...cmOptions },
      codeAndroidApk: codeAndroidApk
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

.text-bold {
  font-size: 18px;
  font-weight: bold;
}

.div-margin {
  margin-bottom: 8px;
}
</style>
