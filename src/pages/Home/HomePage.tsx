import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { styleConstants } from '../../config/constants';

interface Props {
  navigation: any;
}
interface State {}

export class HomePage extends React.Component<Props, State> {
  public render(): JSX.Element {
    return (
      <View style={styles.container}>
        <Text>Welcome</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    backgroundColor: styleConstants.colors.APP_BACKGROUND,
  },
});
