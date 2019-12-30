import Constants from 'expo-constants';
import * as SecureStore from 'expo-secure-store';
import * as WebBrowser from 'expo-web-browser';
import queryString from 'query-string';
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

    // const redirectUrl = AuthSession.getRedirectUrl();
    // const authUrl = `https://${auth0.domain}/authorize?${toQueryString({
    //   client_id: auth0.clientId,
    //   code_challenge: await SecureStore.getItemAsync("codeChallenge"),
    //   code_challenge_method: 'S256',
    //   redirect_uri: redirectUrl,
    //   response_type: 'code',
    //   scope: auth0.scope,
    //   nonce: 'nonce',
    // })}`;
    // console.log("authUrl", authUrl)
    // try {
    //   const result = await AuthSession.startAsync({ authUrl });
    //   if (result.type === 'success') {
    //     const { params: { code } } = result;
    //     await SecureStore.setItemAsync("code", code, {});
    //     await exchangeCodeForTokens();
    //     completeLogin();
    //   } else if (result.type === 'cancel') {
    //     console.log("cancel la")
    //     setLoading(false);
    //   }
    // }
    // catch(err) {
    //   console.log("err: ");
    //   console.log(JSON.stringify(err));
    // };
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