import React from 'react';
import { View, TouchableOpacity, TouchableOpacityProperties, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { styleConstants } from '../../config/constants';

export interface ButtonProps extends TouchableOpacityProperties {
    contentContainerStyle?: ViewStyle;
    invalid: boolean;
}

const UpdateAccountButton: React.SFC<ButtonProps> = ({ style, contentContainerStyle, children, ...props }) => {
    const buttonStyles: StyleProp<ViewStyle>[] = [styles.button];
    if(props.invalid) {
        buttonStyles.push(styles.invalid);
    }
    return (
        <TouchableOpacity {...props} style={[...buttonStyles, style]}>
            <View style={contentContainerStyle}>{children}</View>
        </TouchableOpacity>
    );
};

export default UpdateAccountButton;

const styles = StyleSheet.create({
    button: {
        width: '100%',
        height: 50,
        backgroundColor: styleConstants.colors.FADED_WHITE,
        color: styleConstants.colors.PRIMARY,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 50,
        borderColor: styleConstants.colors.PRIMARY,
        borderRadius: 15,
        borderWidth: 1,
        shadowOffset: { width: 0, height: 2 },
        shadowColor: 'black',
        shadowOpacity: 0.14
    },
    invalid: {
        backgroundColor: styleConstants.colors.PRIMARY_BUTTON_DISABLED,
    }
});
