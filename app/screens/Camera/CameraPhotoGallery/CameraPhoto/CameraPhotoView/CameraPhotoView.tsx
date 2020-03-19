import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import styles from './styles';
import { CameraPhotoViewProps } from '../CameraPhoto';

const CameraPhotoView: React.ComponentType<CameraPhotoViewProps> = (props) => {
  const { imageOnPress, selected, uri } = props;
  return (
    <TouchableOpacity
      style={styles.pictureWrapper}
      onPress={imageOnPress}
    >
      <Image
        style={selected ? [styles.picture, styles.pictureSelected] : styles.picture}
        source={{ uri }}
      />
      {selected && <MaterialIcons name="check-circle" size={30} color="#4630EB" />}
    </TouchableOpacity>
  )
};

export default React.memo(CameraPhotoView);
