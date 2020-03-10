import React from 'react';
import { View, Image } from 'react-native';

export class Header extends React.Component {

    public render(): JSX.Element {
        return (
            <View>
                <Image source={require('../../images/DefaultHeaderLogo.png')} />
            </View>
        );
    }
}
