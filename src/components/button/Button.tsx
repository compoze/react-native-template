import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  StyleProp,
  TouchableOpacityProps,
} from 'react-native';
import { styleConstants } from '../../config/constants';
import {
  elkoStylePropsSetup,
  ElkoStyleOptions,
} from '../../config/default.style.options';

export interface ButtonProps extends TouchableOpacityProps, ElkoStyleOptions {
  contentContainerStyle?: ViewStyle;
  invalid: boolean;
}

const Button: React.FunctionComponent<ButtonProps> = ({
  style,
  contentContainerStyle,
  children,
  ...props
}) => {
  const buttonStyles: StyleProp<ViewStyle>[] = elkoStylePropsSetup(props);

  return (
    <TouchableOpacity
      {...props}
      style={[...buttonStyles, !style ? styles : style]}
    >
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
});
