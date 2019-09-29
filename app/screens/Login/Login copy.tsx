import Expo from 'expo';
import * as SecureStore from 'expo-secure-store';
import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Platform, Text, View } from 'react-native';
import Auth0 from "react-native-auth0";
import { AUTH0_DOMAIN, AUTH0_CLIENT_ID, AUTHO_SCOPE, AUTH0_AUDIENCE } from 'react-native-dotenv'
import { Button } from "react-native-elements";
import { NavigationActions, NavigationScreenProps, StackActions } from "react-navigation";

import styles from "./styles";
import strings from "./strings";


export interface LoginProps extends NavigationScreenProps {

};

const Login: React.SFC<LoginProps> = (props) => {
  const auth0 = new Auth0({
    domain: AUTH0_DOMAIN,
    clientId: AUTH0_CLIENT_ID
  });

  const { navigation: { navigate } } = props;
  const [hasInitialized, setHasInitialized] = useState(false);

  const handleHomeButtonOnPress = () => navigate("HomeScreen");
  const gotoAccount = (data) => {
    console.log({data});
    setHasInitialized(true);

    const resetAction = StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({
          routeName: "Account",
          params: {
            name: data.name,
            picture: data.picture
          }
        })
      ]
    });

    props.navigation.dispatch(resetAction);

    // navigate(
    //   "HomeScreen", 
    //   {
    //     name: data.name,
    //     picture: data.picture
    //   }
    // );
  }

  const login = () => {
    // console.log("0.",NativeModules)
    console.log("login",auth0)
    // console.log("0",NativeModules)
    // console.log("1",NativeModules.SettingsManager.clientUniqueId)
    // console.log("2",NativeModules.PlatformConstants.fingerprint)
    console.log("3",Platform.OS)
    auth0.webAuth
      .authorize({
        scope: AUTHO_SCOPE,
        audience: AUTH0_AUDIENCE,
        // device: Platform.OS === 'ios' ? NativeModules.SettingsManager.clientUniqueId : NativeModules.PlatformConstants.fingerprint,
        prompt: "login" 
      })
      .then(res => {
        // next: add code for getting user info
        console.log({res});
        auth0.auth
          .userInfo({ token: res.accessToken })
          .then(data => {
            gotoAccount(data);
          })
          .catch(err => {
            console.log("err: ");
            console.log(JSON.stringify(err));
          });

        SecureStore.setItemAsync("accessToken", res.accessToken, {});
        SecureStore.setItemAsync("refreshToken", res.refreshToken, {});

      })
      .catch(error => {
        console.log("error occurred while trying to authenticate: ", error);
      });
  }

  useEffect(() =>{
    console.log({auth0})
    console.log(AUTH0_DOMAIN)
    SecureStore.getItemAsync("accessToken", {}).then(accessToken => {
      if (accessToken) {
        // next: get user details
        auth0.auth
          .userInfo({ token: accessToken })
          .then(data => {
            gotoAccount(data);
          })
          .catch(err => {
            // next: add code for dealing with invalid access token
            SecureStore.getItemAsync("refreshToken", {}).then(refreshToken => { // get the refresh token from the secure storage
              // request for a new access token using the refresh token 
              auth0.auth
                .refreshToken({ refreshToken: refreshToken })
                .then(newAccessToken => {
                  SecureStore.setItemAsync("accessToken", newAccessToken, {});
                  Expo.Updates.reload();
                })
                .catch(accessTokenErr => {
                  console.log("error getting new access token: ", accessTokenErr);
                });
            });
          });
      } else {
        // no access token
        setHasInitialized(true);
      }
    });
  })
  return (
    <View style={styles.container}>
      <Text>This is the Login.</Text>
      <ActivityIndicator
        size="large"
        color="#05a5d1"
        animating={!hasInitialized}
      />
      {hasInitialized && (
        <Button title={strings.loginTitle} onPress={login} />
      )}
      
    </View>
  )
};

export default Login;