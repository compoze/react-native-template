import React from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { LoginInput } from "../components/input"
import { LoginButton } from "../components/button"
import { UserStore } from '../stores/UserStore';
import { getUIConstantFromFirebaseError } from '../components/error/auth';
import { RNFirebase } from 'react-native-firebase';
import { styleConstants } from '../config/constants';
import { requiredFieldsEmpty, ObjectToValidate, ValidationObject } from '../utilities/FormValidation';

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
    }

    private navigateToSignUp = (): void => {
        this.props.navigation.navigate('SignUp');
    }

    private onPressLoginButton = (): void => {
        const { email, password } = this.state;
        const validationFields: ObjectToValidate[] = [
            { key: 'email', value: email },
            { key: 'password', value: password },
        ];
        const validationErrors: ValidationObject[] = requiredFieldsEmpty(...validationFields);
        if (validationErrors.length !== 0) {
            Alert.alert(validationErrors[0].message);
            return;
        }

        //TODO: Hack this just to make progress on automation
        const userStore: UserStore = new UserStore()
        userStore.login(email!, password!).catch(error => {
            const alertString = getUIConstantFromFirebaseError(error);
            Alert.alert(alertString);
        })
            .then((user: RNFirebase.UserCredential) => {
                Alert.alert('User logged in successfully')
            });
    };

    public render(): JSX.Element {
        const { email, password } = this.state;
        const validationFields: ObjectToValidate[] = [
            { key: 'email', value: email },
            { key: 'password', value: password },
        ];
        return (
            <View style={styles.container}>
                <Text style={styles.title}>{loginUIStrings.LOGIN_TITLE}</Text>
                <LoginInput
                    title='Email*'
                    placeholder='Enter Your Email'
                    onChangeText={(email: string) => {
                        this.setState({ email: email })
                    }}
                    keyboardType="email-address"
                />
                <LoginInput
                    title='Password*'
                    secureTextEntry={true}
                    placeholder='Enter Your Password'
                    onChangeText={(password: string) => {
                        this.setState({ password: password })
                    }}
                />
                <LoginButton invalid={requiredFieldsEmpty(...validationFields).length !== 0} onPress={this.onPressLoginButton}>
                    <Text >Login</Text>
                </LoginButton>
                <LoginButton invalid={false} onPress={this.navigateToSignUp}>
                    <Text >Sign Up</Text>
                </LoginButton>
            </View>
        )
    }
}

const loginUIStrings = {
    APP_NAME: 'myapp',
    EMAIL_INPUT_PLACEHOLDER: 'Email',
    PASSWORD_INPUT_PLACEHOLDER: 'Password',
    ALERT_ENTER_EMAIL_AND_PASS: 'You must enter an email and a password',
    ALERT_ENTER_EMAIL: 'You must enter an email and a password',
    ALERT_ENTER_PASS: 'You must enter an email and a password',
    LOGIN_TITLE: 'Sign In To Your Account',
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: styleConstants.colors.APP_BACKGROUND,
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
    },
});

