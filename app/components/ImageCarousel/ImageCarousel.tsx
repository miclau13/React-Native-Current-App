import React  from 'react';
import { Image } from 'react-native';
import Carousel from 'react-native-looped-carousel';
import styles from './styles';

type AlbumPhoto = {
  id: string;
  uri: string;
}

interface ImageCarouselProps {
  album: AlbumPhoto[];
  currentPage: number;
};

const ImageCarousel: React.ComponentType<ImageCarouselProps> = (props) => {
  const { 
    album,
    currentPage,
  } = props;
  return (
    <Carousel 
      autoplay={false}
      currentPage={currentPage}
      isLooped={false}
      style={{ flex: 1 }}
    >
      {album.map(image => {
        return (
          <Image 
            key={image.id}
            resizeMode="contain"
            source={{ uri: image.uri }}
            style={{ flex: 1 }}
          />
        )
      })}
    </Carousel>
  )
}

export default ImageCarousel;