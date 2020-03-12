import React from 'react';
import { Image } from 'react-native';
import { Header } from 'react-native-elements';
import { styleConstants } from '../../config/constants';


export class AppHeader extends React.Component {

    public render(): JSX.Element {
        return (
            <Header leftComponent={{ icon: 'menu' }}
                containerStyle={{ backgroundColor: styleConstants.colors.FADED_WHITE, }}
                centerComponent={<Image source={require('../../images/DefaultHeaderLogo.png')} />}>
            </Header>
        );
    }
}
