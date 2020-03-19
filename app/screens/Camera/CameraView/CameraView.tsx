import { Camera as ExpoCamera } from 'expo-camera';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import styles from './styles';
import { BottomBarProps, CameraViewProps } from '../Camera';

const BottomBar: React.ComponentType<BottomBarProps> = (props) => {
  const { handleGalleryIconOnPress, handleReverseCameraIconOnPress, handleTakePictureIconOnPress } = props;

  return (
    <View style={styles.bottomBar}>
      <TouchableOpacity onPress={handleGalleryIconOnPress} style={styles.deviceGalleryIcon}>
        <MaterialIcon name="photo-library" size={45} color="white" />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleTakePictureIconOnPress} style={styles.takePhotoIcon}>
        <AwesomeIcon name="dot-circle-o" size={70} color="white" />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleReverseCameraIconOnPress} style={styles.galleryIcon}>
        <Ionicons name="ios-reverse-camera" size={50} color="white" />
      </TouchableOpacity> 
    </View>
  )
}

const CameraView: React.ComponentType<CameraViewProps> = (props) => {
  const { 
    onCameraReady,
    onMountError, 
    pictureSize,
    setCamera,
    type,

    handleGalleryIconOnPress, 
    handleReverseCameraIconOnPress, 
    handleTakePictureIconOnPress
  } = props; 
  
  return (
    <View style={{ flex: 1 }}>   
      <ExpoCamera
        onCameraReady={onCameraReady}
        onMountError={onMountError}
        pictureSize={pictureSize}
        ref={ref => setCamera(ref)}
        style={styles.camera}
        type={type}
      >
        <BottomBar
          handleGalleryIconOnPress={handleGalleryIconOnPress}
          handleReverseCameraIconOnPress={handleReverseCameraIconOnPress}
          handleTakePictureIconOnPress={handleTakePictureIconOnPress} 
        />
      </ExpoCamera> 
    </View>
  );
}
export default React.memo(CameraView);