import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
// import { Provider } from 'mobx-react';
// import { Stores } from './stores/Stores';
import AppNavigator from './navigation/AppNavigator';
import SplashScreen from 'react-native-splash-screen';

interface Props {
  navigation: any;
}

export default class App extends React.Component<Props, {}> {
  // TODO refactor with state management
  async UNSAFE_componentWillMount(): Promise<void> {
    SplashScreen.hide();
  }

  render() {
    return (
      // <Provider {...Stores}>
      <NavigationContainer>
        <AppNavigator {...this.props} />
      </NavigationContainer>
      // </Provider>
    );
  }
}
