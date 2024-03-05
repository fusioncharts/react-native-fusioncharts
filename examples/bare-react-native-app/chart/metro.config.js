const { getDefaultConfig } = require('expo/metro-config');
const { mergeConfig } = require('@react-native/metro-config');

module.exports = function (baseConfig) {
    const defaultConfig = mergeConfig(baseConfig, getDefaultConfig(__dirname));
    const { resolver: { assetExts, sourceExts } } = defaultConfig;

    return mergeConfig(
        defaultConfig,
        {
            resolver: {
                sourceExts,
                assetExts: [...assetExts, 'fcscript']
            },
        },
    );
};