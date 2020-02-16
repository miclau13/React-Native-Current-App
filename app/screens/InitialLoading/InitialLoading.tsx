import * as SecureStore from 'expo-secure-store';
import React, { useEffect } from 'react';
import { ActivityIndicator, StatusBar, View } from 'react-native';
import { NavigationStackScreenProps } from "react-navigation-stack";

import styles from './styles';
// import LoggedInContext from '../../common/LoggedInContext';

type Params = {};

type ScreenProps = {};

const InitialLoading: React.ComponentType<NavigationStackScreenProps<Params, ScreenProps>> = (props) => {
  const { navigation } = props;

  // const loggedIn = React.useContext(LoggedInContext);

  const bootstrapAsync = async() => {
    const accessToken = await SecureStore.getItemAsync("accessToken", {});
    if (accessToken) {
      navigation.navigate("MainNavigator");
    } else {
      navigation.navigate("AuthNavigator");
    };
  }

  useEffect(() => {
    // console.log("InitialLoading Mount");
    bootstrapAsync()
    return () => {
      // console.log("InitialLoading UnMount");
    }
  }, []);

  return (
    // <LoggedInContext.Consumer>
    //   {loggedIn => (
    //     <LoadingComponent loggedIn={loggedIn} />
    //   )}
    // </LoggedInContext.Consumer>
    <LoadingComponent />
  )
};

export const LoadingComponent = (props) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator />
      <StatusBar barStyle="default" />
    </View>
  )
}

export default React.memo(InitialLoading);