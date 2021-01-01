import React from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  ScrollView,
  View,
  Platform
} from 'react-native';
import { LoginInput } from '../../components/input';
import { Button } from '../../components/button';
import { UserStore } from '../../stores/UserStore';
import { styleConstants } from '../../config/constants';
import { AppleRequestResponse } from '@invertase/react-native-apple-authentication';
import {
  requiredFieldsEmpty,
  ValidationObject,
  ObjectToValidate
} from '../../utilities/FormValidation';
import { copy } from '../../config/static.copy';
import { Icon } from 'react-native-elements';
import AddPhotoModal from './AddPhotoModal';
import { User } from '../../model/User';

interface Props {
  userStore: UserStore;
  navigation: any;
}

interface State {
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  loggingInWithGoogle: boolean;
  showPhotoModal: boolean;
  showPhoneModal: boolean;
}

export class SignUp extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      phoneNumber: '',
      loggingInWithGoogle: false,
      showPhotoModal: false,
      showPhoneModal: false
    };
  }

  private closePhoneModal = () => {
    this.setState({ showPhoneModal: false });
  };
  private userStore = this.props.userStore;
  private navigateToLogin = () => {
    this.props.navigation.navigate('Login');
  };
  private navigateToLanding = (): void => {
    this.props.navigation.navigate('HomePage');
  };
  private onAppleButtonPress = async () => {
    try {
      const userInfo: AppleRequestResponse = await this.userStore.getAppleCredential();
      if (await this.userStore.authUserHasExistingProfile()) {
        await this.userStore.getCurrentUser();
        if (this.userStore.isAuthenticated) {
          this.navigateToLanding();
        }
      } else {
        this.setState({
          firstName: userInfo.fullName.givenName,
          lastName: userInfo.fullName.familyName,
          email: userInfo.email,
          showPhoneModal: true,
          showPhotoModal: true
        });
      }
    } catch (errors) {
      Alert.alert('Login Error', JSON.stringify(errors.message));
    }
  };
  private onGoogleButtonPress = async () => {
    try {
      const user: User = await this.userStore.googleLogin();
      if (await this.userStore.authUserHasExistingProfile()) {
        await this.userStore.getCurrentUser();
        if (this.userStore.isAuthenticated) {
          this.navigateToLanding();
        }
      } else {
        this.setState({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          showPhoneModal: true,
          showPhotoModal: true
        });
      }
    } catch (errors) {
      Alert.alert('Login Error', JSON.stringify(errors.message));
    }
  };
  private onPressSignUpButton = async (): Promise<void> => {
    const { email, password, firstName, lastName, phoneNumber } = this.state;
    const validationFields: ObjectToValidate[] = [
      { key: 'First Name', value: firstName },
      { key: 'Last Name', value: lastName },
      { key: 'email', value: email },
      { key: 'password', value: password }
    ];
    const validationErrors: ValidationObject[] = requiredFieldsEmpty(
      ...validationFields
    );
    if (validationErrors.length !== 0) {
      Alert.alert('Sign Up Error', validationErrors[0].message);
      return;
    }

    const userStore: UserStore = new UserStore();
    try {
      await userStore.signUp(email, password, firstName, lastName, phoneNumber);
      Alert.alert('User signed up successfully');
    } catch (errors) {
      Alert.alert('Sign Up Error', JSON.stringify(errors));
    }

    if (userStore.isAuthenticated) {
      this.navigateToLanding();
    }
  };

  public componentWillUnmount(): void {
    this.setState({ showPhotoModal: false }); //this is a bug fix for clicking to fast on signup because it does happen -- CTP
  }

  public render(): JSX.Element {
    const { email, password, firstName, lastName } = this.state;
    const validationFields: ObjectToValidate[] = [
      { key: 'email', value: email },
      { key: 'password', value: password },
      { key: 'First Name', value: firstName },
      { key: 'Last Name', value: lastName }
    ];
    return (
      <ScrollView style={styles.scroll}>
        <Text style={styles.title}>{copy.signUpUIStrings.SIGN_UP_TITLE}</Text>
        {this.state.showPhotoModal ? (
          <AddPhotoModal
            navigation={this.props.navigation}
            showGooglePhoto={false}
            togglePhotoModal={this.closePhoneModal}
            userStore={this.userStore}
          />
        ) : undefined}
        <LoginInput
          title="First Name*"
          placeholder={copy.signUpUIStrings.FIRST_NAME_INPUT_PLACEHOLDER}
          onChangeText={(firstName: string) => {
            this.setState({ firstName: firstName });
          }}
        />
        <LoginInput
          title="Last Name*"
          placeholder={copy.signUpUIStrings.LAST_NAME_INPUT_PLACEHOLDER}
          onChangeText={(lastName: string) => {
            this.setState({ lastName: lastName });
          }}
        />
        <LoginInput
          title="Email*"
          autoCompleteType='email'
          placeholder={copy.signUpUIStrings.EMAIL_INPUT_PLACEHOLDER}
          onChangeText={(email: string) => {
            this.setState({ email: email });
          }}
          keyboardType="email-address"
        />
        <LoginInput
          title="Password*"
          autoCompleteType='password'
          secureTextEntry={true}
          placeholder={copy.signUpUIStrings.PASSWORD_INPUT_PLACEHOLDER}
          onChangeText={(password: string) => {
            this.setState({ password: password });
          }}
        />
        <LoginInput
          title="Phone Number"
          autoCompleteType='tel'
          placeholder={copy.signUpUIStrings.PHONE_NUMBER_INPUT_PLACEHOLDER}
          onChangeText={(phoneNumber: string) => {
            this.setState({ phoneNumber: phoneNumber });
          }}
          keyboardType="phone-pad"
        />
        <Button
          invalid={requiredFieldsEmpty(...validationFields).length !== 0}
          onPress={this.onPressSignUpButton}
        >
          <Text>{copy.signUpUIStrings.SIGN_UP}</Text>
        </Button>
          <Text style={{ alignSelf: 'center' }}>or</Text>
          <Button
            onPress={this.onGoogleButtonPress}
            invalid={false}
            hasShadow={true}
            style={styles.continueWithGoogleButton}
          >
            <View style={styles.continueWithGoogleContent}>
              <Icon name="google" type="font-awesome" color="#4285F4"/>
              <Text
                style={{
                  fontWeight: styleConstants.fontWeight.BOLD,
                  fontSize: styleConstants.fontSize.MEDIUM
                }}
              >
                Sign up with Google
              </Text>
            </View>
          </Button>
          {Platform.OS === 'ios' && (
            <Button
              onPress={this.onAppleButtonPress}
              invalid={false}
              style={styles.continueWithAppleButton}
            >
              <View style={styles.continueWithGoogleContent}>
                <Icon name="apple" type="font-awesome"/>
                <Text
                  style={{
                    fontWeight: styleConstants.fontWeight.BOLD,
                    fontSize: styleConstants.fontSize.LARGE
                  }}
                >
                  Sign in with Apple
                </Text>
              </View>
            </Button>
          )}
        <Text style={styles.alreadyAccount} onPress={this.navigateToLogin}>Already have an account?</Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  scroll: {
    backgroundColor: styleConstants.colors.APP_BACKGROUND,
    paddingHorizontal: '7.5%'
  },
  alreadyAccount: {
    color: styleConstants.colors.PRIMARY,
    backgroundColor: styleConstants.colors.TRANSPARENT
  },
  title: {
    fontSize: styleConstants.fontSize.XX_LARGE,
    color: styleConstants.colors.TITLE_PRIMARY,
    fontWeight: styleConstants.fontWeight.BOLD,
    width: '100%'
  },
  continueWithGoogleContent: {
    paddingHorizontal: '7.5%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '80%',
    height: '100%'
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
    borderWidth: 1
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
    shadowOpacity: 0.14
  }
});
