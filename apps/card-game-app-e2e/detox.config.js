module.exports = {
  testRunner: 'jest',
  runnerConfig: 'jest.config.json',
  apps: {
    'ios.debug': {
      type: 'ios.app',
      build:
        "cd ../card-game-app/ios && xcodebuild -workspace CardGameApp.xcworkspace -scheme CardGameApp -configuration Debug -sdk iphonesimulator -destination 'platform=iOS Simulator,name=iPhone 13' -derivedDataPath ./build -quiet",
      binaryPath:
        '../card-game-app/ios/build/Build/Products/Debug-iphonesimulator/CardGameApp.app'
    },
    'ios.release': {
      type: 'ios.app',
      build:
        "cd ../card-game-app/ios && xcodebuild -workspace CardGameApp.xcworkspace -scheme CardGameApp -configuration Release -sdk iphonesimulator -destination 'platform=iOS Simulator,name=iPhone 13' -derivedDataPath ./build -quiet",
      binaryPath:
        '../card-game-app/ios/build/Build/Products/Release-iphonesimulator/CardGameApp.app'
    },
    'android.debug': {
      type: 'android.apk',
      build:
        'cd ../card-game-app/android && ./gradlew assembleDebug assembleAndroidTest -DtestBuildType=debug',
      binaryPath:
        '../card-game-app/android/app/build/outputs/apk/debug/app-debug.apk'
    },
    'android.release': {
      type: 'android.apk',
      build:
        'cd ../card-game-app/android && ./gradlew assembleRelease assembleAndroidTest -DtestBuildType=release',
      binaryPath:
        '../card-game-app/android/app/build/outputs/apk/release/app-release.apk'
    }
  },
  devices: {
    simulator: {
      type: 'ios.simulator',
      device: {
        type: process.env.E2E_IOS_SIMULATOR || 'iPhone 13'
      }
    },
    emulator: {
      type: 'android.emulator',
      device: {
        avdName: process.env.E2E_ANDROID_SIMULATOR || 'Pixel_4a_API_30'
      }
    }
  },
  configurations: {
    'ios.sim.release': {
      device: 'simulator',
      app: 'ios.release'
    },
    'ios.sim.debug': {
      device: 'simulator',
      app: 'ios.debug'
    },
    'android.emu.release': {
      device: 'emulator',
      app: 'android.release'
    },
    'android.emu.debug': {
      device: 'emulator',
      app: 'android.debug'
    }
  }
}
