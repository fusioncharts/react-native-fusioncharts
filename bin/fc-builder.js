const fs = require("fs");
const path = require("path");
const fileName = "../package.json";
const file = require(fileName);

delete file.dependencies["react"];
delete file.dependencies["react-native"];

file.peerDependencies = {
  "react": "^0.14.0 || ^15.0.0 || ^16.0.0 || ^17.0.0 || ^18.0.0 || ^19.0.0",
  "react-native": "^0.64.0 || ^0.65.0 || ^0.66.0 || ^0.67.0 || ^0.68.0 || ^0.69.0 || ^0.70.0",
  "react-native-webview": "^11.0.0"
};

fs.writeFile(path.join(__dirname, fileName), JSON.stringify(file, null, 2),
  function writeJSON(err) {
    if (err) return console.log(err);
  }
);
