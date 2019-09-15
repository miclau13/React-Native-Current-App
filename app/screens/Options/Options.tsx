import React from 'react';
import { Text, View } from 'react-native';

import styles from './styles';

export interface OptionsProps {

};

const Options: React.SFC<OptionsProps> = (props) => {
  return (
    <View style={styles.container}>
      <Text>This is the Options.</Text>
    </View>
  )
};

export default Options;