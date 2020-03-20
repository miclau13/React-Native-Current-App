import React from 'react';
import { FlatList, Text } from 'react-native';

import styles from './styles';
import { CameraPhotoGalleryViewProps } from '../CameraPhotoGallery';
import CameraPhoto from '../CameraPhoto';

import { deviceScreenWidth } from '../../../../styles/constants';

const getItemLayout = (_, index) => {
  let length = deviceScreenWidth / 4;
  return { length, offset: length * index, index }
};

const CameraPhotoGalleryView: React.ComponentType<CameraPhotoGalleryViewProps> = (props) => {
  const { getCameraRollPhotos, photos, togglePhotoSelection } = props;

  return (
    <FlatList
      data={photos}
      numColumns={4}
      renderItem={({ item, index }) => {
        return(
          <CameraPhoto
            uri={item}
            key={index}
            togglePhotoSelection={togglePhotoSelection}
          />
        )
      }}
      keyExtractor={(uri, index) => `${uri}-${index}`}
      onEndReached={() => {getCameraRollPhotos()}}
      onEndReachedThreshold={0.5}
      ListEmptyComponent={<Text>Empty...</Text>}
      initialNumToRender={24}
      getItemLayout={getItemLayout}
    />
  )
};

export default React.memo(CameraPhotoGalleryView);
