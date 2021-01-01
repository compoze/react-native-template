import React from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  Platform
} from 'react-native';
import { LoginInput } from '../../components/input';
import { Button } from '../../components/button';
import { UserStore } from '../../stores/UserStore';
import { styleConstants } from '../../config/constants';
import {
  requiredFieldsEmpty,
  ObjectToValidate,
  ValidationObject,
} from '../../utilities/FormValidation';
import { copy } from '../../config/static.copy';
import { GoogleSignin } from '@react-native-community/google-signin';
import { Icon } from 'react-native-elements';
import { AppleRequestResponse } from '@invertase/react-native-apple-authentication';

GoogleSignin.configure({
  webClientId: '<GOOGLE_WEB_CLIENT_ID>',
});

interface Props {
  userStore: UserStore;
  navigation: any;
  setStackNavigation(stackNavigation: any): void;
}

interface State {
  email?: string;
  password?: string;
}

export class Login extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };
  }

  componentDidMount = () => {
    this.props.setStackNavigation(this.props.navigation);
    if (this.userStore.isAuthenticated) {
      this.navigateToLanding();
    }
  };
  private userStore = this.props.userStore;

  private navigateToSignUp = (): void => {
    this.props.navigation.navigate('SignUp');
  };
  private navigateToMap = (): void => {
    this.props.navigation.navigate('Map', { showDestinations: false });
  };

  private navigateToLanding = (): void => {
    // this.props.navigation.navigate('HomePage');
    this.navigateToMap();
  };

  private onGoogleButtonPress = async (): Promise<void> => {
    try {
      await this.userStore.googleLogin();
    } catch (errors) {
      Alert.alert('Login Error', JSON.stringify(errors));
    }

    if (this.userStore.isAuthenticated) {
      this.navigateToLanding();
    }
  };

  private onPressLoginButton = async (): Promise<void> => {
    const { email, password } = this.state;
    const validationFields: ObjectToValidate[] = [
      { key: 'email', value: email },
      { key: 'password', value: password },
    ];
    const validationErrors: ValidationObject[] = requiredFieldsEmpty(
      ...validationFields
    );
    if (validationErrors.length !== 0) {
      Alert.alert('Login Error', JSON.stringify(validationErrors));
      return;
    }

    //TODO: Hack this just to make progress on automation
    try {
      await this.userStore.login(email!, password!);
    } catch (errors) {
      Alert.alert('Login Error', JSON.stringify(errors));
    }

    if (this.userStore.isAuthenticated) {
      this.navigateToLanding();
    }
  };
  private onAppleButtonPress = async () => {
    try {
      const userInfo: AppleRequestResponse | null = await this.userStore.getAppleCredential();
      const { email, fullName } = userInfo;
      if (email && fullName.familyName && fullName.givenName) {
        if (await this.userStore.isAuthenticated) {
          this.navigateToLanding();
        } else {
          this.setState({
            email: userInfo.email,
          });
        }
      } else if (await this.userStore.isAuthenticated) {
        this.navigateToLanding();
      } else {
        Alert.alert('There was an issue signing in with apple');
      }
    } catch (errors) {
      Alert.alert('Login Error', JSON.stringify(errors.message));
    }
  };

  public render(): JSX.Element {
    return (
      <View style={styles.container}>
        <ImageBackground
          style={styles.imageBackground}
          source={require('../../images/BackgroundOverlay.png')}
        >
          <View
            style={{
              flex: 3,
              maxWidth: '100%',
              marginBottom: 30,
              justifyContent: 'flex-end',
              alignContent: 'flex-end',
            }}>
            <Image
              style={{ resizeMode: 'contain' }}
              source={require('../../images/DefaultHeaderLogo.png')}
            />
          </View>
          <LoginInput
            autoCompleteType='email'
            placeholder={copy.loginUIStrings.EMAIL_INPUT_PLACEHOLDER}
            onChangeText={(email: string) => {
              this.setState({ email: email });
            }}
            keyboardType="email-address"
          />
          <LoginInput
            autoCompleteType='password'
            secureTextEntry={true}
            placeholder={copy.loginUIStrings.PASSWORD_INPUT_PLACEHOLDER}
            onChangeText={(password: string) => {
              this.setState({ password: password });
            }}
          />
          <Button hasShadow={true} invalid={false} onPress={this.onPressLoginButton}>
            <Text style={{ color: 'black' }}>Login</Text>
          </Button>
          <Text
            style={[styles.signUp, { marginVertical: 20 }]}
            onPress={() => this.props.navigation.navigate('ResetPasswordPage')}>
            Forgot Password?
          </Text>
          <Text>Or</Text>

          <Button
            onPress={this.onGoogleButtonPress}
            invalid={false}
            style={styles.continueWithGoogleButton}>
            <View style={styles.continueWithGoogleContent}>
              <Icon name="google" type="font-awesome" color="#4285F4" />
              <Text
                style={{
                  fontWeight: styleConstants.fontWeight.BOLD,
                  fontSize: styleConstants.fontSize.LARGE,
                }}>
                Continue with Google
              </Text>
            </View>
          </Button>
          {Platform.OS === 'ios' && (
            <Button
              onPress={this.onAppleButtonPress}
              invalid={false}
              hasShadow={true}
              style={styles.continueWithAppleButton}>
              <View style={styles.continueWithGoogleContent}>
                <Icon name="apple" type="font-awesome" />
                <Text
                  style={{
                    fontWeight: styleConstants.fontWeight.BOLD,
                    fontSize: styleConstants.fontSize.LARGE,
                  }}>
                  Sign in with Apple
                </Text>
              </View>
            </Button>
          )}
          <Text style={{paddingBottom: 15}}>
            Don't have an account?{' '}
            <Text style={styles.signUp} onPress={this.navigateToSignUp}>
              Sign Up
            </Text>
          </Text>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: styleConstants.colors.APP_BACKGROUND,
    width: '100%',
    height: '100%'
  },
  imageBackground: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: '7.5%',
  },
  title: {
    fontSize: styleConstants.fontSize.XX_LARGE,
    color: styleConstants.colors.TITLE_PRIMARY,
    fontWeight: styleConstants.fontWeight.BOLD,
    width: '100%',
    marginTop: 50,
    fontFamily: styleConstants.fontFamily.DEFAULT,
  },
  signUp: {
    color: 'blue',
    fontFamily: styleConstants.fontFamily.DEFAULT,
  },
  continueAsGuest: {
    color: 'blue',
    fontSize: styleConstants.fontSize.LARGE,
    fontFamily: styleConstants.fontFamily.DEFAULT,
  },
  continueWithGoogleButton: {
    width: '100%',
    height: 50,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    borderRadius: 6,
    borderColor: 'white',
    borderWidth: 1,
    shadowOffset: { width: 0, height: 2 },
    shadowColor: 'black',
    shadowOpacity: 0.14,
  },
  continueAsGuestButton: {
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderWidth: 0,
    flex: 3,
    marginBottom: 20,
  },
  continueWithGoogleContent: {
    paddingHorizontal: '7.5%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '80%',
    height: '100%',
  },
  continueWithAppleButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 0,
    borderColor: '#000',
    borderWidth: 1,
  },
});
