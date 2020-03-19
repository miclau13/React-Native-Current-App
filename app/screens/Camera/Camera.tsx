import { Camera as ExpoCamera } from 'expo-camera';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import React from 'react';
import { Platform, TouchableOpacityProps } from 'react-native';
import { NavigationStackScreenComponent } from "react-navigation-stack";

import CameraView from './CameraView';
import CameraPhotoGallery, { PHOTOS_DIR } from './CameraPhotoGallery';
import { LoadingComponent } from '../InitialLoading';

type Params = {
  step: CameraStep;
  selectedPhotos?: string[];
};

type ScreenProps = {};

type CameraStep = "camera" | "gallery";

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
    // handleStepNavigation("gallery");
  };

  const boostrapAsync = async () => {
    const status = await askPermission();
    if (status === 'granted') {
      await createFileDirectory();
      setHasCameraPermission(true);
    } else { 
      navigation.goBack();
    };
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
    console.log('Camera createFileDirectory')
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
    // const { status: cameraPermission } = await Permissions.askAsync(Permissions.CAMERA);
    // const { status: cameraRollPermission } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    // console.log("cameraPermission",cameraPermission)
    // console.log("cameraRollPermission",cameraRollPermission)
    
    // return status;
    // await ImagePicker.requestCameraPermissionsAsync();
    // let image = await ImagePicker.launchCameraAsync().catch(error => console.log({ error }));
    // console.log(image);
    // let result = await ImagePicker.launchImageLibraryAsync({
    //   allowsEditing: true,
    //   aspect: [4, 3],
    //   mediaTypes: ImagePicker.MediaTypeOptions.Images,
    //   // TODO change quality depening on the file size
    //   quality: 1,
    // });
    // console.log(result);
    // if (!result.cancelled) {
    //   setPhonePhotos([...phonePhotos, result.uri]);
    // };
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
      // console.log("onCameraReady pictureSizes[pictureSizeId",pictureSizes[pictureSizeId]);
      // console.log("onCameraReady pictureSizes",pictureSizes);
      // console.log("onCameraReady pictureSizeId",pictureSizeId);
      setPictureSize(pictureSizes[pictureSizeId]);
      setPictureSizeId(pictureSizeId);
      setPictureSizes(pictureSizes);
    }
  },[camera]);
  const onMountError = React.useCallback<CameraViewProps['onMountError']>(e => {
    console.error(e.message);
    return null;
  }, []);

  // console.log('Camera step',step)
  // console.log('Camera hasCameraPermission',hasCameraPermission)
  // console.log('Camera camera',camera)

  React.useEffect(() => {
    // console.log('Camera useEffect before boostrapAsync hasCameraPermission', hasCameraPermission)
    boostrapAsync();
    // console.log('Camera useEffect after boostrapAsync hasCameraPermission', hasCameraPermission)
    // createFileDirectory();
    // console.log('Camera useEffect after askPermission createFileDirectory', hasCameraPermission)
    return () => {
      // clearPhotos();
    }
  }, []);

  React.useEffect(() => {
    navigation.setParams({selectedPhotos})
  },[selectedPhotos]);

  if (!hasCameraPermission) {
    return <LoadingComponent />;
  };

  if (step == "gallery") {
    return (
      <CameraPhotoGallery 
        photos={photos}
        selectedPhotos={selectedPhotos}
        setSelectedPhotos={setSelectedPhotos}
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