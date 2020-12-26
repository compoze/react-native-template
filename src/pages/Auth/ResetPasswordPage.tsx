import React from 'react';
import { Alert, StyleSheet, Text, View, Image, Platform } from 'react-native';
import { Button } from '../../components/button';
import { styleConstants } from '../../config/constants';
import {
  requiredFieldsEmpty,
  ObjectToValidate,
  ValidationObject,
} from '../../utilities/FormValidation';
import { Icon } from 'react-native-elements';
import { UserStore } from '../../stores/UserStore';
import { LoginInput } from '../../components/input';

interface Props {
  navigation: any;
}

interface State {
  email: string;
  showInputScreen: boolean;
}

export class ResetPasswordPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      email: '',
      showInputScreen: true,
    };
  }
  private userStore: UserStore = new UserStore();

  private onPressNextButton = async (): Promise<void> => {
    const { email } = this.state;
    const validationFields: ObjectToValidate[] = [
      { key: 'email', value: email },
    ];
    const validationErrors: ValidationObject[] = requiredFieldsEmpty(
      ...validationFields
    );
    let errString = '';
    validationErrors.map((error) => {
      errString += `${error.message}\n`;
    });
    if (validationErrors.length !== 0) {
      Alert.alert('Sign Up Error', errString);
      return;
    }
    try {
      await this.userStore.forgotPassword(email);
      this.setState({
        showInputScreen: false,
      });
    } catch (errors) {
      Alert.alert('Firebase Error', JSON.stringify(errors.message));
    }
  };

  public render(): JSX.Element {
    const { email } = this.state;
    const validationFields: ObjectToValidate[] = [
      { key: 'email', value: email },
    ];
    return (
      <View style={styles.container}>
        {this.state.showInputScreen ? (
          <View style={{ width: '100%' }}>
            <View style={styles.header}>
              <Icon
                name="long-arrow-left"
                type="font-awesome"
                size={30}
                onPress={() => this.props.navigation.goBack()}
              />
              <Text style={styles.headerText}>Forgot Password</Text>
            </View>
            <Text>
              Please enter your email below to receive your password reset
              instructions
            </Text>
            <LoginInput
              placeholder="Email"
              autoCompleteType="email"
              value={this.state.email}
              onChangeText={(email: string) => {
                this.setState({ email: email });
              }}
            />
            <Button
              style={styles.submitButton}
              invalid={requiredFieldsEmpty(...validationFields).length !== 0}
              onPress={this.onPressNextButton}
            >
              <Text style={styles.submitText}>Next</Text>
            </Button>
          </View>
        ) : (
          <View style={{ width: '100%', alignItems: 'center' }}>
            <Image
              style={{ height: 190, width: 220 }}
              source={require('../images/PasswordBike.png')}
            />
            <Text style={styles.title}>Reset instructions sent</Text>
            <Text style={{ textAlign: 'center', paddingHorizontal: 20 }}>
              Please check your email for the next steps in resetting your
              password
            </Text>
            <Button
              invalid={false}
              onPress={() => this.props.navigation.push('Login')}
              style={{ width: '60%', alignSelf: 'center' }}
            >
              <Text>Back to Login</Text>
            </Button>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 120 : 40,
    alignItems: 'center',
    paddingHorizontal: '7.5%',
    width: '100%',
  },
  header: {
    alignSelf: 'flex-start',
    marginBottom: 40,
    flexDirection: 'row',
  },
  headerText: {
    marginLeft: 15,
    fontFamily: styleConstants.fontFamily.DEFAULT_BOLD,
    fontSize: styleConstants.fontSize.XX_LARGE,
  },
  title: {
    fontSize: styleConstants.fontSize.XX_LARGE,
    fontFamily: styleConstants.fontFamily.DEFAULT_BOLD,
    alignSelf: 'center',
    textAlign: 'center',
    marginVertical: 20,
    width: '100%',
  },
  submitButton: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 8,
  },
  submitText: {
    fontFamily: styleConstants.fontFamily.DEFAULT_BOLD,
    color: '#ffffff',
    fontSize: 16,
  },
});
