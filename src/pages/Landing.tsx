import React from 'react';
import { Alert, StyleSheet, Text, ScrollView, View, ImageBackground } from 'react-native';
import { LoginInput } from "../components/input"
import { LoginButton } from "../components/button"
import { UserStore } from '../stores/UserStore';
import { getUIConstantFromFirebaseError } from '../components/error/auth';
import { RNFirebase } from 'react-native-firebase';
import { styleConstants } from '../config/constants';
import { requiredFieldsEmpty, ValidationObject, ObjectToValidate } from '../utilities/FormValidation';
import { copy } from '../config/static.copy';

interface Props {

}

interface State {
    objects: any[];
}

export class Landing extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            objects: [],
        };
    }

    public render(): JSX.Element {
        return (
            <ScrollView style={styles.scroll}>
                <ImageBackground style={styles.titleBlock} source={require('../images/DefaultLandingImage.png')}>
                    <Text style={styles.title}>{copy.landingUIStrings.TITLE}</Text>
                    <Text style={styles.subTitle}>{copy.landingUIStrings.SUB_TITLE}</Text>
                </ImageBackground>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    scroll: {
        backgroundColor: styleConstants.colors.APP_BACKGROUND,
        paddingHorizontal: '7.5%',
    },
    titleBlock: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: '7.5%',
        height: '90%',
    },
    title: {
        justifyContent: 'center',
        paddingHorizontal: '7.5%',
    },
    subTitle: {
        justifyContent: 'center',
        paddingHorizontal: '7.5%',
    },
});
