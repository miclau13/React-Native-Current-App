import React from 'react';
import { Image, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import styles from './styles';
import { ToggleSelection } from '../CameraPhotoGallery'; 

export interface CameraPhotoProps {
  onSelectionToggle: ToggleSelection;
  uri: string;
};

const CameraPhoto: React.ComponentType<CameraPhotoProps> = (props) => {

  const { onSelectionToggle, uri } = props;

  const [selected, setSelected] = React.useState(false);

  const toggleSelection = React.useCallback<TouchableOpacityProps['onPress']>(() => {
    setSelected(!selected);
  }, [selected]);

  React.useEffect(() => {
    return () => {console.log("CameraPhoto UnMount")}
  }, []);

  React.useEffect(() => {
    onSelectionToggle(uri, selected);
  }, [selected]);

  return (
    <TouchableOpacity
      style={styles.pictureWrapper}
      onPress={toggleSelection}
    >
      <Image
        style={selected ? [styles.picture, styles.pictureSelected] : styles.picture}
        source={{ uri }}
      />
      {selected && <MaterialIcons name="check-circle" size={30} color="#4630EB" />}
    </TouchableOpacity>
  )
};

export default React.memo(CameraPhoto);