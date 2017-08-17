#!/usr/bin/env bash
gulp app
gulp tpl
ionic build
fir build_ipa platforms/ios -p
fir publish platforms/android/build/outputs/apk/android-armv7-debug.apk
if adb devices | grep "\<device\>"; then
    adb install -r platforms/android/build/outputs/apk/android-armv7-debug.apk
fi
