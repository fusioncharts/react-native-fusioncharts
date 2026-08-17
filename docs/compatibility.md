# Compatibility and release validation

React Native FusionCharts `7.0.0-rc.0` declares these peers:

- React Native `>=0.75.0 <0.88.0`
- React `^18.0.0 || ^19.0.0`

The upper endpoint reflects React Native 0.87.0, the latest stable release when
this candidate was prepared on 13 August 2026. Supporting a later React Native
minor requires a new wrapper release and a successful compatibility run.

## React Native matrix

Every supported minor is tested as a fresh consumer of the packed npm archive,
not as a source link to this repository.

| React Native | React | Node.js lane | Filesystem peer | Validation |
| --- | --- | --- | --- | --- |
| 0.75.5 | 18.2 | 20.19.4 | 2.28.1 | TypeScript, autolinking, production Metro, Android, iOS |
| 0.76.9 | 18.2 | 20.19.4 | 2.30.3 | TypeScript, autolinking, production Metro |
| 0.77.3 | 18.2 | 20.19.4 | 2.31.0 | TypeScript, autolinking, production Metro |
| 0.78.3 | 19.0 | 20.19.4 | 2.32.1 | TypeScript, autolinking, production Metro |
| 0.79.7 | 19.0 | 20.19.4 | 2.33.1 | TypeScript, autolinking, production Metro, Android, iOS |
| 0.80.3 | 19.1 | 20.19.4 | 2.34.1 | TypeScript, autolinking, production Metro |
| 0.81.6 | 19.1.4 | 22.13.0 | 2.35.1 | TypeScript, autolinking, production Metro |
| 0.82.1 | 19.1.1 | 22.13.0 | 2.36.1 | TypeScript, autolinking, production Metro, Android, iOS |
| 0.83.10 | 19.2 | 22.13.0 | 2.36.2 | TypeScript, autolinking, production Metro |
| 0.84.1 | 19.2.3 | 22.13.0 | 2.37.0 | TypeScript, autolinking, production Metro |
| 0.85.3 | 19.2.3 | 22.13.0 | 2.38.2 | TypeScript, autolinking, production Metro |
| 0.86.2 | 19.2.3 | 22.13.0 | 2.39.2 | TypeScript, autolinking, production Metro, Android, iOS, Expo |
| 0.87.0 | 19.2.3 | 24.3.0 | 2.40.0 | TypeScript, autolinking, production Metro, Android, iOS |

The native lanes compile official React Native Community CLI projects and
verify Android and iOS autolinking for all five native dependencies. This
exercises both the legacy default in the oldest release and New Architecture
defaults across the newer release train.

Android API 24 is the minimum supported SDK. The filesystem fork is a required
native peer with the exact tested version listed above; its codegen and Android
native APIs changed across this React Native release train.

For RN 0.75 only, install with npm's `--legacy-peer-deps` option. Filesystem
2.28.1 declares the unused `react-native-windows` package as a required peer;
the option prevents npm from adding that Windows-only toolchain to iOS/Android
consumer graphs.

## Consumer application matrix

In addition to the automated lanes above, every supported React Native minor
has a dedicated consumer application that installs the packed archive exactly
as a customer would. Each application is checked for TypeScript correctness,
autolinking of all five native dependencies on both platforms, a production
bundle, a native debug build, and a rendered chart confirmed by the
`rendercomplete` event on a running Android emulator and iOS simulator.

All thirteen React Native minors from 0.75 through 0.87 pass this matrix on
both platforms.

## Expo

The wrapper works in Expo projects that use a development build. Expo Go is
not supported, because the wrapper depends on native modules that are not part
of the Expo Go client. Run `npx expo prebuild` and build a development client,
or use EAS Build.

Expo publishes a fixed React Native version per SDK, so the supported pairings
are:

| Expo SDK | React Native | Consumer application |
| --- | --- | --- |
| 51 | 0.75 | validated on Android and iOS |
| 52 | 0.76 | validated on Android and iOS |
| 52 (React Native 0.77 opt-in) | 0.77 | validated on Android and iOS |
| 53 | 0.79 | validated on Android and iOS |
| 54 | 0.81 | validated on Android and iOS |
| 55 | 0.83 | validated on Android and iOS |
| 56 | 0.85 | validated on Android and iOS |
| 57 | 0.86 | validated on Android and iOS |

React Native 0.78, 0.80, 0.82, 0.84 and 0.87 have no stable Expo SDK pairing.
They are supported for bare React Native consumers and are validated as such.

Expo SDK 56 and newer require Xcode 26.4 or newer, which is an Expo
requirement rather than a wrapper one.

Each Expo consumer declares `expo-build-properties` with
`minSdkVersion` 24 and Notifee's local Maven repository, the
`react-native-share` and `expo-asset` plugins, and the photo-library usage
descriptions required by Camera Roll. Expo's dependency validation reports one
intentional deviation, recorded in `expo.install.exclude`: this wrapper
requires React Native WebView 14.0.1, which is newer than the version each SDK
pins.

Note for Expo SDK 54: that SDK pins React Native 0.81.5 with React 19.1.0,
while React Native 0.81.6 requires React `^19.1.4`. Stay on the versions Expo
pins rather than forcing the newer patch.

## Known upstream issues

These are defects in React Native or Expo, not in this wrapper. They are
listed because they affect consumers of this release.

- **React Native 0.87 removed the `backgroundColor` prop from `StatusBar`.**
  Applications that set it fail to type-check after upgrading. Remove the prop;
  no wrapper API is affected.
- **Expo SDK 56 and 57 development clients** may not auto-discover a
  development server bound to `localhost` when running on an Android emulator.
  Enter the server URL in the launcher's manual URL field, with
  `adb reverse tcp:8081 tcp:8081` configured.
