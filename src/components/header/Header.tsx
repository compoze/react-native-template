import React from 'react';
import { Image } from 'react-native';
import { Header, Icon } from 'react-native-elements';
import { styleConstants } from '../../config/constants';

interface Props {
    toggleSideMenu(): void;
}

export class AppHeader extends React.Component<Props> {

    public render(): JSX.Element {
        return (
            <Header containerStyle={{ backgroundColor: '#FFFFFF', }}>
                <Icon name='menu' onPress={this.props.toggleSideMenu} />
                <Image source={require('../../images/DefaultHeaderLogo.png')} />
                <Icon name='shopping-bag' type='font-awesome' />
            </Header>
        );
    }
}
