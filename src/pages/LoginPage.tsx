import React from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { styleConstants } from '../config/constants';
import {
  requiredFieldsEmpty,
  ObjectToValidate,
  ValidationObject,
} from '../utilities/FormValidation';
import { copy } from '../config/static.copy';
import { GoogleSignin } from '@react-native-community/google-signin';
import { Icon } from 'react-native-elements';
import LoginInput from '../components/input/LoginInput';
import Button from '../components/button/Button';

GoogleSignin.configure({
  webClientId: '<GOOGLE_WEB_CLIENT_ID>',
});

interface Props {
  navigation: any;
}

interface State {
  email: string;
  password: string;
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
    // if (this.props.userStore.isAuthenticated) {
    //   this.props.navigation.navigate('Map');
    // }
  };

  private navigateToSignUp = (): void => {
    this.props.navigation.navigate('SignUp');
  };

  private googleLogin = async (): Promise<void> => {
    try {
      // await this.props.userStore.googleLogin();
    } catch (errors) {
      Alert.alert('Login Error', JSON.stringify(errors));
    }

    // if (this.props.userStore.isAuthenticated) {
    //   this.navigateToMap();
    // }
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
    // try {
    //   await this.props.userStore.login(email!, password!);
    // } catch (errors) {
    //   Alert.alert('Login Error', JSON.stringify(errors));
    // }

    // if (this.props.userStore.isAuthenticated) {
    //   this.navigateToMap();
    // }
  };

  public render(): JSX.Element {
    return (
      <View style={styles.container}>
        <LoginInput
          placeholder={copy.loginUIStrings.EMAIL_INPUT_PLACEHOLDER}
          onChangeText={(email: string) => {
            this.setState({ email: email });
          }}
          keyboardType="email-address"
        />
        <LoginInput
          secureTextEntry={true}
          placeholder={copy.loginUIStrings.PASSWORD_INPUT_PLACEHOLDER}
          onChangeText={(password: string) => {
            this.setState({ password: password });
          }}
        />
        <Button invalid={false} onPress={this.onPressLoginButton}>
          <Text style={{ color: 'white' }}>Login</Text>
        </Button>

        <Text>Or</Text>

        <Button
          onPress={this.googleLogin}
          invalid={false}
          style={styles.continueWithGoogleButton}
        >
          <View style={styles.continueWithGoogleContent}>
            <Icon name="google" type="font-awesome" color="#4285F4" />
            <Text
              style={{
                fontWeight: styleConstants.fontWeight.BOLD,
                fontSize: styleConstants.fontSize.LARGE,
              }}
            >
              Continue with Google
            </Text>
          </View>
        </Button>
        <Text>
          Don't have an account?&nbsp;
          <Text style={styles.signUp} onPress={this.navigateToSignUp}>
            Sign Up
          </Text>
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: styleConstants.colors.APP_BACKGROUND,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  signUp: {
    color: 'blue',
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
  continueWithGoogleContent: {
    paddingHorizontal: '7.5%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '80%',
    height: '100%',
  },
});
