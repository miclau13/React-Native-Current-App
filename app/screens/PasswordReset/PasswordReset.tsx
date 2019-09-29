import React from 'react';
import { Text, View } from 'react-native';
import { NavigationStackScreenComponent } from "react-navigation-stack";

import styles from './styles';

type Params = {};

type ScreenProps = {};

const PasswordReset: NavigationStackScreenComponent<Params, ScreenProps> = (props) => {
  return (
    <View style={styles.container}>
      <Text>This is the PasswordReset.</Text>
    </View>
  )
};

export default PasswordReset;