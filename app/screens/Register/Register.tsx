import React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainerProps } from "react-navigation";
import styles from './styles';

export interface RegisterProps extends NavigationContainerProps {
};

const Register: React.SFC<RegisterProps> = (props) => {
  return (
    <View style={styles.container}>
      <Text>This is the Register.</Text>
    </View>
  )
};

export default Register;