import React from 'react';
import {
  View,
  TouchableOpacity,
  TouchableOpacityProperties,
  StyleSheet,
  ViewStyle,
  StyleProp
} from 'react-native';
import { styleConstants } from '../../config/constants';

export interface ButtonProps extends TouchableOpacityProperties {
  contentContainerStyle?: ViewStyle;
  invalid: boolean;
  rounderCorners?: boolean | number;
  leftSideRadius?: boolean | number;
  rightSideRadius?: boolean | number;
  bottomRadius?: boolean | number;
  topRadius?: boolean | number;
  hasShadow?: boolean;
}

const Button: React.SFC<ButtonProps> = ({
  style,
  contentContainerStyle,
  children,
  ...props
  }) => {

  const buttonStyles: StyleProp<ViewStyle>[] = buttonSetup(props);

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
    marginVertical: 50

  },
  invalid: {
    backgroundColor: styleConstants.colors.PRIMARY_BUTTON_DISABLED
  },
  defaultCorner: {
    borderRadius: 2
  },
  shadow: {
    shadowOffset: { width: 0, height: 2 },
    shadowColor: 'black',
    shadowOpacity: 0.14
  },
  leftCorners: {
    borderTopLeftRadius: 2,
    borderBottomLeftRadius: 2,
  },
  rightCorners: {
    borderTopRightRadius: 2,
    borderBottomRightRadius: 2,
  },
  bottomCorners: {
    borderBottomLeftRadius: 2,
    borderBottomRightRadius: 2,
  },
  topCorners: {
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
  },
});


function buttonSetup(props: ButtonProps) {
  const buttonStyles: StyleProp<ViewStyle>[] = [styles.button];
  if (props.invalid) {
    buttonStyles.push(styles.invalid);
  }
  if (props.hasShadow || false) { // Change false if you want the default to use shadows -- Charlie Porth
    buttonStyles.push(styles.shadow);
  }
  if (!!props.rounderCorners || false) { // Change false if you want the default to use rounded Corners -- Charlie Porth
    if (typeof props.rounderCorners === 'number')
      styles.defaultCorner.borderRadius = props.rounderCorners;

    buttonStyles.push(styles.defaultCorner);
  }
  if (!!props.leftSideRadius || false) {
    if (typeof props.leftSideRadius === 'number') {
      styles.leftCorners.borderBottomLeftRadius = props.leftSideRadius;
      styles.leftCorners.borderTopLeftRadius = props.leftSideRadius;
    }

    buttonStyles.push(styles.leftCorners);
  }
  if (!!props.rightSideRadius || false) {
    if (typeof props.rightSideRadius === 'number') {
      styles.rightCorners.borderBottomRightRadius = props.rightSideRadius;
      styles.rightCorners.borderTopRightRadius = props.rightSideRadius;
    }

    buttonStyles.push(styles.rightCorners);
  }
  if (!!props.bottomRadius || false) {
    if (typeof props.bottomRadius === 'number') {
      styles.bottomCorners.borderBottomRightRadius = props.bottomRadius;
      styles.bottomCorners.borderBottomLeftRadius = props.bottomRadius;
    }

    buttonStyles.push(styles.bottomCorners);
  }
  if (!!props.topRadius || false) {
    if (typeof props.topRadius === 'number') {
      styles.topCorners.borderTopLeftRadius = props.topRadius;
      styles.topCorners.borderTopRightRadius = props.topRadius;
    }

    buttonStyles.push(styles.topCorners);
  }
  return buttonStyles;
}