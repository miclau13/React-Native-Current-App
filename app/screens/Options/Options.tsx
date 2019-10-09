import React from 'react';
import { Text, View } from 'react-native';
import { NavigationStackScreenComponent } from "react-navigation-stack";

import styles from './styles';

type Params = {};

type ScreenProps = {};

const Options: NavigationStackScreenComponent<Params, ScreenProps> = (props) => {
  return (
    <View style={styles.container}>
      <Text>This is the Options.</Text>
    </View>
  )
};

export default Options;