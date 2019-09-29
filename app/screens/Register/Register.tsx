import React from 'react';
import { Text, View } from 'react-native';
import { NavigationBottomTabScreenComponent } from "react-navigation-tabs";

import styles from './styles';

type Params = {};

type ScreenProps = {};

const Register: NavigationBottomTabScreenComponent<Params, ScreenProps> = (props) => {
  return (
    <View style={styles.container}>
      <Text>This is the Register.</Text>
    </View>
  )
};

export default Register;