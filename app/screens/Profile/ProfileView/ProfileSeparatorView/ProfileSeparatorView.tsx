import React from 'react';
import { View } from 'react-native';

import styles from './styles';

interface ProfileSeparatorViewProps {

}

const ProfileSeparatorView: React.ComponentType<ProfileSeparatorViewProps> = (props) => {

  return (
    <View style={styles.container}>
    <View style={styles.separatorOffset} />
    <View style={styles.separator} />
  </View>
  )
}
export default React.memo(ProfileSeparatorView);