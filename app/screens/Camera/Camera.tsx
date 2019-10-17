import { Camera as ExpoCamera } from 'expo-camera';
import * as FileSystem from 'expo-file-system';
import * as Permissions from 'expo-permissions';
import React from 'react';
import { Platform, View, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { NavigationStackScreenComponent } from "react-navigation-stack";
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';

import styles from './styles';
import CameraPhotoGallery from '../CameraPhotoGallery';

type Params = {
};

type ScreenProps = {};

export interface CameraProps {
  
};

interface BottomBarProps {
  takePicture: TouchableOpacityProps['onPress'];
  toggleView: TouchableOpacityProps['onPress'];
}

const BottomBar: React.ComponentType<BottomBarProps> = (props) => {
  const { takePicture, toggleView } = props;
  return (
    <View style={styles.bottomBar}>
      <View style={styles.viewBox1} />
      <TouchableOpacity onPress={takePicture} style={styles.takePhoto}>
        <AwesomeIcon name="dot-circle-o" size={70} color="white" />
      </TouchableOpacity>
      <View style={styles.viewBox2} />
      <TouchableOpacity style={styles.gallery} onPress={toggleView}>
        <View>
          <AwesomeIcon name="photo" size={40} color="white" />
        </View>
      </TouchableOpacity>
    </View>
  )
}

const Camera: NavigationStackScreenComponent<Params, ScreenProps> = (props) => {

  const [camera, setCamera] = React.useState<ExpoCamera>(null);
  const [hasCameraPermission, setHasCameraPermission] = React.useState(false);
  const [newPhotos, setNewPhotos] = React.useState(false);
  const [pictureSize, setPictureSize] = React.useState("");
  const [pictureSizes, setPictureSizes] = React.useState<string[]>([]);
  const [pictureSizeId, setPictureSizeId] = React.useState(0);
  const [ratio, setRatio] = React.useState('16:9');
  const [showGallery, setShowGallery] = React.useState(false);
  const [type, setType] = React.useState<React.ReactText>(ExpoCamera.Constants.Type.back);

  const askPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    setHasCameraPermission(status === 'granted');
  };

  const collectPictureSizes = React.useCallback(async () => {
    if (camera) {
      const pictureSizes = await camera.getAvailablePictureSizesAsync(ratio);
      let pictureSizeId = 0;
      if (Platform.OS === 'ios') {
        pictureSizeId = pictureSizes.indexOf('High');
      } else {
        // returned array is sorted in ascending order - default size is the largest one
        pictureSizeId = pictureSizes.length-1;
      };
      setPictureSize(pictureSizes[pictureSizeId]);
      setPictureSizeId(pictureSizeId);
      setPictureSizes(pictureSizes);
    }
  },[camera]);

  // Create file directory when mount
  const createFileDirectory = async () => {
    try {
      await FileSystem.makeDirectoryAsync(
        `${FileSystem.documentDirectory}photos`,
        {
          intermediates: true,
        }
      )
    } catch (e) {
      console.log(e)
    }
  }  
  const handleMountError = React.useCallback(({ message }) => console.error(message), []);

  const onPictureSaved = async photo => {
    console.log("onPictureSaved photo", photo)
    console.log(`${FileSystem.documentDirectory}photos/${Date.now()}.jpg`)
    try {
      await FileSystem.moveAsync({
        from: photo.uri,
        to: `${FileSystem.documentDirectory}photos/${Date.now()}.jpg`,
      });
    } catch (e) {
      console.log({e})
    }
    setNewPhotos(true);
  }

  const takePicture = React.useCallback<TouchableOpacityProps['onPress']>(() => {
    console.log("takePicture")
    if (camera) {
      camera.takePictureAsync({ onPictureSaved });
    }
  }, [camera]);

  const toggleView = React.useCallback<TouchableOpacityProps['onPress']>(() => {
    setNewPhotos(false);
    setShowGallery(!showGallery);
  }, [newPhotos, showGallery]);

  React.useEffect(() => {
    console.log("Camera Mount");
    askPermission();
    createFileDirectory();
    return () => {console.log("Camera UnMount")}
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {showGallery ? <CameraPhotoGallery toggleView={toggleView} /> :
        <ExpoCamera
          onCameraReady={collectPictureSizes}
          onMountError={handleMountError}
          pictureSize={pictureSize}
          ref={ref => setCamera(ref)}
          style={styles.camera}
          type={type}
        >
          <BottomBar 
            takePicture={takePicture} 
            toggleView={toggleView}
          />
        </ExpoCamera>
      }
    </View>
  )
};

export default React.memo(Camera);