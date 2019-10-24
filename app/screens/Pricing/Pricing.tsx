import React from 'react';
import { Text, View } from 'react-native';
import { NavigationStackScreenComponent } from "react-navigation-stack";

import styles from './styles';

type Params = {};

type ScreenProps = {};

const Pricing: NavigationStackScreenComponent<Params, ScreenProps> = (props) => {
  const { navigation: { navigate } } = props;
  return (
    <View style={styles.container}>
      <Text>This is the Pricing.</Text>
    </View>
  )
};

export default React.memo(Pricing);