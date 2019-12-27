import Constants from 'expo-constants';
import * as SecureStore from 'expo-secure-store';
import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { NavigationStackScreenComponent } from 'react-navigation-stack';

import LoginView from './LoginView';
import { LoadingComponent } from '../InitialLoading';
import config from '../../../config';

type Params = {
  redirectFrom?: string;
};

type ScreenProps = {};

const prodConfig = {
  uri: "https://agent.trudeed.com/auth/fiximize-viewer"
};
const devConfig = {
  uri: "https://dev-agent.trudeed.com/auth/fiximize-viewer"
};
const localhostConfig = {
  uri: "http://192.168.100.89:3000/auth/fiximize-viewer"
};

const auth0 = {
  domain: config.AUTH0_DOMAIN,
  clientId: config.AUTH0_CLIENT_ID,
  scope: config.AUTHO_SCOPE,
};

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
    const response = await fetch("http://192.168.100.89:3000/auth/fiximize-login", {
      method: 'get',
      headers: {
        "device-id": deviceId,
      }
    });
    const responseURI = await response.json();
    try {
      const result = await WebBrowser.openAuthSessionAsync(responseURI, responseURI);
      console.log("result indside handleLoginOnPress",result)
      if (result.type === 'success') {
        console.log("result", result)
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