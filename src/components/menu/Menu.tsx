import React from 'react';
import { Text, SafeAreaView, ImageBackground, StyleSheet, View, TouchableOpacity } from 'react-native';
import { styleConstants } from '../../config/constants';
import { UserStore } from '../../stores/UserStore';

interface Props {
    userStore: UserStore;
    navigation: any;
}

export default class Menu extends React.Component<Props> {

    render() {
        const { userStore } = this.props;
        console.log(userStore.isAuthenticated);
        return (
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.container}>
                    <View>
                        <View style={styles.profilePhoto} />

                    </View>
                    <View style={styles.menuOptions}>
                        <TouchableOpacity>
                            <Text style={styles.menuOption}>Invite Friends</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text style={styles.menuOption}>Account Settings</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text style={styles.menuOption}>Account History</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text style={styles.menuOption}>Get Social</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text style={styles.menuOption}>About Us</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text style={styles.menuOption}>Need Help?</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text style={styles.menuOption}>Logout</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        height: '100%',
    },
    container: {
        flex: 1,
        paddingHorizontal: '7.5%',
        paddingVertical: '20%',
        height: '100%',
    },
    profilePhoto: {
        width: '50%',
        aspectRatio: 1 / 1,
        backgroundColor: styleConstants.colors.PRIMARY_BUTTON_DISABLED,
        borderRadius: 100,
    },
    menuOptions: {
        paddingVertical: '7.5%',
    },
    menuOption: {
        paddingVertical: '5%',
        color: styleConstants.colors.TITLE_PRIMARY,
        fontWeight: styleConstants.fontWeight.BOLD,
    },
});