import React from 'react';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { Login } from '../pages/LoginPage';
import { SignUp } from '../pages/SignUpPage';
import { AccountPage } from '../pages/AccountPage';
import { AboutPage } from '../pages/AboutPage';
import { AppHeader } from '../components/header/Header';
import { UserStore } from '../stores/UserStore';
import { Landing } from '../pages/Landing';
import { Map } from '../pages/Map';
import { LocationService } from '../services/LocationService';
import { CameraPage } from '../pages/CameraPage';

interface Props {
  navigation: any;
  userStore: UserStore;
  locationService: LocationService;
  setStackNavigation(stackNavigation: any): void;
}

const Stack = createStackNavigator();

export default class AppNavigator extends React.Component<Props> {
  render() {
    return (
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          options={{
            header: (props) => (
              <AppHeader
                {...props}
                toggleSideMenu={this.props.navigation.toggleDrawer}
              />
            ),
          }}
        >
          {(props) => (
            <Login
              userStore={this.props.userStore}
              setStackNavigation={this.props.setStackNavigation}
              {...props}
            />
          )}
        </Stack.Screen>
        <Stack.Screen
          name="SignUp"
          options={{
            header: (props) => (
              <AppHeader
                {...props}
                toggleSideMenu={this.props.navigation.toggleDrawer}
              />
            ),
          }}
        >
          {(props) => <SignUp userStore={this.props.userStore} {...props} />}
        </Stack.Screen>
        <Stack.Screen
          name="AccountPage"
          options={{
            header: (props) => (
              <AppHeader
                {...props}
                toggleSideMenu={this.props.navigation.toggleDrawer}
              />
            ),
          }}
        >
          {(props) => (
            <AccountPage userStore={this.props.userStore} {...props} />
          )}
        </Stack.Screen>
        <Stack.Screen
          name="AboutPage"
          component={AboutPage}
          options={{
            header: (props) => (
              <AppHeader
                {...props}
                toggleSideMenu={this.props.navigation.toggleDrawer}
              />
            ),
          }}
        />
        <Stack.Screen
          name="Landing"
          options={{
            header: (props) => (
              <AppHeader
                {...props}
                toggleSideMenu={this.props.navigation.toggleDrawer}
              />
            ),
          }}
        >
          {(props) => <Landing {...props} />}
        </Stack.Screen>
        <Stack.Screen
          name="Map"
          options={{
            header: (props) => (
              <AppHeader
                {...props}
                toggleSideMenu={this.props.navigation.toggleDrawer}
              />
            ),
          }}
        >
          {(props) => (
            <Map
              userStore={this.props.userStore}
              locationService={this.props.locationService}
              {...props}
            />
          )}
        </Stack.Screen>
        <Stack.Screen
          name="CameraPage"
          options={{
            header: (props) => (
              <AppHeader
                {...props}
                toggleSideMenu={this.props.navigation.toggleDrawer}
              />
            ),
          }}
        >
          {() => <CameraPage />}
        </Stack.Screen>
      </Stack.Navigator>
    );
  }
}
