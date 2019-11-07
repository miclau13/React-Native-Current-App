import * as SecureStore from 'expo-secure-store';
import React, { useEffect} from 'react';
import { ActivityIndicator, StatusBar, View } from 'react-native';
import { NavigationStackScreenProps } from "react-navigation-stack";

import styles from './styles';
import { BathroomRemodelFormValues } from '../BathroomRemodelForm';
import LoggedInContext from '../../common/LoggedInContext';

type Params = {
  authorized?: boolean;
  formValues?: BathroomRemodelFormValues;
  selectedPhotos?: string[];
};

type ScreenProps = {};

const LoginChecking: React.ComponentType<NavigationStackScreenProps<Params, ScreenProps>> = (props) => {
  const { navigation } = props;
  const authorized = navigation.getParam("authorized", false);
  const formValues = navigation.getParam("formValues", null);
  const selectedPhotos = navigation.getParam("selectedPhotos", []);

  console.log("Login Checking formValues", formValues)

  const loggedIn = React.useContext(LoggedInContext);

  console.log("Login Checking loggedIn", loggedIn)
  console.log("Login Checking authorized", authorized)

  const bootstrapAsync = async () => {
    if (authorized || loggedIn) {
      navigation.navigate("AuthLoading", { formValues, selectedPhotos, "redirectTo" : "PricingScreen" } );
    } else {
      navigation.navigate("LoginScreen", { "redirectFrom": "LoginCheckingScreen" });
    };
  }
  useEffect(() => {
    bootstrapAsync();
  }, [authorized]);

  return (
    <View style={styles.container}>
      <ActivityIndicator />
      <StatusBar barStyle="default" />
    </View>
  )
};

export default React.memo(LoginChecking);