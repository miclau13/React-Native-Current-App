import * as SecureStore from 'expo-secure-store';
import React from 'react';
import { Button, Text, View } from 'react-native';
import { NavigationStackScreenComponent } from "react-navigation-stack";

import styles from './styles';

type Params = {};

type ScreenProps = {};

const Settings: NavigationStackScreenComponent<Params, ScreenProps> = (props) => {
  const { navigation: { navigate } } = props;
  const signOutAsync = async () => {
    await SecureStore.deleteItemAsync("accessToken", {});
    await SecureStore.deleteItemAsync("idToken", {});
    await SecureStore.deleteItemAsync("refreshToken", {});
    navigate("LoginScreen");
  }
  const handleButtonOnPress = () => signOutAsync();
  return (
    <View style={styles.container}>
      <Text>This is the Settings.</Text>
      <Button
        title="Logout"
        onPress={handleButtonOnPress}
      />
    </View>
  )
};

export default React.memo(Settings);