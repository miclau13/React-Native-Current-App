import React from 'react';
import { Text, View } from 'react-native';

import styles from './styles';

export interface PasswordResetProps {

};

const PasswordReset: React.SFC<PasswordResetProps> = (props) => {
  return (
    <View style={styles.container}>
      <Text>This is the PasswordReset.</Text>
    </View>
  )
};

export default PasswordReset;