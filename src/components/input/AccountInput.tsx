import React from 'react';
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  Text,
} from 'react-native';
import { styleConstants } from '../../config/constants';

interface Props extends TextInputProps {
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
    width: '100%',
    height: 50,
    paddingHorizontal: 10,
    borderBottomColor: styleConstants.colors.INPUT_BACKGROUND_BORDER,
    borderBottomWidth: 1,
    fontSize: styleConstants.fontSize.LARGE,
  } as TextStyle,
  maxWidth: {
    width: '100%',
  },
  placeholderFont: {
    color: styleConstants.colors.TOS_BODY_COPY,
    fontSize: styleConstants.fontSize.SMALL,
    opacity: 1.0,
  },
  title: {
    color: styleConstants.colors.TITLE_PRIMARY,
    fontSize: styleConstants.fontSize.SMALL,
    marginTop: 20,
  },
});

export default Input;
