import React from 'react';
import { Alert, StyleSheet, Text, ScrollView, ImageBackground } from 'react-native';
import { AccountInput } from "../components/input"
import { UpdateAccountButton } from "../components/button"
import { UserStore } from '../stores/UserStore';
import { styleConstants } from '../config/constants';
import { requiredFieldsEmpty } from '../utilities/FormValidation';

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
        if (false === this.validateInputs()) {
            return;
        }

        const { email, password, firstName, lastName, phoneNumber } = this.state;
        const displayName: string = `${firstName} ${lastName}`;
        const userStore: UserStore = new UserStore()

    };

    private validateInputs(): boolean {
        if (this.state == null) {
            Alert.alert(signUpUIStrings.ALERT_ENTER_EMAIL_AND_PASS);
            return false;
        }

        const { email, password, firstName, lastName } = this.state;

        if (email === '' || null == email) {
            Alert.alert(signUpUIStrings.ALERT_ENTER_EMAIL);
            return false;
        }

        if (password === '' || null == email) {
            Alert.alert(signUpUIStrings.ALERT_ENTER_PASS);
            return false;
        }

        if (!firstName || firstName === '' || !lastName || lastName === '') {
            Alert.alert(signUpUIStrings.ALERT_ENTER_FIRST_AND_LAST);
            return false;
        }

        return true;
    }

    public render(): JSX.Element {
        const { email, password, firstName, lastName } = this.state;
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
                    <UpdateAccountButton disabled={requiredFieldsEmpty(email, password, firstName, lastName)} onPress={this.onPressSignUpButton}>
                        <Text>Hot Dog</Text>
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

