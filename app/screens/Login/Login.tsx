import React from 'react';
import { Text, View } from 'react-native';
import { Button } from "react-native-elements";
import { NavigationScreenProps } from "react-navigation";

import styles from './styles';
import strings from "./strings";

export interface LoginProps extends NavigationScreenProps {

};

const Login: React.SFC<LoginProps> = (props) => {
  const { navigation: { navigate } } = props;
  const handleHomeButtonOnPress = () => navigate("HomeScreen");
  return (
    <View style={styles.container}>
      <Text>This is the Login.</Text>
      <Button title={strings.loginTitle} onPress={handleHomeButtonOnPress} />
    </View>
  )
};

export default Login;