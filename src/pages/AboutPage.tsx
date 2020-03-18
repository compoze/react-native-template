import React from 'react';
import { StyleSheet, Image, View, ImageBackground, Text } from 'react-native';
import { styleConstants } from '../config/constants';
import { copy } from '../config/static.copy';

export class AboutPage extends React.Component {

    public render(): JSX.Element {
        return (
            <ImageBackground style={styles.container} source={require('../images/DefaultBackground.png')}>
                <View style={styles.box}>
                    <Image source={require('../images/AlternateLogo.png')} />
                    <Text style={styles.text}>{copy.aboutPage.ABOUT_TEXT}</Text>
                    <Text style={styles.text}>{copy.aboutPage.CONTACT}</Text>
                </View>
            </ImageBackground>
        );
    }
}

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
