import React from 'react';
import { Alert, StyleSheet, Text, ScrollView, ImageBackground } from 'react-native';
import { AccountInput } from "../components/input"
import { UpdateAccountButton } from "../components/button"
import { UserStore } from '../stores/UserStore';
import { styleConstants } from '../config/constants';
import { requiredFieldsEmpty, ObjectToValidate, ValidationObject } from '../utilities/FormValidation';

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
export class AccountPage extends React.Component<Props, State> {
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
            Alert.alert(validationErrors[0].message);
            return;
        }

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
            <ImageBackground style={styles.container} source={require('../images/DefaultBackground.png')}>
                <ScrollView style={styles.scroll}>
                    <AccountInput
                        title='First Name*'
                        placeholder='Enter Your First Name'
                        onChangeText={(firstName: string) => {
                            this.setState({ firstName: firstName })
                        }}
                    />
                    <AccountInput
                        title='Last Name*'
                        placeholder='Enter Your Last Name'
                        onChangeText={(lastName: string) => {
                            this.setState({ lastName: lastName })
                        }}
                    />
                    <AccountInput
                        title='Email*'
                        placeholder='Enter Your Email'
                        onChangeText={(email: string) => {
                            this.setState({ email: email })
                        }}
                        keyboardType="email-address"
                    />
                    <AccountInput
                        title='Password*'
                        secureTextEntry={true}
                        placeholder='Enter Your Password'
                        onChangeText={(password: string) => {
                            this.setState({ password: password })
                        }}
                    />
                    <AccountInput
                        title='Phone Number'
                        placeholder='Enter Your Phone Number'
                        onChangeText={(phoneNumber: string) => {
                            this.setState({ phoneNumber: phoneNumber })
                        }}
                        keyboardType="phone-pad"
                    />
                    <UpdateAccountButton invalid={requiredFieldsEmpty(...validationFields).length !== 0} onPress={this.onPressSignUpButton}>
                        <Text>Update</Text>
                    </UpdateAccountButton>
                </ScrollView>
            </ImageBackground>
        );
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
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: '7.5%',
        height: '100%',
    },
    scroll: {
        backgroundColor: styleConstants.colors.APP_BACKGROUND,
        minHeight: '50%',
        maxHeight: '90%',
        width: '80%',
        borderColor: styleConstants.colors.INPUT_BACKGROUND_BORDER,
        borderRadius: 25,
        borderWidth: 1,
        paddingHorizontal: 10,
    },
    title: {
        fontSize: styleConstants.fontSize.XX_LARGE,
        color: styleConstants.colors.TITLE_PRIMARY,
        fontWeight: styleConstants.fontWeight.BOLD,
        width: '100%',
    },
});

