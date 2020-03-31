import React from 'react';
import { TouchableOpacityProps } from 'react-native';

import CameraPhotoView from './CameraPhotoView';
import { CameraPhotoProps } from '../CameraPhotoGallery'; 

export interface CameraPhotoViewProps {
  imageOnPress: TouchableOpacityProps['onPress'];
  selected: boolean;
  photo: CameraPhotoProps['photo'];
};

const CameraPhoto: React.ComponentType<CameraPhotoProps> = (props) => {
  const { togglePhotoSelection, photo } = props;
  const [selected, setSelected] = React.useState(false);

  const imageOnPress = React.useCallback<CameraPhotoViewProps['imageOnPress']>(() => {
    setSelected(!selected);
    togglePhotoSelection(photo, !selected);
  }, [selected, togglePhotoSelection, photo]);

  return (
    <CameraPhotoView 
      imageOnPress={imageOnPress}
      selected={selected}
      photo={photo}
    />
  )
};

export default React.memo(CameraPhoto);