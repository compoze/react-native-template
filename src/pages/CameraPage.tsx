import React from 'react';
import { StyleSheet, View, ImageBackground } from 'react-native';
import { styleConstants } from '../config/constants';
import Camera from '../components/camera/Camera';

export class CameraPage extends React.Component {
  public render(): JSX.Element {
    return (
      <ImageBackground
        style={styles.container}
        source={require('../images/DefaultBackground.png')}
      >
        <View style={styles.box}>
          <Camera onPictureTaken={console.log} />
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: '7.5%',
    height: '100%',
  },
  box: {
    backgroundColor: styleConstants.colors.APP_BACKGROUND,
    alignItems: 'center',
    paddingHorizontal: '7.5%',
    paddingVertical: '7.5%',
    width: '100%',
    maxHeight: '90%',
    minHeight: '50%',
    borderColor: styleConstants.colors.INPUT_BACKGROUND_BORDER,
    borderRadius: 25,
    borderWidth: 1,
  },
});
