import Constants from 'expo-constants';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import React from 'react';
import { ActionSheetIOS, ImageURISource } from 'react-native';
import { TileProps } from 'react-native-elements'; 
import { NavigationStackScreenComponent } from "react-navigation-stack";

import CameraPhotoAddView from './CameraPhotoAddView';
import { LoadingComponent } from '../InitialLoading';

type Params = {
  rehabId: string;
  keyCameraScreen?: string;
  loading?: boolean;
  selectedPhotos?: CameraPhotoAddViewProps['selectedPhotos'];
};

type ScreenProps = {};

type ImageInfo = {
  uri: string;
  width: number;
  height: number;
  type?: 'image' | 'video';
};

export type SelectedPhotos = {
  index: number;
  imageSrc: ImageURISource;
};

export type CameraPhotoAddTileViewProps = TileProps;
export interface CameraPhotoAddViewProps {
  selectedPhotos: Array<SelectedPhotos>;
  onImagePress(index: number): TileProps['onPress'];
};

const CameraPhotoAdd: NavigationStackScreenComponent<Params, ScreenProps> = (props) => {
  const { navigation } = props;

  const [loading, setLoading] = React.useState(false);
  const [selectedPhotos, setSelectedPhotos] = React.useState(Array.from(Array(20)).map((item, index) => {
    return {
      index,
      imageSrc: null,
    }
  }));

  const getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        return false;
      };
      return true
    }
  };

  const updateSelectedPhotos = (index: number, result?: ImageInfo) => {
    const updatedSelectedPhotos = selectedPhotos.map((imageTile, _index) => {
      if (index == _index) {
        return {
          ...imageTile,
          imageSrc: result ? { uri: result.uri } : null
        }
      }
      return imageTile;
    })
    setSelectedPhotos(updatedSelectedPhotos);
    navigation.setParams({ selectedPhotos: updatedSelectedPhotos.filter(photo => photo.imageSrc).map(photo => photo.imageSrc['uri'])})
  };

  const launchCamera = async (index: number) => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });

    if (result.cancelled) return;
    updateSelectedPhotos(index, result);
  };

  const pickImage = async (index: number) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });

    if (result.cancelled) return;
    updateSelectedPhotos(index, result);
  };

  const onImagePress = (index: number) => async () => {
    if (selectedPhotos[index]['imageSrc']) {
      updateSelectedPhotos(index);
      return;
    }
    if (!await getPermissionAsync()) return;
    const options = [
      'Open camera',
      'Select from the gallery',
      'Cancel'
    ];
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex: 2
      },
      async (buttonIndex: number) => {
        if (buttonIndex === 0) {
          await launchCamera(index);
        } else if (buttonIndex === 1) {
          await pickImage(index);
        }
      }
    );
  };

  React.useEffect(() => {
    navigation.setParams({ keyCameraScreen: navigation.state.key });
    return () => {
      // clearPhotos();
    }
  }, []);

  if (loading) {
    return (
      <LoadingComponent />
    );
  };

  return (
    <CameraPhotoAddView 
      selectedPhotos={selectedPhotos}
      onImagePress={onImagePress}
    />
  )
};

export default React.memo(CameraPhotoAdd);