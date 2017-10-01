# About SPARKR

#Release Logs 

## 0.1.0

Date: TBD

Description: First prototype release

* Authentication 
    * Ionic Cloud Auth
    * Instagram
* Data Service
* Use Data Models, Forms, List and Detail components 

# Installation

## Prerequisites

* npm and Node
* Ionic and Cordova
* Android Studio
* Android Virtual Device API 25
* XCode

## Download 

```bash
$ git clone https://github.com/sparkrnyc/sparkr_mobile.git
$ cd sparkr_mobile
```

## Running Sparkr

### iOS

```bash
$ ionic cordova platform ls
$ ionic cordova platform ios
$ ionic cordova emulate ios
```

### Android

```bash
$ ionic cordova platform ls
$ ionic cordova platform android
$ ionic cordova emulate android
```

## Debugging

### iOS

#### Undefined simulator Device type
When running 
```bash
$ ionic cordova emulate ios
```
you might get the error

```text
No target specified for emulator. Deploying to undefined simulator Device type com.apple.CoreSimulator.SimDeviceType.undefined could not be found
```

in your project folder root, run the command
```bash
$ cd platforms/ios/cordova
$ npm install ios-sim
```

#### Emulator Login Error
When you run the application in your emulator and you have problems entering the username or password, try toggling the software keyboard. When you enter an input control, the software keyboard should pop up. 

Go to the Emulator menu > Hardware > Keyboard > Toggle Software Keyboard Command-K

### Android

When you run 
```bash
$ ionic cordova emulate android
```

and you get the error
```text
A problem occurred configuring root project 'android'.
> You have not accepted the license agreements of the following SDK components:
  [Android SDK Platform 25].
  Before building your project, you need to accept the license agreements and complete the installation of the missing components using the Android Studio SDK Manager.
```

Make sure that your Android emulator in Android Studio and the AVD Manager is supported by API 25. Ionic at the moment does not yet support API 26.