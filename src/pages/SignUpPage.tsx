import React from 'react';
import { Alert, StyleSheet, Text, ScrollView, View } from 'react-native';
import { LoginInput } from "../components/input"
import { LoginButton } from "../components/button"
import { UserStore } from '../stores/UserStore';
import { getUIConstantFromFirebaseError } from '../components/error/auth';
import { RNFirebase } from 'react-native-firebase';
import { styleConstants } from '../config/constants';
import { requiredFieldsEmpty, ValidationObject, ObjectToValidate } from '../utilities/FormValidation';

interface Props {
    userStore: UserStore;
}

interface State {
    email?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
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
        };
    }

    private onPressSignUpButton = (): void => {
        const { email, password, firstName, lastName, phoneNumber } = this.state;
        const validationFields: ObjectToValidate[] = [
            { key: 'First Name', value: firstName },
            { key: 'Last Name', value: lastName },
            { key: 'email', value: email },
            { key: 'password', value: password },
        ];
        const validationErrors: ValidationObject[] = requiredFieldsEmpty(...validationFields);
        if (validationErrors.length !== 0) {
            Alert.alert(validationErrors[0].message); return;
        }

        const displayName: string = `${firstName} ${lastName}`;
        const userStore: UserStore = new UserStore()
        userStore.signUp(email!, password!, displayName, phoneNumber).catch(error => {
            const alertString = getUIConstantFromFirebaseError(error);
            Alert.alert(alertString);
        })
            .then((user: RNFirebase.UserCredential) => {
                Alert.alert('User signed up successfully')
            });
    };

    public render(): JSX.Element {
        const { email, password, firstName, lastName } = this.state;
        const validationFields: ObjectToValidate[] = [
            { key: 'email', value: email },
            { key: 'password', value: password },
            { key: 'First Name', value: firstName },
            { key: 'Last Name', value: lastName },
        ];
        return (
            <ScrollView style={styles.scroll}>
                <Text style={styles.title}>{signUpUIStrings.SIGN_UP_TITLE}</Text>
                <LoginInput
                    title='First Name*'
                    placeholder='Enter Your First Name'
                    onChangeText={(firstName: string) => {
                        this.setState({ firstName: firstName })
                    }}
                />
                <LoginInput
                    title='Last Name*'
                    placeholder='Enter Your Last Name'
                    onChangeText={(lastName: string) => {
                        this.setState({ lastName: lastName })
                    }}
                />
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
                <LoginInput
                    title='Phone Number'
                    placeholder='Enter Your Phone Number'
                    onChangeText={(phoneNumber: string) => {
                        this.setState({ phoneNumber: phoneNumber })
                    }}
                    keyboardType="phone-pad"
                />
                <LoginButton invalid={requiredFieldsEmpty(...validationFields).length !== 0} onPress={this.onPressSignUpButton}>
                    <Text>{signUpUIStrings.SIGN_UP}</Text>
                </LoginButton>
            </ScrollView>
        )
    }
}

const signUpUIStrings = {
    APP_NAME: 'myapp',
    EMAIL_INPUT_PLACEHOLDER: 'Email',
    PASSWORD_INPUT_PLACEHOLDER: 'Password',
    ALERT_ENTER_EMAIL_AND_PASS: 'You must enter an email and a password',
    ALERT_ENTER_EMAIL: 'You must enter an email and a password',
    ALERT_ENTER_PASS: 'You must enter an email and a password',
    ALERT_ENTER_FIRST_AND_LAST: 'You must enter an first and last name',
    SIGN_UP_TITLE: 'Sign Up For An Account',
    SIGN_UP: 'Sign Up',
};
const styles = StyleSheet.create({
    scroll: {
        backgroundColor: styleConstants.colors.APP_BACKGROUND,
        paddingHorizontal: '7.5%',
    },
    title: {
        fontSize: styleConstants.fontSize.XX_LARGE,
        color: styleConstants.colors.TITLE_PRIMARY,
        fontWeight: styleConstants.fontWeight.BOLD,
        width: '100%',
    },
});

