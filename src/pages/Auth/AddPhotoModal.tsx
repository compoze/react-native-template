import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { styleConstants } from '../../config/constants';
import { Icon } from 'react-native-elements';
import { Button } from '../../components/button';

interface Props {
  navigation: any;
  showGooglePhoto: boolean;
  togglePhotoModal(): void;
}

export default class AddPhotoModal extends React.Component<Props> {
  onPressSkip = () => {
    this.props.navigation.push('Login');
    this.props.togglePhotoModal();
  };

  render(): JSX.Element {
    return (
      <View style={styles.container}>
        {this.props.showGooglePhoto ? (
          <View style={styles.googleView}>
            <Text style={styles.header}>Hello, User!</Text>
            <View style={{ height: 150 }} />
            <Text
              style={{ textAlign: 'center', width: '70%', marginBottom: 20 }}
            >
              We're using your Google profile photo for this app
            </Text>
            <Text style={{ textAlign: 'center', marginBottom: 30 }}>
              It'll make things easier when you make your dine-in or pickup
              orders.
            </Text>
            <Button invalid={false} onPress={() => {}} style={{ width: '80%' }}>
              <Text style={{ color: '#ffffff', fontSize: 18 }}>
                Get Started
              </Text>
            </Button>
          </View>
        ) : (
          <View style={styles.emailView}>
            <Text style={styles.header}>Add your picture</Text>
            <Text
              style={{ textAlign: 'center', width: '60%', marginBottom: 20 }}
            >
              Provide a friendly picture as your avatar!
            </Text>
            <Text style={{ textAlign: 'center', marginBottom: 30 }}>
              It'll make things easier when you make your dine-in or pickup
              orders.
            </Text>
            <Icon
              name="account-circle"
              type="material"
              color="#D8DBE1"
              size={120}
            />
            <Button invalid={false} onPress={() => {}} style={{ width: '80%' }}>
              <Text style={{ color: '#ffffff', fontSize: 18 }}>
                Upload photo
              </Text>
            </Button>
            <Text style={styles.linkText} onPress={() => this.onPressSkip()}>
              Skip this step
            </Text>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    height: '80%',
  },
  header: {
    fontFamily: styleConstants.fontFamily.DEFAULT_BOLD,
    fontSize: styleConstants.fontSize.XX_LARGE,
    marginVertical: 30,
  },
  googleView: {
    width: '100%',
    alignItems: 'center',
    paddingTop: 20,
  },
  emailView: {
    width: '100%',
    alignItems: 'center',
  },
  linkText: {
    color: styleConstants.colors.PRIMARY_BUTTON,
    marginLeft: 10,
  },
});
