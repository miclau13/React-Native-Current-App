import { Camera as ExpoCamera } from 'expo-camera';
import * as FileSystem from 'expo-file-system';
import * as Permissions from 'expo-permissions';
import React from 'react';
import { Platform, TouchableOpacityProps } from 'react-native';
import { NavigationStackScreenComponent } from "react-navigation-stack";

import CameraView from './CameraView';
import CameraPhotoGallery, { PHOTOS_DIR } from './CameraPhotoGallery';
import { LoadingComponent } from '../InitialLoading';
import { CreateRehabNoArv, CreateRehabNoArvVariables } from '../../generated/CreateRehabNoArv';

type Params = {
  step: CameraStep;
  keyCameraScreen?: string;
  rehabId?: string;
  selectedPhotos?: string[];
  // From Vacant Screen for normal input flow
  createRehabNoArvInput?: CreateRehabNoArvVariables['input'];
  rehabItemPackageId?: CreateRehabNoArv['createRehabNoArv']['rehabItemPackage']['id'];
};

type ScreenProps = {};

type CameraStep = "camera" | "gallery";

export type TogglePhotoSelection = (uri: string, isSelected: boolean) => void;

export interface CameraProps {
  handleStepNavigation: (step: CameraStep) => void;
  handleReverseCameraIconOnPress: TouchableOpacityProps['onPress'];
};

export interface BottomBarProps {
  handleGalleryIconOnPress: TouchableOpacityProps['onPress'];
  handleReverseCameraIconOnPress: TouchableOpacityProps['onPress'];
  handleTakePictureIconOnPress: TouchableOpacityProps['onPress'];
};

export interface CameraViewProps extends BottomBarProps {
  onCameraReady: ExpoCamera['_onCameraReady'];
  onMountError: (event: { message: string }) => void;
  pictureSize: string;
  setCamera: React.Dispatch<React.SetStateAction<ExpoCamera>>;
  type: React.ReactText;
};

export interface CameraPhotoGalleryProps {
  photos: string[];
  selectedPhotos: string[];
  setSelectedPhotos(selectedPhotos: string[]): void;
  togglePhotoSelection: TogglePhotoSelection;
};

const Camera: NavigationStackScreenComponent<Params, ScreenProps> = (props) => {
  const { navigation } = props;
  const step = navigation.getParam("step", "camera");

  const [camera, setCamera] = React.useState<ExpoCamera>(null);
  const [hasCameraPermission, setHasCameraPermission] = React.useState(false);
  const [photos, setPhotos] = React.useState<string[]>([]);
  const [pictureSize, setPictureSize] = React.useState("");
  const [pictureSizes, setPictureSizes] = React.useState<string[]>([]);
  const [pictureSizeId, setPictureSizeId] = React.useState(0);
  const [ratio, setRatio] = React.useState('16:9');
  const [selectedPhotos, setSelectedPhotos] = React.useState<string[]>([]);
  const [type, setType] = React.useState<React.ReactText>(ExpoCamera.Constants.Type.back);

  // For General
  const handleStepNavigation = React.useCallback<CameraProps['handleStepNavigation']>((step) => {
    navigation.navigate("CameraScreen", { step });
  }, [step]);

  const onPictureSaved = async photo => {
    try {
      await FileSystem.moveAsync({
        from: photo.uri,
        to: `${FileSystem.documentDirectory}photos/${Date.now()}.jpg`,
      });
    } catch (e) {
      console.log({e})
    }
    handleStepNavigation("gallery");
  };

  const boostrapAsync = async () => {
    const status = await askPermission();
    if (status === 'granted') {
      await createFileDirectory();
      setHasCameraPermission(true);
    } else { 
      navigation.goBack();
    };
    navigation.setParams({ keyCameraScreen: navigation.state.key })
  }

  const askPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    return status;
  };
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
  };

  // Clear photos taken in the app when unmount
  const clearPhotos = React.useCallback(async () => {
    const photos = await FileSystem.readDirectoryAsync(PHOTOS_DIR);
    console.log("Camera clearPhotos ", photos)
    if (photos.length > 0) {
      await FileSystem.deleteAsync(PHOTOS_DIR);
    }
  }, []);

  // For Bottom Bar 
  const handleGalleryIconOnPress = React.useCallback<BottomBarProps['handleGalleryIconOnPress']>(async () => {
    handleStepNavigation("gallery");
  }, [handleStepNavigation]);

  const handleReverseCameraIconOnPress = React.useCallback<BottomBarProps['handleReverseCameraIconOnPress']>(() => {
    if (type === ExpoCamera.Constants.Type.back) {
      setType(ExpoCamera.Constants.Type.front);
    } else {
      setType(ExpoCamera.Constants.Type.back);
    }
  }, [type]);

  const handleTakePictureIconOnPress = React.useCallback<BottomBarProps['handleTakePictureIconOnPress']>(async () => {
    if (camera) {
      await camera.takePictureAsync({ onPictureSaved, quality: 0.5 });
    }
  }, [camera]);

  // For Camera View
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
      setPictureSizeId(pictureSizeId);
      setPictureSizes(pictureSizes);
    }
  },[camera]);
  const onMountError = React.useCallback<CameraViewProps['onMountError']>(e => {
    console.error(e.message);
    return null;
  }, []);

  // For CameraPhotoGallery
  const togglePhotoSelection = React.useCallback<CameraPhotoGalleryProps['togglePhotoSelection']>((uri, isSelected) => {
    if (isSelected) {
      setSelectedPhotos([...selectedPhotos, uri]);
    } else {
      setSelectedPhotos(selectedPhotos.filter(item => item !== uri));
    }
  }, [selectedPhotos]);

  React.useEffect(() => {
    boostrapAsync();
    return () => {
      // clearPhotos();
    }
  }, []);

  React.useEffect(() => {
    navigation.setParams({selectedPhotos})
  }, [selectedPhotos]);

  if (!hasCameraPermission) {
    return <LoadingComponent />;
  };
 
  if (step == "gallery") {
    return (
      <CameraPhotoGallery 
        photos={photos}
        selectedPhotos={selectedPhotos}
        setSelectedPhotos={setSelectedPhotos}
        togglePhotoSelection={togglePhotoSelection}
      /> 
    )
  };

  return (
    <CameraView 
      onCameraReady={onCameraReady}
      onMountError={onMountError}
      pictureSize={pictureSize}
      setCamera={setCamera}
      type={type}

      handleGalleryIconOnPress={handleGalleryIconOnPress}
      handleReverseCameraIconOnPress={handleReverseCameraIconOnPress}
      handleTakePictureIconOnPress={handleTakePictureIconOnPress} 
    />
  )
};

export default React.memo(Camera);