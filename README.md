# react-native-template
Template repo for React-Native application

## Developer setup

1. Ensure that both XCode and Android Studio are set up correctly
2. Obtain Elko auth config via Keeper. Add the base64-encoded value as an env variable called `AUTH_CONFIG`
3. Run `npm install` to install dependencies
4. Configure the [default styles](./src/config/constants.ts) and [elko styles options](./src/config/elko.style.options.ts) according to how the app styling should be. NOTE!! Use these styles globally to make the app consistent 
## Running Android and IOS

### Changing Environments

1. Run `npm run build <ENVIRONMENT_NAME>`
2. If metro bundler is already running, stop it and run `npm start`
3. Follow steps below for desired emulator

### Run IOS

1. In a terminal, run `npm run start`
2. Open a new terminal and run `npm run ios`
3. An emulator should open with the application

### Run Android

1. In a terminal, run `npm run start`
2. Open an android emulator
3. Open a new terminal and run `npm run android`
4. The app should run on the emulator


https://console.firebase.google.com/project/myapp-22b6f/settings/serviceaccounts/adminsdk

### Suggest adding MobX for user store management
