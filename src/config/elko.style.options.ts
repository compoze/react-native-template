import { styleConstants } from './constants';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
export interface ElkoStyleOptions {
  disabledButton?: boolean;
  invalidError?: boolean;
  invalidButton?: boolean;
  invalidErrorBorder?: boolean;
  rounderCorners?: boolean | number;
  leftSideRadius?: boolean | number;
  rightSideRadius?: boolean | number;
  bottomRadius?: boolean | number;
  topRadius?: boolean | number;
  hasShadow?: boolean;
}
export const stylesOptions = StyleSheet.create({
  invalidError: {
    backgroundColor: styleConstants.colors.ERROR,
  },
  //This is good for text inputs and the likes
  invalidErrorBorder: {
    borderColor: styleConstants.colors.ERROR,
  },
  disabledButton: {
    backgroundColor: styleConstants.colors.PRIMARY_BUTTON_DISABLED,
  },
  defaultCorner: {
    borderRadius: styleConstants.other.defaultCornerRadius,
  },
  shadow: {
    shadowOffset: { width: 0, height: 2 },
    shadowColor: 'black',
    shadowOpacity: 0.14,
  },
  leftCorners: {
    borderTopLeftRadius: styleConstants.other.defaultCornerRadius,
    borderBottomLeftRadius: styleConstants.other.defaultCornerRadius,
  },
  rightCorners: {
    borderTopRightRadius: styleConstants.other.defaultCornerRadius,
    borderBottomRightRadius: styleConstants.other.defaultCornerRadius,
  },
  bottomCorners: {
    borderBottomLeftRadius: styleConstants.other.defaultCornerRadius,
    borderBottomRightRadius: styleConstants.other.defaultCornerRadius,
  },
  topCorners: {
    borderTopLeftRadius: styleConstants.other.defaultCornerRadius,
    borderTopRightRadius: styleConstants.other.defaultCornerRadius,
  },
});

export function elkoStylePropsSetup(
  props: ElkoStyleOptions
): StyleProp<ViewStyle>[] {
  const styles: StyleProp<ViewStyle>[] = [];
  if (!!props.invalidError || !!props.invalidButton) {
    styles.push(stylesOptions.invalidError);
  }
  if (!!props.invalidErrorBorder) {
    styles.push(stylesOptions.invalidErrorBorder);
  }
  if (!!props.disabledButton) {
    styles.push(stylesOptions.disabledButton);
  }
  if (!!props.hasShadow) {
    // Change false if you want the default to use shadows -- Charlie Porth
    styles.push(stylesOptions.shadow);
  }
  if (!!props.rounderCorners) {
    // Change false if you want the default to use rounded Corners -- Charlie Porth
    if (typeof props.rounderCorners === 'number')
      stylesOptions.defaultCorner.borderRadius = props.rounderCorners;

    styles.push(stylesOptions.defaultCorner);
  }
  if (!!props.leftSideRadius) {
    if (typeof props.leftSideRadius === 'number') {
      stylesOptions.leftCorners.borderBottomLeftRadius = props.leftSideRadius;
      stylesOptions.leftCorners.borderTopLeftRadius = props.leftSideRadius;
    }

    styles.push(stylesOptions.leftCorners);
  }
  if (!!props.rightSideRadius) {
    if (typeof props.rightSideRadius === 'number') {
      stylesOptions.rightCorners.borderBottomRightRadius =
        props.rightSideRadius;
      stylesOptions.rightCorners.borderTopRightRadius = props.rightSideRadius;
    }

    styles.push(stylesOptions.rightCorners);
  }
  if (!!props.bottomRadius) {
    if (typeof props.bottomRadius === 'number') {
      stylesOptions.bottomCorners.borderBottomRightRadius = props.bottomRadius;
      stylesOptions.bottomCorners.borderBottomLeftRadius = props.bottomRadius;
    }

    styles.push(stylesOptions.bottomCorners);
  }
  if (!!props.topRadius) {
    if (typeof props.topRadius === 'number') {
      stylesOptions.topCorners.borderTopLeftRadius = props.topRadius;
      stylesOptions.topCorners.borderTopRightRadius = props.topRadius;
    }

    styles.push(stylesOptions.topCorners);
  }
  return styles;
}
