import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Login } from './pages/LoginPage';
import { SignUp } from './pages/SignUpPage';
import { AccountPage } from './pages/AccountPage';
import { AppHeader } from './components/header/Header';
import Menu from './components/menu/Menu';
import SideMenu from 'react-native-side-menu';
import { UserStore } from './stores/UserStore';

interface Props {
  navigation: any;
}

interface State {
  sideMenuOpen: boolean;
}

const userStore: UserStore = new UserStore();
const Stack = createStackNavigator();
export default class App extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      sideMenuOpen: false,
    };
  }

  toggleMenu = () => {
    this.setState({
      sideMenuOpen: !this.state.sideMenuOpen,
    });
  }

  updateMenuState = (sideMenuOpen: boolean): void => {
    this.setState({ sideMenuOpen });
  }

  render() {
    return (
      <NavigationContainer>
        <SideMenu
          menu={<Menu userStore={userStore} {...this.props} />}
          isOpen={this.state.sideMenuOpen}
          onChange={this.updateMenuState}>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ header: props => <AppHeader {...props} toggleSideMenu={this.toggleMenu} /> }}
              initialParams={{ userStore: userStore }}
            />
            <Stack.Screen
              name="SignUp"
              component={SignUp}
              options={{ header: props => <AppHeader {...props} toggleSideMenu={this.toggleMenu} /> }}
              initialParams={{ userStore: userStore }}
            />
            <Stack.Screen
              name="AccountPage"
              component={AccountPage}
              options={{ header: props => <AppHeader {...props} toggleSideMenu={this.toggleMenu} /> }}
              initialParams={{ userStore: userStore }}
            />
          </Stack.Navigator>
        </SideMenu>
      </NavigationContainer >
    );
  }
}
