import React from 'react';
import {
  StyleSheet,
  TextInput,
  TextInputProperties,
  TextStyle,
  View,
  Text,
} from 'react-native';
import { styleConstants } from '../../config/constants';

interface Props extends TextInputProperties {
  title?: string;
}

function getPlaceholderStyle(props: Props): TextStyle {
  return props.value ? {} : styles.placeholderFont;
}

const Input: React.SFC<Props> = ({ style, ...props }) => {
  return (
    <View style={styles.maxWidth}>
      <Text style={styles.title}>{props.title}</Text>
      <TextInput
        {...props}
        style={[styles.input, style, getPlaceholderStyle(props)]}
        placeholder={props.placeholder}
        placeholderTextColor={styleConstants.colors.TOS_BODY_COPY}
        autoCorrect={false}
        spellCheck={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    color: styleConstants.colors.TOS_BODY_COPY,
    backgroundColor: styleConstants.colors.INPUT_BACKGROUND,
    width: '100%',
    height: 50,
    paddingHorizontal: 10,
    borderColor: styleConstants.colors.INPUT_BACKGROUND_BORDER,
    borderRadius: 5,
    borderWidth: 1,
    fontSize: styleConstants.fontSize.LARGE,
  } as TextStyle,
  maxWidth: {
    width: '100%',
  },
  placeholderFont: {
    color: styleConstants.colors.TOS_BODY_COPY,
    fontSize: styleConstants.fontSize.LARGE,
    opacity: 1.0,
  },
  title: {
    color: styleConstants.colors.TITLE_PRIMARY,
    fontSize: styleConstants.fontSize.X_LARGE,
    marginTop: 20,
  },
});

export default Input;
