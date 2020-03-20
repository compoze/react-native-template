# react-native-template
Template repo for React-Native application

Ensure that both XCode and Android Studio are setup

## Running Android and IOS

For both Android and IOS be sure to run ```npm install``` this will install the required node_modules and pods for ios.

### Changing Environments

1. run ```npm run build <ENVIRONMENT_NAME>```
2. if metro bundler is already running, stop it and run ```npm start```
3. follow steps below for desired emulator

### Run IOS

1. In a terminal, run ```npm run start```
2. Open a new terminal and run ```npm run ios```
3. An emulator should open with the application

### Run Android

1. In a terminal, run ```npm run start```
2. Open an android emulator
3. Open a new terminal and run ```npm run android```
4. The app should run on the emulator


https://console.firebase.google.com/project/myapp-22b6f/settings/serviceaccounts/adminsdk