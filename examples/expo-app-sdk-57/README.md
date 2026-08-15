# Expo development-build example

This source-only example targets Expo SDK 57 and React Native 0.86.2. The
wrapper depends on native modules, so it requires an Expo development build;
it cannot run in Expo Go.

```sh
npm ci
npm run prebuild
npm run android
# or: npm run ios
```

`expo prebuild --clean` generates the `android` and `ios` directories. Those
directories are intentionally ignored because `app.json` is their source of
truth. The wrapper's native dependencies are autolinked during prebuild.

The `react-native-share` config plugin is declared explicitly. Notifee 9.1.8
does not publish a valid Expo config-plugin entry point, so it must not be
listed in `plugins`; Expo/React Native autolinking still includes its native
Android and iOS projects. `expo-build-properties` supplies Notifee's bundled
Android Maven repository during prebuild.
