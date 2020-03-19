import React from 'react';
import { ScrollView, Text, View } from 'react-native';

import styles from './styles';
import { CameraPhotoGalleryViewProps } from '../CameraPhotoGallery';
import CameraPhoto from '../CameraPhoto';

const CameraPhotoGalleryView: React.ComponentType<CameraPhotoGalleryViewProps> = (props) => {
  const { photos, togglePhotoSelection } = props;

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.pictures}>
          {photos.map(uri => {
            return (
              <CameraPhoto
                key={uri}
                uri={uri}
                togglePhotoSelection={togglePhotoSelection}
              />
            )
          })}
        </View>
      </ScrollView>
    </View>
  )
};

export default React.memo(CameraPhotoGalleryView);
