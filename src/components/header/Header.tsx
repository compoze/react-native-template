import React from 'react';
import { Image } from 'react-native';
import { Header, Icon } from 'react-native-elements';
import { styleConstants } from '../../config/constants';


export class AppHeader extends React.Component {

    public render(): JSX.Element {
        return (
            <Header containerStyle={{ backgroundColor: styleConstants.colors.FADED_WHITE, }}>
                    <Icon name='menu' />
                    <Image source={require('../../images/DefaultHeaderLogo.png')} />
                    <Icon name='shopping-bag' type='font-awesome' />
            </Header>
        );
    }
}
