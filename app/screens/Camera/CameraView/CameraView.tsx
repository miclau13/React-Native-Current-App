import { Camera as ExpoCamera } from 'expo-camera';
import LottieView from 'lottie-react-native';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import styles from './styles';
import { BottomBarProps, CameraBottomBarProps, CameraViewProps } from '../Camera';

const BottomBar: React.ComponentType<BottomBarProps> = (props) => {
  const { 
    handleSaveButtonOnPress, 
    isCheckAnimationVisible,
    progress,
  } = props;

  return (
    <View style={styles.BottomBarContainer}>
      {isCheckAnimationVisible ? 
        <View style={styles.animationContainer}>
          <LottieView
            loop={false}
            progress={progress}
            style={{
              width: 100,
              height: 100,
            }}
            source={require('../assets/4964-check-mark-success-animation.json')}
            />
        </View>
        : null
      }
      <Button
        containerStyle={styles.bottomBar}
        icon={
          <Icon
            name="file-download"
            size={55}
            color="white"
          /> 
        }
        onPress={handleSaveButtonOnPress}
        type="clear"
      />
    </View>
  )
};

const CameraBottomBar: React.ComponentType<CameraBottomBarProps> = (props) => {
  const { 
    handleGalleryIconOnPress, 
    handleReverseCameraIconOnPress, 
    handleTakePictureIconOnPress 
  } = props;

  return (
    <View style={styles.cameraBottomBar}>
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
};

const CameraView: React.ComponentType<CameraViewProps> = (props) => {
  const { 
    capturedPhotoUri,
    onCameraReady,
    onMountError, 
    pictureSize,
    setCamera,
    type,

    handleSaveButtonOnPress,
    isCheckAnimationVisible,
    progress,

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
        {capturedPhotoUri ? 
          <BottomBar
            handleSaveButtonOnPress={handleSaveButtonOnPress}
            isCheckAnimationVisible={isCheckAnimationVisible}
            progress={progress}
          /> :
          <CameraBottomBar
            handleGalleryIconOnPress={handleGalleryIconOnPress}
            handleReverseCameraIconOnPress={handleReverseCameraIconOnPress}
            handleTakePictureIconOnPress={handleTakePictureIconOnPress} 
          />
        }
      </ExpoCamera> 
    </View>
  );
}
export default React.memo(CameraView);