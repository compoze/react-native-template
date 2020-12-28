import React from 'react';
import {
  StyleSheet,
  TextInput,
  TextStyle,
  View,
  Text,
  TextInputProps,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { styleConstants } from '../../config/constants';
import {
  ElkoStyleOptions,
  elkoStylePropsSetup,
} from '../../config/elko.style.options';

interface Props extends TextInputProps, ElkoStyleOptions {
  title?: string;
  value: string;
  autoCorrect?: boolean;
  spellCheck?: boolean;
}

function getPlaceholderStyle(props: Props): TextStyle {
  return props.value ? {} : styles.placeholderFont;
}

const TextWithInput: React.FunctionComponent<Props> = ({ style, ...props }) => {
  const elkoStyles: StyleProp<ViewStyle>[] = elkoStylePropsSetup(props);
  const { autoCorrect = false, spellCheck = false, value } = props;

  return (
    <View style={styles.maxWidth}>
      {value ? (
        <Text style={styles.title}>{props.placeholder}</Text>
      ) : (
        <Text style={{ height: 35 }} />
      )}
      <TextInput
        maxLength={props.maxLength}
        {...props}
        style={[styles.input, style, getPlaceholderStyle(props), ...elkoStyles]}
        placeholder={props.placeholder}
        placeholderTextColor={styleConstants.colors.TOS_BODY_COPY}
        autoCorrect={spellCheck}
        spellCheck={autoCorrect}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    color: styleConstants.colors.BLACK,
    width: '100%',
    height: 50,
    paddingHorizontal: 10,
    borderBottomColor: '#E5E5E5',
    borderBottomWidth: 1,
    fontSize: styleConstants.fontSize.LARGE,
  },
  maxWidth: {
    width: '100%',
  },
  placeholderFont: {
    color: styleConstants.colors.TOS_BODY_COPY,
    fontSize: styleConstants.fontSize.MEDIUM,
    opacity: 1.0,
  },
  title: {
    color: styleConstants.colors.BLACK,
    fontSize: styleConstants.fontSize.SMALL,
    fontFamily: styleConstants.fontFamily.DEFAULT_BOLD,
    marginTop: 20,
    marginLeft: 10,
  },
  invalid: {
    backgroundColor: styleConstants.colors.ERROR,
  },
});

export default TextWithInput;
