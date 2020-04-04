import React from 'react';
import { Image, FlatList, Text } from 'react-native';
import Lightbox from 'react-native-lightbox';

import styles from './styles';
import { CameraPhotoReviewViewProps } from '../CameraPhotoReview';
import ImageCarousel from '../../../components/ImageCarousel';
import { deviceScreenWidth } from '../../../styles/constants';

const getItemLayout = (_, index) => {
  const length = deviceScreenWidth / 4;
  // const length = deviceScreenWidth / 2;
  return { length, offset: length * index, index }
};

const renderCarousel = (photos, currentPage) => {
  return (
    <ImageCarousel
      album={photos}
      currentPage={currentPage}
    />
  )
};

const CameraPhotoReviewView: React.ComponentType<CameraPhotoReviewViewProps> = (props) => {
  const { 
    isRefreshing,
    onRefresh,
    photos, 
  } = props;

  const renderLightBox = (photo, index) => {
    const currentPage = photos.findIndex(_photo => _photo.uri === photo.uri);
    return (
      <Lightbox 
        renderContent={() => renderCarousel(photos, currentPage)}
        springConfig={{tension: 1, friction: 10}} 
        swipeToDismiss={false}
      >
        <Image
          key={index}
          style={{ width: deviceScreenWidth / 4, height: deviceScreenWidth / 4 }}
          // style={{ width: deviceScreenWidth / 2, height: deviceScreenWidth / 2 }}
          source={{ uri: photo.uri }}
        />
      </Lightbox>
    )
  };

  return (
    <FlatList
      data={photos}
      getItemLayout={getItemLayout}
      initialNumToRender={24}
      // initialNumToRender={4}
      keyExtractor={(photo, index) => `${photo.id}-${index}`}
      numColumns={4}
      // onEndReached={() => {}}
      // onEndReachedThreshold={0.5}
      onRefresh={onRefresh}
      refreshing={isRefreshing}
      renderItem={({item: photo, index}) => renderLightBox(photo, index)}
      ListEmptyComponent={<Text>Empty...</Text>}
    />
  )
};

export default React.memo(CameraPhotoReviewView);
