import * as SecureStore from 'expo-secure-store';
import React, { useEffect} from 'react';
import jwtDecode from 'jwt-decode';
import { ActivityIndicator, StatusBar, View } from 'react-native';
import { NavigationStackScreenProps } from "react-navigation-stack";

import styles from './styles';

type Params = {};

type ScreenProps = {};

const AuthLoading: React.ComponentType<NavigationStackScreenProps<Params, ScreenProps>> = (props) => {
  const { navigation } = props;
  const bootstrapAsync = async () => {
    const idToken = await SecureStore.getItemAsync("idToken", {});
    if (idToken) {
      const data = jwtDecode(idToken);
      navigation.navigate(
        "HomeScreen",
        {
          name: data.name,
          profilePictureUri: data.picture
        }
      );
    } else {
      navigation.navigate("AuthTabs");
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

export default AuthLoading;