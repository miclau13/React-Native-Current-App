import * as FileSystem from 'expo-file-system';
import React from 'react';

import CameraPhotoGalleryView from './CameraPhotoGalleryView';
import { CameraPhotoGalleryProps } from '../Camera';
import useCameraRoll from '../../../common/hooks/useCameraRoll';

export const PHOTOS_DIR = FileSystem.documentDirectory + 'photos';

export type TogglePhotoSelection = (uri: string, isSelected: boolean) => void;

export interface CameraPhotoGalleryViewProps {
  photos: CameraPhotoGalleryProps['photos'];
  togglePhotoSelection: TogglePhotoSelection;
};

export interface CameraPhotoProps {
  togglePhotoSelection: TogglePhotoSelection;
  uri: string;
};

const CameraPhotoGallery: React.ComponentType<CameraPhotoGalleryProps> = (props) => {
  const { photos, selectedPhotos, setSelectedPhotos } = props;
  const [_photos, set_Photos] = React.useState<Array<string>>(photos);

  const [cameraRollPhotos, getCameraRollPhotos] = useCameraRoll({ first: 10 });
  
  const bootstrapasync = async () => {
    await getCameraRollPhotos();
  };
  const readPhotos = React.useCallback(async () => {
    const phonePhotos = await FileSystem.readDirectoryAsync(PHOTOS_DIR);
    const photosFullUri = phonePhotos.map(uri => (`${PHOTOS_DIR}/${uri}`));
    const _cameraRollPhotos = (cameraRollPhotos || []).map(photo => photo.uri);
    const result = [...photos, ...photosFullUri, ..._cameraRollPhotos];
    set_Photos(result);
  }, [cameraRollPhotos]);

  const togglePhotoSelection = React.useCallback<CameraPhotoGalleryViewProps['togglePhotoSelection']>((uri, isSelected) => {
    if (isSelected) {
      setSelectedPhotos([...selectedPhotos, uri]);
    } else {
      setSelectedPhotos(selectedPhotos.filter(item => item !== uri));
    }
  }, [selectedPhotos]);

  React.useEffect(() => {
    bootstrapasync();
    return () => {
    }
  }, []);

  React.useEffect(() => {
    readPhotos();
    return () => {
    }
  }, [cameraRollPhotos]);

  return (
    <CameraPhotoGalleryView 
      getCameraRollPhotos={getCameraRollPhotos}
      photos={_photos}
      togglePhotoSelection={togglePhotoSelection}
    />
  )
};

export default React.memo(CameraPhotoGallery);