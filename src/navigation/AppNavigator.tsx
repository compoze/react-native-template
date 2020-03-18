import React from 'react';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { Login } from '../pages/LoginPage';
import { SignUp } from '../pages/SignUpPage';
import { AccountPage } from '../pages/AccountPage';
import { AboutPage } from '../pages/AboutPage';
import { AppHeader } from '../components/header/Header';
import { UserStore } from '../stores/UserStore';

interface Props {
    navigation: any;
    userStore: UserStore;
    setStackNavigation(stackNavigation: any): void;
}

const Stack = createStackNavigator();
export default class AppNavigator extends React.Component<Props> {
    render() {
        return (
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen
                    name="Login"
                    options={{ header: props => <AppHeader {...props} toggleSideMenu={this.props.navigation.toggleDrawer} /> }}>
                    {props => <Login userStore={this.props.userStore} setStackNavigation={this.props.setStackNavigation} {...props} />}
                </Stack.Screen>
                <Stack.Screen
                    name="SignUp"
                    component={SignUp}
                    options={{ header: props => <AppHeader {...props} toggleSideMenu={this.props.navigation.toggleDrawer} /> }}
                />
                <Stack.Screen
                    name="AccountPage"
                    component={AccountPage}
                    options={{ header: props => <AppHeader {...props} toggleSideMenu={this.props.navigation.toggleDrawer} /> }}
                />
                <Stack.Screen
                    name="AboutPage"
                    component={AboutPage}
                    options={{ header: props => <AppHeader {...props} toggleSideMenu={this.props.navigation.toggleDrawer} /> }}
                />
            </Stack.Navigator>
        );
    }
}