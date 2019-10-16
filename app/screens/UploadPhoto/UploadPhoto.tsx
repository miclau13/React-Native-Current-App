import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera'
import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { NavigationStackScreenComponent } from "react-navigation-stack";

import styles from './styles';

type Params = {
};

type ScreenProps = {};

export interface UploadPhotoFormProps {
}

const UploadPhotoForm: NavigationStackScreenComponent<Params, ScreenProps> = (props) => {
  const [hasCameraPermission, setHasCameraPermission] = React.useState(false);
  const [type, setType] = React.useState<React.ReactText>(Camera.Constants.Type.back);

  const askPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    setHasCameraPermission(status === 'granted');
  }

  React.useEffect(() => {
    console.log("UploadPhotoForm Mount");
    askPermission();
    return () => {console.log("UploadPhotoForm UnMount")}
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Camera style={{ flex: 1 }} type={type}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            style={{
              flex: 0.1,
              alignSelf: 'flex-end',
              alignItems: 'center',
            }}
            onPress={() => {
              setType(type === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back)
            }}>
            <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Flip </Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  )
};

export default React.memo(UploadPhotoForm);