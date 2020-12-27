import React from 'react';
import { StyleSheet, View } from 'react-native';
import { UserStore } from '../stores/UserStore';
import { styleConstants } from '../config/constants';

interface Props {
  userStore: UserStore;
}

interface State {}
export class HomePage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {};
  }

  public render(): JSX.Element {
    return <View></View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: '7.5%',
    height: '100%',
  },
  scroll: {
    backgroundColor: styleConstants.colors.APP_BACKGROUND,
    minHeight: '50%',
    maxHeight: '90%',
    width: '80%',
    borderColor: styleConstants.colors.INPUT_BACKGROUND_BORDER,
    borderRadius: 25,
    borderWidth: 1,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: styleConstants.fontSize.XX_LARGE,
    color: styleConstants.colors.TITLE_PRIMARY,
    fontWeight: styleConstants.fontWeight.BOLD,
    width: '100%',
  },
});
