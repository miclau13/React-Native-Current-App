import Constants from 'expo-constants';
import * as SecureStore from 'expo-secure-store';
import * as WebBrowser from 'expo-web-browser';
import queryString from 'query-string';
import React from 'react';
import { ButtonProps } from 'react-native-paper';
import { NavigationStackScreenComponent } from 'react-navigation-stack';

import LoginView from './LoginView';
import { LoadingComponent } from '../InitialLoading';

type Params = {
  redirectFrom?: string;
};

type ScreenProps = {};

export interface LoginViewProps {
  handleLoginOnPress: ButtonProps['onPress'];
};

const REDIRECT_URL_PROD = "https://portal.trudeed.com/auth/fiximize-login";
const RETURN_URL_PROD = "fiximize://";

const Login: NavigationStackScreenComponent<Params, ScreenProps> = (props) => {
  const { navigation } = props;
  const redirectFrom = navigation.getParam("redirectFrom", null);
  const [loading, setLoading] = React.useState(false);

  const completeLogin = () => {
    if (redirectFrom) {
      navigation.navigate(redirectFrom, { authorized: true });
    } else {
      navigation.navigate("MainNavigator");
    }
  };

  const getDeviceId = async () => {
    const deviceId = await SecureStore.getItemAsync("deviceId", {});
    if(!deviceId) {
      await SecureStore.setItemAsync("deviceId", Constants.sessionId);
    };
    return deviceId;
  };

  const getRedirectUri = async (args: { deviceId: string }) => {
    const response = await fetch(REDIRECT_URL_PROD, {
      method: 'get',
      headers: {
        "device-id": args.deviceId,
      }
    });
    const responseURI = await response.json();
    return responseURI;
  };

  const startLogin = async (args: { redirectUri: string }) => {
    const result = await WebBrowser.openAuthSessionAsync(args.redirectUri, RETURN_URL_PROD);
    const accessToken = queryString.parseUrl(result["url"]).query.accessToken;
    await SecureStore.setItemAsync("accessToken", accessToken as string);
    return result.type;
  };

  const handleLogin = async () => {
    const deviceId = await getDeviceId();
    const redirectUri = await getRedirectUri({ deviceId });
    const loginStatus = await startLogin({ redirectUri });
    setLoading(false);
        // Status can also be cancel/dismiss
    if (loginStatus === 'success') {
      completeLogin();
    };
  };

  const handleLoginOnPress: LoginViewProps['handleLoginOnPress'] = async () => {
    setLoading(true);
    try {
      await handleLogin();
    } catch(err) {
      console.log("err: ");
      console.log(JSON.stringify(err));
      setLoading(false);
    };
  };

  if (loading) {
    return (
      <LoadingComponent />
    )
  };

  return (
    <LoginView handleLoginOnPress={handleLoginOnPress}/>
  )
};

export default React.memo(Login);