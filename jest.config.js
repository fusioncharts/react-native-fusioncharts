module.exports = {
  verbose: true,
  preset: '@react-native/jest-preset',
  roots: ['<rootDir>/__tests__'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native' +
      '|@react-native' +
      '|@react-native-community' +
      '|@react-navigation' +
      '|react-navigation-tabs' +
      '|react-native-splash-screen' +
      '|react-native-screens' +
      '|react-native-reanimated' +
      '|react-native-webview' +
      '|react-native-share' +
      '|@notifee/react-native' +
      '|@react-native-camera-roll/camera-roll' +
      '|@dr.pogodin/react-native-fs' +
      ')/)',
  ],
};
