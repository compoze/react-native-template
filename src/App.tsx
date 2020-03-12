import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Login } from './pages/LoginPage'
import { AppHeader } from './components/header/Header';

const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ header: props => <AppHeader {...props} /> }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
