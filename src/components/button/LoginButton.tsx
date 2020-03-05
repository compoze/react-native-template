import React from 'react';
import { View, TouchableOpacity, TouchableOpacityProperties, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { styleConstants } from '../../config/constants';

export interface ButtonProps extends TouchableOpacityProperties {
    contentContainerStyle?: ViewStyle;
    disabled: boolean;
}

const LoginButton: React.SFC<ButtonProps> = ({ style, contentContainerStyle, children, ...props }) => {
    const buttonStyles: StyleProp<ViewStyle>[] = [styles.button];
    if(props.disabled) {
        buttonStyles.push(styles.disabled);
    }
    return (
        <TouchableOpacity {...props} style={[...buttonStyles, style]}>
            <View style={contentContainerStyle}>{children}</View>
        </TouchableOpacity>
    );
};

export default LoginButton;

const styles = StyleSheet.create({
    button: {
        width: '100%',
        height: 50,
        backgroundColor: styleConstants.colors.PRIMARY_BUTTON,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 'auto',
        borderRadius: 2,
        shadowOffset: { width: 0, height: 2 },
        shadowColor: 'black',
        shadowOpacity: 0.14
    },
    disabled: {
        backgroundColor: styleConstants.colors.PRIMARY_BUTTON_DISABLED,
    }
});
