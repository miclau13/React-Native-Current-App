import Constants from 'expo-constants';
import * as SecureStore from 'expo-secure-store';
import * as WebBrowser from 'expo-web-browser';
import queryString from 'query-string';
import React from 'react';
import { NavigationStackScreenComponent } from 'react-navigation-stack';

import LoginView from './LoginView';
import { LoadingComponent } from '../InitialLoading';

type Params = {
  redirectFrom?: string;
};

type ScreenProps = {};

const LOGINURL_PROD = "https://portal.trudeed.com/auth/fiximize-login";
const LOGINURL_DEV = "https://dev-agent.trudeed.com/auth/fiximize-login";
const LOGINURL_LOCALHOST = "http://192.168.100.89:3000/auth/fiximize-login";

const Login: NavigationStackScreenComponent<Params, ScreenProps> = (props) => {
  const { navigation } = props;
  const redirectFrom = navigation.getParam("redirectFrom", null);
  const [loading, setLoading] = React.useState(false);

  const completeLogin = React.useCallback(() => {
    if (redirectFrom) {
      navigation.navigate(redirectFrom, { authorized: true });
    } else {
      navigation.navigate("MainNavigator");
    }
  }, [navigation]);

  const handleLoginOnPress = async () => {
    setLoading(true);
    const deviceId = await SecureStore.getItemAsync("deviceId", {});
    if(!deviceId) {
      await SecureStore.setItemAsync("deviceId", Constants.sessionId);
    };
    const response = await fetch(LOGINURL_LOCALHOST, {
      method: 'get',
      headers: {
        "device-id": deviceId,
      }
    });
    const responseURI = await response.json();
    // console.log("responseURI", responseURI)
    try {
      const result = await WebBrowser.openAuthSessionAsync(responseURI, responseURI);
      const accessToken = queryString.parseUrl(result["url"]).query.accessToken;
      await SecureStore.setItemAsync("accessToken", accessToken as string);
      if (result.type === 'success') {
        completeLogin();
      } else if (result.type === 'cancel') {
        console.log("cancel la")
        setLoading(false);
      }
    }
    catch(err) {
      console.log("err: ");
      console.log(JSON.stringify(err));
    };
    setLoading(false);
  };

  React.useEffect(() => {
    console.log("Login Mount");
    return () => {console.log("Login UnMount");};
  }, []);

  if (loading) {
    return (
      <LoadingComponent />
    )
  };

  return (
    <LoginView handleOnPress={handleLoginOnPress}/>
  )
};

export default React.memo(Login);