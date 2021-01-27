const fs = require("fs");
const path = require("path");
const fileName = "../package.json";
const file = require(fileName);

delete file.dependencies["react"];
delete file.dependencies["react-native"];

file.peerDependencies = {
  "react": "16.13.1",
  "react-native": "^0.63.4",
  "react-native-webview": "^11.0.0"
};

fs.writeFile(path.join(__dirname, fileName), JSON.stringify(file, null, 2),
  function writeJSON(err) {
    if (err) return console.log(err);
  }
);
