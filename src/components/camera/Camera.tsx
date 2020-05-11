import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { RNCamera } from 'react-native-camera';

interface CameraProps {
  onPictureTaken: (imageBase64: string) => void;
}

interface CameraState {
  data?: {
    base64: string;
  };
}

export default class Camera extends Component<CameraProps, CameraState> {
  constructor(props: CameraProps) {
    super(props);
    this.takePicture = this.takePicture.bind(this);
    this.state = {
      data: null,
    };
  }

  private camera: any = null; // TODO: fix type

  public render() {
    return (
      <View>
        <Text>Camera</Text>
        <RNCamera
          ref={(ref) => (this.camera = ref)}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: "Myapp needs your permission to use your device's camera",
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          androidRecordAudioPermissionOptions={{
            title: 'Permission to use audio recording',
            message:
              "Myapp needs your permission to use your device's microphone",
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
        >
          {({ camera, status, recordAudioPermissionStatus }) => {
            if (status !== 'READY') return null;
            return (
              <View>
                <Text>{this.state.data?.base64}</Text>
                <TouchableOpacity
                  onPress={this.takePicture}
                  testID="take-picture"
                >
                  <Text>Take photo</Text>
                </TouchableOpacity>
              </View>
            );
          }}
        </RNCamera>
      </View>
    );
  }

  private async takePicture() {
    if (this.camera) {
      const options = { quality: 0.5, base64: true, width: 300, height: 300 };
      const data = await this.camera.takePictureAsync(options);

      this.setState({ data });

      this.props.onPictureTaken(data.base64);
    }
  }
}
