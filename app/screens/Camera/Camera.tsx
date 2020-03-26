import { Camera as ExpoCamera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import React from 'react';
import { Animated, Easing, Platform, TouchableOpacityProps } from 'react-native';
import { ButtonProps } from 'react-native-elements';
import { NavigationStackScreenComponent } from "react-navigation-stack";

import CameraView from './CameraView';
import { CreateRehabNoArv, CreateRehabNoArvVariables } from '../../generated/CreateRehabNoArv';

type Params = {
  capturedPhotoUri?: string;
  keyCameraScreen?: string;
  rehabId?: string;
  // From Vacant Screen for normal input flow
  createRehabNoArvInput?: CreateRehabNoArvVariables['input'];
  rehabItemPackageId?: CreateRehabNoArv['createRehabNoArv']['rehabItemPackage']['id'];
};

type ScreenProps = {};

export interface BottomBarProps {
  progress: Animated.Value;
  isCheckAnimationVisible: boolean;
  handleSaveButtonOnPress: ButtonProps['onPress'];
};

export interface CameraBottomBarProps {
  handleGalleryIconOnPress: TouchableOpacityProps['onPress'];
  handleReverseCameraIconOnPress: TouchableOpacityProps['onPress'];
  handleTakePictureIconOnPress: TouchableOpacityProps['onPress'];
};

export interface CameraViewProps extends BottomBarProps, CameraBottomBarProps {
  capturedPhotoUri: string;
  onCameraReady: ExpoCamera['_onCameraReady'];
  onMountError: (event: { message: string }) => void;
  pictureSize: string;
  setCamera: React.Dispatch<React.SetStateAction<ExpoCamera>>;
  type: React.ReactText;
};

const Camera: NavigationStackScreenComponent<Params, ScreenProps> = (props) => {
  const { navigation } = props;
  const rehabId = navigation.getParam("rehabId");

  // From Vacant Screen for normal input flow
  const createRehabNoArvInput = navigation.getParam("createRehabNoArvInput", null);
  const rehabItemPackageId = navigation.getParam("rehabItemPackageId", "");

  const [camera, setCamera] = React.useState<ExpoCamera>(null);
  const [isCheckAnimationVisible, setIsCheckAnimationVisible] = React.useState(true)
  const [progress] = React.useState(new Animated.Value(0));

  const [capturedPhotoUri, setCapturedPhotoUri] = React.useState("");
  const [pictureSize, setPictureSize] = React.useState("");
  const [ratio] = React.useState('16:9');
  const [type, setType] = React.useState<React.ReactText>(ExpoCamera.Constants.Type.back);

  // For General
  const moveToGallery = React.useCallback(() => {
    navigation.navigate("CameraPhotoGalleryScreen", { rehabId, rehabItemPackageId, createRehabNoArvInput });
  }, [navigation.navigate]);

  const boostrapAsync = async () => {
    navigation.setParams({ keyCameraScreen: navigation.state.key });
  };

  // For Bottom Bar 
  const handleSaveButtonOnPress = React.useCallback<BottomBarProps['handleSaveButtonOnPress']>(async () => {
    await MediaLibrary.createAssetAsync(capturedPhotoUri);
    Animated.timing(progress, {
      toValue: 1,
      duration: 2000,
      easing: Easing.linear,
    }).start(() => {
      setIsCheckAnimationVisible(false);
    })
  }, [capturedPhotoUri, isCheckAnimationVisible, progress]);

  // For Camera Bottom Bar 
  const handleGalleryIconOnPress = React.useCallback<CameraBottomBarProps['handleGalleryIconOnPress']>(async () => {
    moveToGallery();
  }, [moveToGallery]);

  const handleReverseCameraIconOnPress = React.useCallback<CameraBottomBarProps['handleReverseCameraIconOnPress']>(() => {
    if (type === ExpoCamera.Constants.Type.back) {
      setType(ExpoCamera.Constants.Type.front);
    } else {
      setType(ExpoCamera.Constants.Type.back);
    }
  }, [type]);

  const handleTakePictureIconOnPress = React.useCallback<CameraBottomBarProps['handleTakePictureIconOnPress']>(async () => {
    if (camera) {
      await camera.takePictureAsync({ onPictureSaved, quality: 0.1 });
    };
  }, [camera]);

  // For CameraView
  const onPictureSaved = async photo => {
    camera.pausePreview();
    setCapturedPhotoUri(photo.uri);
    navigation.setParams({ capturedPhotoUri: photo.uri})
  };

  const onCameraReady = React.useCallback<CameraViewProps['onCameraReady']>(async () => {
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
    }
  },[camera]);
  const onMountError = React.useCallback<CameraViewProps['onMountError']>(e => {
    console.error(e.message);
    return null;
  }, []);

  React.useEffect(() => {
    boostrapAsync();
    return () => {
    }
  }, []);

  React.useEffect(() => {
    if (!isCheckAnimationVisible && !!progress){
      setIsCheckAnimationVisible(true);
      progress.setValue(0);
    }
  }, [isCheckAnimationVisible, progress]);

  return (
    <CameraView 
      capturedPhotoUri={capturedPhotoUri}
      onCameraReady={onCameraReady}
      onMountError={onMountError}
      pictureSize={pictureSize}
      setCamera={setCamera}
      type={type}

      handleSaveButtonOnPress={handleSaveButtonOnPress}
      isCheckAnimationVisible={isCheckAnimationVisible}
      progress={progress}

      handleGalleryIconOnPress={handleGalleryIconOnPress}
      handleReverseCameraIconOnPress={handleReverseCameraIconOnPress}
      handleTakePictureIconOnPress={handleTakePictureIconOnPress} 
    />
  )
};

export default React.memo(Camera);