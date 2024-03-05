const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

config.resolver.assetExts.push(
  // Adds support for `.fcscript` files for Fusionchart
  'fcscript'
);
module.exports = config;
