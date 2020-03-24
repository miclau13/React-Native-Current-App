import React from 'react';
import { NavigationStackScreenComponent } from "react-navigation-stack";

import CameraPhotoGalleryView from './CameraPhotoGalleryView';
import useCameraRoll, { UseCameraRollState } from '../../common/hooks/useCameraRoll';
import { CreateRehabNoArv, CreateRehabNoArvVariables } from '../../generated/CreateRehabNoArv';

type Params = {
  keyCameraScreen?: string;
  rehabId?: string;
  selectedPhotos?: string[];
  // From Vacant Screen for normal input flow
  createRehabNoArvInput?: CreateRehabNoArvVariables['input'];
  rehabItemPackageId?: CreateRehabNoArv['createRehabNoArv']['rehabItemPackage']['id'];
};

type ScreenProps = {};

export type TogglePhotoSelection = (uri: string, isSelected: boolean) => void;

export interface CameraPhotoGalleryViewProps {
  getCameraRollPhotos: UseCameraRollState['getPhotos'];
  photos: string[];
  togglePhotoSelection: TogglePhotoSelection;
};

export interface CameraPhotoProps {
  togglePhotoSelection: TogglePhotoSelection;
  uri: string;
};

const CameraGallery: NavigationStackScreenComponent<Params, ScreenProps> = (props) => {
  const { navigation } = props;
  const selectedPhotos = navigation.getParam("selectedPhotos", []);
  const [cameraRollPhotos, getCameraRollPhotos] = useCameraRoll({ first: 10 });
  const _photos = React.useMemo(() => (cameraRollPhotos || []).map(photo => photo.uri)
  , [cameraRollPhotos]);

  // For CameraPhotoGalleryView
  const togglePhotoSelection = React.useCallback<CameraPhotoGalleryViewProps['togglePhotoSelection']>((uri, isSelected) => {
    if (isSelected) {
      navigation.setParams({ selectedPhotos: [...selectedPhotos, uri] });
    } else {
      navigation.setParams({ selectedPhotos: selectedPhotos.filter(item => item !== uri) });
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
      photos={_photos}
      togglePhotoSelection={togglePhotoSelection}
    />
  )
};

export default React.memo(CameraGallery);