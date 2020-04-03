import React from 'react';
import { Image } from 'react-native';

import { deviceScreenWidth } from '../../../../styles/constants';
import { CameraPhotoViewProps } from '../CameraPhoto';

const CameraPhotoView: React.ComponentType<CameraPhotoViewProps> = (props) => {
  const { photo } = props;

  return (
    <Image
      style={{ width: deviceScreenWidth / 4, height: deviceScreenWidth / 4 }}
      source={{ uri: photo.uri }}
    />
  )
};

export default React.memo(CameraPhotoView);
