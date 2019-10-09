import React from 'react';
import { Text, View } from 'react-native';
import { NavigationStackScreenComponent } from "react-navigation-stack";

import styles from './styles';

type Params = {};

type ScreenProps = {};

const Detail: NavigationStackScreenComponent<Params, ScreenProps> = (props) => {
  return (
    <View style={styles.container}>
      <Text>This is the Detail.</Text>
    </View>
  )
};

export default Detail;