import React from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { LoginInput } from "../components/input"
import { Button } from "../components/button"
import { UserStore } from '../stores/UserStore';
import { styleConstants } from '../config/constants';
import { requiredFieldsEmpty, ObjectToValidate, ValidationObject } from '../utilities/FormValidation';
import { copy } from '../config/static.copy';
import { GoogleSignin, GoogleSigninButton } from '@react-native-community/google-signin';
GoogleSignin.configure({
    webClientId: '157175452340-qsvji9p19lq2240v49vtaf3pejgakvb2.apps.googleusercontent.com'
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
        if (this.props.userStore.isAuthenticated) {
            this.props.navigation.navigate('Landing');
        }
    }

    
    private navigateToSignUp = (): void => {
        this.props.navigation.navigate('SignUp');
    }

    private googleLogin = async (): Promise<void> => {
        try {
            await this.props.userStore.googleLogin();
            Alert.alert('User signed in successfully');
        } catch (errors) {
            Alert.alert(errors);
        }

        if (this.props.userStore.isAuthenticated) {
            this.props.navigation.navigate('Landing');
        }
    };


    private onPressLoginButton = async (): Promise<void> => {
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
        try {
            await this.props.userStore.login(email!, password!);
            Alert.alert('User signed up successfully');
        } catch (errors) {
            Alert.alert(errors);
        }

        if (this.props.userStore.isAuthenticated) {
            this.props.navigation.navigate('Landing');
        }
    };

    public render(): JSX.Element {
        const { email, password } = this.state;
        const validationFields: ObjectToValidate[] = [
            { key: 'email', value: email },
            { key: 'password', value: password },
        ];
        return (
            <View style={styles.container}>
                <Text style={styles.title}>{copy.loginUIStrings.LOGIN_TITLE}</Text>
                <LoginInput
                    title='Email*'
                    placeholder={copy.loginUIStrings.EMAIL_INPUT_PLACEHOLDER}
                    onChangeText={(email: string) => {
                        this.setState({ email: email })
                    }}
                    keyboardType="email-address"
                />
                <LoginInput
                    title='Password*'
                    secureTextEntry={true}
                    placeholder={copy.loginUIStrings.PASSWORD_INPUT_PLACEHOLDER}
                    onChangeText={(password: string) => {
                        this.setState({ password: password })
                    }}
                />
                <GoogleSigninButton
                    style={{ width: 192, height: 48 }}
                    size={GoogleSigninButton.Size.Wide}
                    color={GoogleSigninButton.Color.Dark}
                    onPress={this.googleLogin} />

                <Button invalid={requiredFieldsEmpty(...validationFields).length !== 0} onPress={this.onPressLoginButton}>
                    <Text >Login</Text>
                </Button>
                <Button invalid={false} onPress={this.navigateToSignUp}>
                    <Text >Sign Up</Text>
                </Button>
            </View>
        )
    }
}

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

