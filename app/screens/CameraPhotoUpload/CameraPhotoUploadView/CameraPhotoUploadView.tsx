import React from 'react';
import { Text, View } from 'react-native';

import styles from './styles';
import { CameraPhotoUploadViewProps } from '../CameraPhotoUpload';

const CameraPhotoUploadView: React.ComponentType<CameraPhotoUploadViewProps> = (props) => {
  const { status } = props; 
  
  return (
    <View style={styles.container}>
      <Text>{status}</Text>
    </View>
  );
}
export default React.memo(CameraPhotoUploadView);