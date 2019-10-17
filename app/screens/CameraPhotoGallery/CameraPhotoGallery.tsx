import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import * as Permissions from 'expo-permissions';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import styles from './styles';
import CameraPhoto from '../CameraPhoto';

const PHOTOS_DIR = FileSystem.documentDirectory + 'photos';

export type ToggleSelection = (uri: string, isSelected: boolean) => void;

export interface CameraPhotoGalleryProps {
  toggleView: TouchableOpacityProps['onPress'];
};

const CameraPhotoGallery: React.ComponentType<CameraPhotoGalleryProps> = (props) => {

  const { toggleView } = props;

  const [photos, setPhotos] = React.useState<string[]>([]);
  const [selected, setSelected] = React.useState<string[]>([]);

  const readPhotos = React.useCallback(async () => {
    const photos = await FileSystem.readDirectoryAsync(PHOTOS_DIR);
    setPhotos(photos);
  }, []);

  const saveToGallery = React.useCallback<TouchableOpacityProps['onPress']>(async () => {
    const photos = selected;
    if (photos.length > 0) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        throw new Error('Denied CAMERA_ROLL permissions!');
      }
      const promises = photos.map(photoUri => {
        return MediaLibrary.createAssetAsync(photoUri);
      });
      await Promise.all(promises);
      console.log('Successfully saved photos to user\'s gallery!');
    } else {
      console.log('No photos to save!');
    }
  }, [selected]);

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
    return () => {console.log("CameraPhotoGallery UnMount")}
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <TouchableOpacity style={styles.button} onPress={toggleView}>
          <MaterialIcons name="photo-camera" size={25} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={saveToGallery}>
          <Text style={styles.whiteText}>Save selected to gallery</Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={styles.pictures}>
          {photos.map(fileName => {
            return (
              <CameraPhoto
                key={fileName}
                uri={`${PHOTOS_DIR}/${fileName}`}
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