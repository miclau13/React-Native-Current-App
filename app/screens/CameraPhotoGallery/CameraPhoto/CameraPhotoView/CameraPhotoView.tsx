import React from 'react';
import { Image, TouchableHighlight, View } from 'react-native';

import { deviceScreenWidth } from '../../../../styles/constants';
import { CameraPhotoViewProps } from '../CameraPhoto';

const CameraPhotoView: React.ComponentType<CameraPhotoViewProps> = (props) => {
  const { imageOnPress, selected, photo } = props;

  return (
    <TouchableHighlight
      style={{ opacity: selected ? 0.2 : 1 }}
      underlayColor='transparent'
      onPress={imageOnPress}
    >
      <Image
        style={{ width: deviceScreenWidth / 4, height: deviceScreenWidth / 4 }}
        source={{ uri: photo.uri }}
      />
    </TouchableHighlight>
  )
};

export default React.memo(CameraPhotoView);
