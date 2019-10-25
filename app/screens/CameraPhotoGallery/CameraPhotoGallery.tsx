import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import * as Permissions from 'expo-permissions';
import React from 'react';
import { ScrollView, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';

import styles from './styles';
import { CameraProps } from '../Camera';
import CameraPhoto from '../CameraPhoto';

export const PHOTOS_DIR = FileSystem.documentDirectory + 'photos';

export type ToggleSelection = (uri: string, isSelected: boolean) => void;

export interface CameraPhotoGalleryProps {
  handleStepNavigation: CameraProps['handleStepNavigation'];
  phonePhotos: string[];
  selected: string[];
  setSelected(selected: string[]): void;
};

const CameraPhotoGallery: React.ComponentType<CameraPhotoGalleryProps> = (props) => {

  const { handleStepNavigation, phonePhotos, selected, setSelected } = props;

  const [photos, setPhotos] = React.useState<string[]>(phonePhotos);

  const readPhotos = React.useCallback(async () => {
    const photos = await FileSystem.readDirectoryAsync(PHOTOS_DIR);
    const photosFullUri = photos.map(uri => (`${PHOTOS_DIR}/${uri}`));
    setPhotos([...phonePhotos, ...photosFullUri]);
  }, []);

  // const saveToGallery = React.useCallback<TouchableOpacityProps['onPress']>(async () => {
  //   const photos = selected;
  //   if (photos.length > 0) {
  //     const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
  //     if (status !== 'granted') {
  //       throw new Error('Denied CAMERA_ROLL permissions!');
  //     }
  //     const promises = photos.map(photoUri => {
  //       return MediaLibrary.createAssetAsync(photoUri);
  //     });
  //     await Promise.all(promises);
  //     console.log('Successfully saved photos to user\'s gallery!');
  //   } else {
  //     console.log('No photos to save!');
  //   }
  // }, [selected]);

  const toggleSelection = React.useCallback<ToggleSelection>((uri, isSelected) => {
    if (isSelected) {
      setSelected([...selected, uri]);
    } else {
      setSelected(selected.filter(item => item !== uri));
    }
  }, [selected]);

  React.useEffect(() => {
    console.log("CameraPhotoGallery Mount");
    readPhotos();
    return () => {
      console.log("CameraPhotoGallery UnMount");
    }
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.pictures}>
          {photos.map(fileName => {
            return (
              <CameraPhoto
                key={fileName}
                uri={fileName}
                onSelectionToggle={toggleSelection}
              />
            )
          })}
        </View>
      </ScrollView>
  </View>
  )
};

export default React.memo(CameraPhotoGallery);