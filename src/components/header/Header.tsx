import React from 'react';
import { Image } from 'react-native';
import { Header } from 'react-native-elements';

interface Props {}

export class AppHeader extends React.Component<Props> {
  public render(): JSX.Element {
    return (
      <Header containerStyle={{ backgroundColor: '#FFFFFF' }}>
        <Image source={require('../../images/DefaultHeaderLogo.png')} />
      </Header>
    );
  }
}
