import { Asset } from 'expo-media-library';
import React from 'react';
import { NavigationStackScreenComponent } from "react-navigation-stack";

import CameraPhotoGalleryView from './CameraPhotoGalleryView';
import useCameraRoll, { UseCameraRollState } from '../../common/hooks/useCameraRoll';
import { CreateRehabNoArv, CreateRehabNoArvVariables } from '../../generated/CreateRehabNoArv';

type Params = {
  keyCameraScreen?: string;
  rehabId?: string;
  selectedPhotos?: Asset[];
  // From Vacant Screen for normal input flow
  createRehabNoArvInput?: CreateRehabNoArvVariables['input'];
  rehabItemPackageId?: CreateRehabNoArv['createRehabNoArv']['rehabItemPackage']['id'];
};

type ScreenProps = {};

export type TogglePhotoSelection = (photo: Asset, isSelected: boolean) => void;

export interface CameraPhotoGalleryViewProps {
  getCameraRollPhotos: UseCameraRollState['getPhotos'];
  photos: Asset[];
  togglePhotoSelection: TogglePhotoSelection;
};

export interface CameraPhotoProps {
  togglePhotoSelection: TogglePhotoSelection;
  photo: Asset;
};

const CameraGallery: NavigationStackScreenComponent<Params, ScreenProps> = (props) => {
  const { navigation } = props;
  const selectedPhotos = navigation.getParam("selectedPhotos", []);
  const [cameraRollPhotos, getCameraRollPhotos] = useCameraRoll({ first: 10 });

  // For CameraPhotoGalleryView
  const togglePhotoSelection = React.useCallback<CameraPhotoGalleryViewProps['togglePhotoSelection']>((photo, isSelected) => {
    if (isSelected) {
      navigation.setParams({ selectedPhotos: [...selectedPhotos, photo] });
    } else {
      navigation.setParams({ selectedPhotos: selectedPhotos.filter(selectedPhoto => selectedPhoto.uri !== photo.uri) });
    }
  }, [selectedPhotos]);
  
  const bootstrapasync = async () => {
    await getCameraRollPhotos();
  };

  React.useEffect(() => {
    bootstrapasync();
    return () => {
    }
  }, []);

  return (
    <CameraPhotoGalleryView 
      getCameraRollPhotos={getCameraRollPhotos}
      photos={cameraRollPhotos}
      togglePhotoSelection={togglePhotoSelection}
    />
  )
};

export default React.memo(CameraGallery);