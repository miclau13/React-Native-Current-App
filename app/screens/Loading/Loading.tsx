import React from 'react';
import { Text, View } from 'react-native';

import styles from './styles';

export interface LoadingProps {

};

const Loading: React.SFC<LoadingProps> = (props) => {
  return (
    <View style={styles.container}>
      <Text>This is the Loading.</Text>
    </View>
  )
};

export default Loading;