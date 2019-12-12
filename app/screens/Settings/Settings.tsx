import * as SecureStore from 'expo-secure-store';
import React from 'react';
import { Button, Text, View } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import { NavigationStackScreenComponent } from "react-navigation-stack";

import styles from './styles';

type Params = {};

type ScreenProps = {};

const Settings: NavigationStackScreenComponent<Params, ScreenProps> = (props) => {
  const { navigation } = props;

  const [isLogin, setIsLogin] = React.useState(false);

  const signOutAsync = async () => {
    await SecureStore.deleteItemAsync("accessToken", {});
    await SecureStore.deleteItemAsync("idToken", {});
    await SecureStore.deleteItemAsync("refreshToken", {});
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'SettingsScreen' })],
    });
    navigation.dispatch(resetAction);
    navigation.navigate("AuthTabs");
    // navigate.("HomeScreen");
    // setIsLogin(false);
  }
  const handleButtonOnPress = () => signOutAsync();

  const bootstrapAsync = async () => {
    // TODO Change to viewer from backend, check the expiration time
    const accessToken = await SecureStore.getItemAsync("accessToken", {});
    if (accessToken) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    };
  }

  React.useEffect(() => {
    bootstrapAsync();
    return () => {}
  }, [handleButtonOnPress, isLogin]);
  // console.log("isLogin", isLogin)
  return (
    <View style={styles.container}>
      <Text>This is the Settings.</Text>
      {!isLogin ? null : 
        <Button
          title="Logout"
          onPress={handleButtonOnPress}
        />
      }
    </View>
  )
};

export default React.memo(Settings);