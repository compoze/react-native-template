import React from 'react';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { Login } from '../pages/LoginPage';
import { SignUp } from '../pages/SignUpPage';
import { AppHeader } from '../components/header/Header';
import { HomePage } from '../pages/Home/HomePage';

const Stack = createStackNavigator();

interface Props {
  navigation: any;
}

export default class AppNavigator extends React.Component<Props, {}> {
  render() {
    return (
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          options={{
            header: (props) => <AppHeader {...props} />,
          }}
        >
          {(props) => <Login {...props} />}
        </Stack.Screen>
        <Stack.Screen
          name="SignUp"
          options={{
            header: (props) => <AppHeader {...props} />,
          }}
        >
          {(props) => <SignUp {...props} />}
        </Stack.Screen>
        <Stack.Screen
          name="HomePage"
          options={{
            header: (props) => <AppHeader {...props} />,
          }}
        >
          {(props) => <HomePage {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    );
  }
}
