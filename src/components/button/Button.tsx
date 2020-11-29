import React from 'react';
import {
  View,
  TouchableOpacity,
  TouchableOpacityProperties,
  StyleSheet,
  ViewStyle,
  StyleProp,
} from 'react-native';
import { styleConstants } from '../../config/constants';

export interface ButtonProps extends TouchableOpacityProperties {
  contentContainerStyle?: ViewStyle;
  invalid: boolean;
  rounderCorners?:boolean | number;
  hasShadow?: boolean;
}
const defaultRoundedCornerRadius = 2;
const Button: React.SFC<ButtonProps> = ({
  style,
  contentContainerStyle,
  children,
  ...props
}) => {
  const buttonStyles: StyleProp<ViewStyle>[] = [styles.button];
  if (props.invalid) {
    buttonStyles.push(styles.invalid);
  }
  if (props.hasShadow || false) { // Change false if you want the default to use shadows -- Charlie Porth
    buttonStyles.push(styles.shadow);
  }
  if (!!props.rounderCorners || false) { // Change false if you want the default to use roundered Corners -- Charlie Porth
    if (typeof props.rounderCorners === 'number')
      styles.defaultCorner.borderRadius = props.rounderCorners;

    buttonStyles.push(styles.defaultCorner);
  }

  return (
    <TouchableOpacity {...props} style={[...buttonStyles, style]}>
      <View style={contentContainerStyle}>{children}</View>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: 50,
    backgroundColor: styleConstants.colors.PRIMARY_BUTTON,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 50,

  },
  invalid: {
    backgroundColor: styleConstants.colors.PRIMARY_BUTTON_DISABLED,
  },
  defaultCorner: {
    borderRadius: defaultRoundedCornerRadius,
  },
  shadow: {
    shadowOffset: { width: 0, height: 2 },
    shadowColor: 'black',
    shadowOpacity: 0.14,
  }
});
