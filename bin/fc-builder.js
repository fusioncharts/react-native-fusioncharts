const fs = require("fs");
const path = require("path");
const fileName = "../package.json";
const file = require(fileName);

delete file.dependencies["react"];
delete file.dependencies["react-native"];

file.peerDependencies = {
  "react": "^18.0.0 || ^19.0.0",
  "react-native": "^0.73.0",
  "react-native-webview": "^13.7.0"
};

fs.writeFile(path.join(__dirname, fileName), JSON.stringify(file, null, 2),
  function writeJSON(err) {
    if (err) return console.log(err);
  }
);
