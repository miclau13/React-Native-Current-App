import { Camera as ExpoCamera } from 'expo-camera';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import React from 'react';
import { Platform, View, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { Banner, BannerAction, Text } from 'react-native-paper';
import { NavigationStackScreenComponent } from "react-navigation-stack";
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import styles from './styles';
import { BathroomRemodelFormValues } from '../BathroomRemodelForm';
import CameraPhotoGallery, { PHOTOS_DIR } from '../CameraPhotoGallery';

type CameraStep = "camera" | "gallery";

type Params = {
  step: CameraStep;
  formValues?: BathroomRemodelFormValues;
  previousStep?: CameraStep;
  selectedPhotos?: string[];
};

type ScreenProps = {};

export interface CameraProps {
  handleStepNavigation: (step: CameraStep) => void;
  handleReverseCamera: TouchableOpacityProps['onPress'];
};

const cameraPreviousStepMap = {
  "camera": "home",
  "gallery": "camera",
};

export const getPreviousStep = (currentStep: CameraStep) => {
  return cameraPreviousStepMap[currentStep];
};

interface BottomBarProps {
  handleReverseCamera: CameraProps['handleReverseCamera'];
  handleStepNavigation: CameraProps['handleStepNavigation'];
  takePicture: TouchableOpacityProps['onPress'];
  pickImage: TouchableOpacityProps['onPress'];
};

const BottomBar: React.ComponentType<BottomBarProps> = (props) => {
  const { handleReverseCamera, handleStepNavigation, takePicture } = props;

  const handlGalleryOnPress = React.useCallback<TouchableOpacityProps['onPress']>(() => {
    handleStepNavigation("gallery");
  }, [handleStepNavigation]);

  return (
    <View style={styles.bottomBar}>
      <View style={styles.viewBox1} />
      <TouchableOpacity onPress={handlGalleryOnPress} style={styles.deviceGallery}>
        <MaterialIcon name="photo-library" size={40} color="white" />
      </TouchableOpacity>
      <View style={styles.viewBox2} />
      <TouchableOpacity onPress={takePicture} style={styles.takePhoto}>
        <AwesomeIcon name="dot-circle-o" size={70} color="white" />
      </TouchableOpacity>
      <View style={styles.viewBox3} />
      <TouchableOpacity onPress={handleReverseCamera} style={styles.gallery}>
        <Ionicons name="ios-reverse-camera" size={50} color="white" />
      </TouchableOpacity>
    </View>
  )
}

const Camera: NavigationStackScreenComponent<Params, ScreenProps> = (props) => {

  const { navigation } = props;
  const step = navigation.getParam("step", "camera");
  const formValues = navigation.getParam("formValues", null);

  const [camera, setCamera] = React.useState<ExpoCamera>(null);
  const [hasBanner, setHasBanner] = React.useState(true);
  const [hasCameraPermission, setHasCameraPermission] = React.useState(false);
  const [phonePhotos, setPhonePhotos] = React.useState<string[]>([]);
  const [pictureSize, setPictureSize] = React.useState("");
  const [pictureSizes, setPictureSizes] = React.useState<string[]>([]);
  const [pictureSizeId, setPictureSizeId] = React.useState(0);
  const [ratio, setRatio] = React.useState('16:9');
  const [selectedPhotos, setSelectedPhotos] = React.useState<string[]>([]);
  const [type, setType] = React.useState<React.ReactText>(ExpoCamera.Constants.Type.back);

  const askPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    setHasCameraPermission(status === 'granted');
  };

  // Clear photos taken in the app when unmount
  const clearPhotos = React.useCallback(async () => {
    const photos = await FileSystem.readDirectoryAsync(PHOTOS_DIR);
    console.log("Camera clearPhotos ", photos)
    if (photos.length > 0) {
      await FileSystem.deleteAsync(PHOTOS_DIR);
    }
  }, []);

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
  };

  const handleBannerButtonOnClick = React.useCallback<BannerAction['onPress']>(() => setHasBanner(false), []);

  const handleMountError = React.useCallback(({ message }) => console.error(message), []);

  const handleStepNavigation = React.useCallback<CameraProps['handleStepNavigation']>((step) => {
    navigation.navigate("CameraScreen", { step, previousStep: getPreviousStep(step) });
  }, [step]);

  const handleReverseCamera = React.useCallback<TouchableOpacityProps['onPress']>(() => {
    if (type === ExpoCamera.Constants.Type.back) {
      setType(ExpoCamera.Constants.Type.front);
    } else {
      setType(ExpoCamera.Constants.Type.back);
    }
  }, [type]);

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

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      // TODO change quality depening on the file size
      quality: 1,
    });

    if (!result.cancelled) {
      setPhonePhotos([...phonePhotos, result.uri]);
    };
  };

  const takePicture = React.useCallback<TouchableOpacityProps['onPress']>(async () => {
    if (camera) {
      await camera.takePictureAsync({ onPictureSaved });
    }
  }, [camera]);

  React.useEffect(() => {
    console.log("Camera Mount");
    askPermission();
    createFileDirectory();
    return () => {
      clearPhotos();
      console.log("Camera UnMount");
    }
  }, []);

  React.useEffect(() => {
    navigation.setParams({selectedPhotos})
  },[selectedPhotos])

  return (
    <View style={{ flex: 1 }}>
      <Banner 
        actions={[
          {
            color: "white",
            label: 'Close',
            onPress: handleBannerButtonOnClick,
          },
        ]}
        image={({size}) => <MaterialIcon name="photo-camera" size={size} color="white" />}
        style={{ backgroundColor: '#F5B041'}}
        visible={hasBanner && step === "camera"}
        >
        <Text style={{ color: "white" }}>To improve the accuracy of the pricing, please upload more photos.</Text>
      </Banner>  
      {step === "camera" ?    
        <ExpoCamera
          onCameraReady={collectPictureSizes}
          onMountError={handleMountError}
          pictureSize={pictureSize}
          ref={ref => setCamera(ref)}
          style={styles.camera}
          type={type}
        >
          <BottomBar
            handleReverseCamera={handleReverseCamera}
            handleStepNavigation={handleStepNavigation}
            pickImage={pickImage}
            takePicture={takePicture} 
          />
        </ExpoCamera> 
        : null
      }
      {step === "gallery" ?  
        <CameraPhotoGallery 
          handleStepNavigation={handleStepNavigation}
          phonePhotos={phonePhotos}
          selected={selectedPhotos}
          setSelected={setSelectedPhotos}
        /> 
        : null
      }
    </View>
  )
};

export default React.memo(Camera);