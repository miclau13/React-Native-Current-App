import React from 'react';
import { ActivityIndicator, SafeAreaView, ScrollView, View } from 'react-native';
import { Icon, Tile } from 'react-native-elements';

import styles from './styles';
import { CameraPhotoAddViewProps } from '../CameraPhotoAdd';
import { primaryButtonColor } from '../../../styles';
import DemoImage from '../../../../assets/DemoImage.png';

const CameraPhotoAddView: React.ComponentType<CameraPhotoAddViewProps> = (props) => {
  const { onCameraIconPress, onPhotoLibraryIconPress } = props;
    return (
      <SafeAreaView>
        <ScrollView>
          <Tile
            activeOpacity={1}
            containerStyle={{ padding: 24 }}
            // contentContainerStyle={{ height: 200 }}
            imageSrc={DemoImage}
            imageProps={{
              resizeMode: 'contain',
              PlaceholderContent: <ActivityIndicator />
            }}
            title="Please upload photos in order to improve our accuracy."
          >
          </Tile> 
          <View
            style={styles.iconsContainer}
          >
            <Icon 
              raised
              reverse
              color={primaryButtonColor}
              name="photo-camera" 
              onPress={onCameraIconPress}
              size={36}  
            />
            <View style={{ marginHorizontal: 16 }}></View>
            <Icon 
              raised
              reverse
              color={primaryButtonColor}
              name="photo-library" 
              onPress={onPhotoLibraryIconPress}
              size={36}  
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
}
export default React.memo(CameraPhotoAddView);