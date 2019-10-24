import * as SecureStore from 'expo-secure-store';
import React, { useEffect} from 'react';
import jwtDecode from 'jwt-decode';
import { ActivityIndicator, StatusBar, View } from 'react-native';
import { NavigationStackScreenProps } from "react-navigation-stack";

import styles from './styles';

type Params = {
  redirectTo?: string;
};

type ScreenProps = {};

const AuthLoading: React.ComponentType<NavigationStackScreenProps<Params, ScreenProps>> = (props) => {
  const { navigation } = props;
  const redirectTo = navigation.getParam("redirectTo", "HomeScreen");
  const bootstrapAsync = async () => {
    // TODO Change to viewer from backend, check the expiration time
    const accessToken = await SecureStore.getItemAsync("accessToken", {});
    if (accessToken) {
      navigation.navigate(redirectTo);
    } else {
      navigation.navigate("LoginScreen");
    }
  }
  useEffect(() => {
    bootstrapAsync();
  }, [bootstrapAsync]);

  return (
    <View>
      <ActivityIndicator />
      <StatusBar barStyle="default" />
    </View>
  )
};

export default React.memo(AuthLoading);