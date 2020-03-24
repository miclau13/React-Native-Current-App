import React from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { Tile } from 'react-native-elements';

import styles from './styles';
import { CameraPhotoAddViewProps, CameraPhotoAddTileViewProps } from '../CameraPhotoAdd';
import { deviceScreenWidth } from '../../../styles';

const CameraPhotoAddTileView: React.ComponentType<CameraPhotoAddTileViewProps> = (props) => {
  const { imageSrc } = props;
  return (
    <Tile 
      containerStyle={styles.tileContainerStyle}
      contentContainerStyle={styles.tileContentContainerStyle}
      height={150}
      icon={!imageSrc ? { name: 'photo-camera' } : { name: 'delete', color: 'red', type: 'material-community' }} 
      width={deviceScreenWidth / 4}
      {...props} 
    />
  )
};

const CameraPhotoAddView: React.ComponentType<CameraPhotoAddViewProps> = (props) => {
  const { selectedPhotos, onImagePress } = props;
    return (
      <SafeAreaView>
        <ScrollView>
        <View style={{ margin: 8 }}></View>
        <View style={styles.container}>
          {selectedPhotos.map(selectedPhoto => {
            const { index, imageSrc } = selectedPhoto;
            return (
              <CameraPhotoAddTileView 
                key={index}
                imageSrc={imageSrc}
                onPress={onImagePress(index)}
              /> 
            )
          })}
        </View>
        <View style={{ margin: 8 }}></View>
        </ScrollView>
      </SafeAreaView>
    );
}
export default React.memo(CameraPhotoAddView);