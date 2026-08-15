# Example applications

Two runnable examples at the newest versions this release supports. Each was
created with the standard React Native and Expo project tools, so you can
follow the same steps to add FusionCharts to your own app.

| Example | Created with | React Native | React | Expo |
| --- | --- | --- | --- | --- |
| `bare-react-native-app-0.87` | React Native Community CLI | 0.87.0 | 19.2.3 | — |
| `expo-app-sdk-57` | `create-expo-app` | 0.86.2 | 19.2.3 | SDK 57 (`57.0.13`) |

These two applications are the whole of this directory. The minimal chart
screen that continuous integration builds against each supported React Native
version lives separately, in `.github/fixtures/App.tsx`, because it is test
infrastructure rather than something to copy from.

## The commands used to create them

Bare React Native:

```bash
npx @react-native-community/cli@latest init FusionChartsExample \
  --version 0.87.0 --directory bare-react-native-app-0.87
```

Expo:

```bash
npx create-expo-app@latest expo-app-sdk-57 --template blank-typescript@sdk-57
npx expo install expo-dev-client expo-build-properties
```

The Expo application was then named `FusionChartsExpoExample` in `app.json`,
which is what its generated Xcode workspace and scheme are called.

Both then installed this wrapper and its five native dependencies, and applied
the platform configuration described in the main
[installation guide](../README.md#overview): the Android
`WRITE_EXTERNAL_STORAGE` permission capped at API 28, the iOS photo-library
usage descriptions, and — for Expo — the `expo-build-properties`,
`react-native-share` and `expo-asset` plugin entries in `app.json`.

## Running them

Bare React Native:

```bash
cd bare-react-native-app-0.87 && npm install && npm run ios
```

Expo, which needs a development build because this wrapper uses native modules
that Expo Go cannot load:

```bash
cd expo-app-sdk-57 && npm install && npx expo prebuild --clean && npx expo run:ios
```

Use `run:android` for Android. On Android the emulator reaches a local
development server through `adb reverse tcp:8081 tcp:8081`.

## Using these as a starting point for your own app

Both examples depend on the wrapper by relative path so they always build
against this repository:

```json
"react-native-fusioncharts": "file:../.."
```

If you copy an example out of this repository, replace that with the published
package:

```json
"react-native-fusioncharts": "^7.0.0"
```

## Notes

- The Expo example does not commit its `android/` and `ios/` directories.
  `npx expo prebuild` generates them from `app.json`, which is the Expo
  workflow; the bare example commits its native projects because the
  Community CLI produces them once at creation time.
- Build output — Gradle and CocoaPods caches, `build/`, `.cxx/`, `Pods/`,
  `vendor/bundle/` — is ignored, not committed. Run the install commands above
  to regenerate it.
- For the full list of supported React Native minors and Expo SDK pairings, see
  the [compatibility guide](../docs/compatibility.md).
