import React from 'react';
import { FlatList, Text } from 'react-native';

import styles from './styles';
import { CameraPhotoReviewViewProps } from '../CameraPhotoReview';
import CameraPhoto from '../CameraPhoto';

import { deviceScreenWidth } from '../../../styles/constants';

const getItemLayout = (_, index) => {
  let length = deviceScreenWidth / 4;
  return { length, offset: length * index, index }
};

const CameraPhotoReviewView: React.ComponentType<CameraPhotoReviewViewProps> = (props) => {
  const { photos } = props;

  return (
    <FlatList
      data={photos}
      numColumns={4}
      renderItem={({ item, index }) => {
        return(
          <CameraPhoto
            photo={item}
            key={index}
          />
        )
      }}
      keyExtractor={(photo, index) => `${photo.id}-${index}`}
      // onEndReached={() => {getCameraRollPhotos()}}
      onEndReachedThreshold={0.5}
      ListEmptyComponent={<Text>Empty...</Text>}
      initialNumToRender={24}
      getItemLayout={getItemLayout}
    />
  )
};

export default React.memo(CameraPhotoReviewView);
