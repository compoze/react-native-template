import React from 'react';
import { StyleSheet, Image, View, ImageBackground, Text } from 'react-native';
import { styleConstants } from '../config/constants';

export class AboutPage extends React.Component {

    public render(): JSX.Element {
        return (
            <ImageBackground style={styles.container} source={require('../images/DefaultBackground.png')}>
                <View style={styles.box}>
                    <Image source={require('../images/AlternateLogo.png')} />
                    <Text style={styles.text}>{aboutUiString.ABOUT_TEXT}</Text>
                    <Text style={styles.text}>{aboutUiString.CONTACT}</Text>
                </View>
            </ImageBackground>
        );
    }
}

const aboutUiString = {
    ABOUT_TEXT: 'We are a group of enterprise developers with decades of combined experience in the custom software development industry. We banded together after seeing the lack of software development solutions available to the tech community. Your ideas are good ones—we are here to help make them a reality.',
    CONTACT: 'Want to learn more?\nconnect@elko.dev\nwww.elko.dev'
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: '7.5%',
        height: '100%',
    },
    box: {
        backgroundColor: styleConstants.colors.APP_BACKGROUND,
        alignItems: 'center',
        paddingHorizontal: '7.5%',
        paddingVertical: '7.5%',
        width: '100%',
        maxHeight: '90%',
        minHeight: '50%',
        borderColor: styleConstants.colors.INPUT_BACKGROUND_BORDER,
        borderRadius: 25,
        borderWidth: 1,
    },
    text: {
        width: '100%',
        alignItems:'flex-start',
        color: styleConstants.colors.TEXT_PRIMARY,
        paddingVertical: '7.5%',
        fontSize: styleConstants.fontSize.MEDIUM,
    },
});
