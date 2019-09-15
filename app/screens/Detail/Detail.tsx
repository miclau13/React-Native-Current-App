import React from 'react';
import { Text, View } from 'react-native';

import styles from './styles';

export interface DetailProps {

};

const Detail: React.SFC<DetailProps> = (props) => {
  return (
    <View style={styles.container}>
      <Text>This is the Detail.</Text>
    </View>
  )
};

export default Detail;