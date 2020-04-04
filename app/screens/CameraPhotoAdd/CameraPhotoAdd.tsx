import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import React from 'react';
import { ImageURISource } from 'react-native';
import { IconProps, TileProps } from 'react-native-elements'; 
import { NavigationStackScreenComponent } from "react-navigation-stack";

import CameraPhotoAddView from './CameraPhotoAddView';
import { LoadingComponent } from '../InitialLoading';
import { CreateRehabNoArv, CreateRehabNoArvVariables } from '../../generated/CreateRehabNoArv';

type Params = {
  rehabId: string;
  keyCameraScreen?: string;
  loading?: boolean;
  // From Vacant Screen for normal input flow
  createRehabNoArvInput?: CreateRehabNoArvVariables['input'];
  rehabItemPackageId?: CreateRehabNoArv['createRehabNoArv']['rehabItemPackage']['id'];
};

type ScreenProps = {};

export type SelectedPhotos = {
  index: number;
  imageSrc: ImageURISource;
};

export type CameraPhotoAddTileViewProps = TileProps;
export interface CameraPhotoAddViewProps {
  onCameraIconPress: IconProps['onPress'];
  onHistoryIconPress: IconProps['onPress'];
  onPhotoLibraryIconPress: IconProps['onPress'];
  rehabId: string;
};

const CameraPhotoAdd: NavigationStackScreenComponent<Params, ScreenProps> = (props) => {
  const { navigation } = props;
  const rehabId = navigation.getParam("rehabId");
  // From Vacant Screen for normal input flow
  const createRehabNoArvInput = navigation.getParam("createRehabNoArvInput", null);
  const keyCameraScreen = navigation.getParam("keyCameraScreen");
  const rehabItemPackageId = navigation.getParam("rehabItemPackageId", "");

  const [loading] = React.useState(false);

  // For CameraPhotoAddView
  const getCameraPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      if (status !== 'granted') {
        return false;
      };
      return true;
    }
  };
  const getPhotoLibraryPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        return false;
      };
      return true;
    }
  };
  const onCameraIconPress = React.useCallback<CameraPhotoAddViewProps['onCameraIconPress']>(async () => {
    const hasCameraPermission = await getCameraPermissionAsync();
    const hasCameraRollPermission = await getPhotoLibraryPermissionAsync();
    if (hasCameraPermission && hasCameraRollPermission) {
      navigation.navigate("CameraScreen", { rehabId, rehabItemPackageId, createRehabNoArvInput, keyCameraScreen })
    };
  }, [navigation]);
  const onHistoryIconPress = React.useCallback<CameraPhotoAddViewProps['onHistoryIconPress']>(async () => {
    navigation.navigate("CameraPhotoReviewScreen", { rehabId })
  }, [navigation]);
  const onPhotoLibraryIconPress = React.useCallback<CameraPhotoAddViewProps['onPhotoLibraryIconPress']>(async () => {
    const hasPermission = await getPhotoLibraryPermissionAsync();
    if (hasPermission) {
      navigation.navigate("CameraPhotoGalleryScreen", { rehabId, rehabItemPackageId, createRehabNoArvInput, keyCameraScreen })
    } 
  }, [navigation]);

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
      onCameraIconPress={onCameraIconPress}
      onHistoryIconPress={onHistoryIconPress}
      onPhotoLibraryIconPress={onPhotoLibraryIconPress}
      rehabId={rehabId}
    />
  )
};

export default React.memo(CameraPhotoAdd);