import React from 'react';
import { TouchableOpacityProps } from 'react-native';

import CameraPhotoView from './CameraPhotoView';
import { CameraPhotoProps } from '../CameraPhotoGallery'; 

export interface CameraPhotoViewProps {
  imageOnPress: TouchableOpacityProps['onPress'];
  selected: boolean;
  uri: CameraPhotoProps['uri'];
};

const CameraPhoto: React.ComponentType<CameraPhotoProps> = (props) => {
  const { togglePhotoSelection, uri } = props;
  const [selected, setSelected] = React.useState(false);

  const imageOnPress = React.useCallback<CameraPhotoViewProps['imageOnPress']>(() => {
    setSelected(!selected);
    togglePhotoSelection(uri, !selected)
  }, [selected]);

  return (
    <CameraPhotoView 
      imageOnPress={imageOnPress}
      selected={selected}
      uri={uri}
    />
  )
};

export default React.memo(CameraPhoto);