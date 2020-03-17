import React from 'react';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { Login } from '../pages/LoginPage';
import { SignUp } from '../pages/SignUpPage';
import { AccountPage } from '../pages/AccountPage';
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
                    component={props => <Login setStackNavigation={this.props.setStackNavigation} {...props} />}
                    options={{ header: props => <AppHeader {...props} toggleSideMenu={this.props.navigation.toggleDrawer} /> }}
                />
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
            </Stack.Navigator>
        );
    }
}