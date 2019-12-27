import { encode as btoa } from 'base-64'
import { AuthSession } from 'expo';
import * as Crypto from 'expo-crypto';
import * as Random from 'expo-random';
import * as SecureStore from 'expo-secure-store';
import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { ActivityIndicator, Linking, StatusBar, Text, View } from 'react-native';
import { Button } from "react-native-elements";
import { NavigationStackScreenComponent } from 'react-navigation-stack';

import styles from "./styles";
import strings from "./strings";
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

function toQueryString(params: object) {
  return (
    Object.entries(params)
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
      )
      .join('&')
  );
};

function base64URLEncode(input: Uint8Array | string) {
  const result = typeof input === 'string' ? input : btoa(String.fromCharCode.apply(null, input));
  const output = result
                  .replace(/\+/g, '-')
                  .replace(/\//g, '_')
                  .replace(/=/g, '')
  return output;
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
  const [URI, setURI] = React.useState("");

  const generateCodeVerifier = async () => {
    const randomBytes = await Random.getRandomBytesAsync(32);
    const verifier = base64URLEncode(randomBytes);
    return verifier;
  };

  const generateCodeChallenge = async (verifier: string) => {
    const digest = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      verifier,
      { encoding: Crypto.CryptoEncoding.BASE64 }
    );
    const challenge = base64URLEncode(digest);
    await SecureStore.setItemAsync("codeVerifier", verifier, {});
    await SecureStore.setItemAsync("codeChallenge", challenge, {});
    return;
  };

  const exchangeCodeForTokens = async () => {
    const formData = {
      grant_type: 'authorization_code',
      client_id: auth0.clientId,
      code_verifier: await SecureStore.getItemAsync("codeVerifier"),
      code:  await SecureStore.getItemAsync("code"),
      redirect_uri: AuthSession.getRedirectUrl(),
    };
    const options = {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body: toQueryString(formData),
    };
    try {
      const response = await fetch(`https://${auth0.domain}/oauth/token`, options);
      const responseJson = await response.json();
      const { access_token, id_token, refresh_token } = responseJson;
      const userResponse = await fetch(localhostConfig.uri, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({access_token})
      });
      SecureStore.setItemAsync("accessToken", access_token, {});
      SecureStore.setItemAsync("idToken", id_token, {});
      SecureStore.setItemAsync("refreshToken", refresh_token, {});
    } catch (error) {
      console.error(error);
    }
  }

  const completeLogin = React.useCallback(() => {
    if (redirectFrom) {
      navigation.navigate(redirectFrom, { authorized: true });
    } else {
      navigation.navigate("MainNavigator");
    }
  }, [navigation]);

  const login = async () => {
    setLoading(true);
    // const response = await fetch("http://192.168.100.89:3000/auth/fiximize-login");
    // const responseURI = await response.json();
    // console.log({response})
    // console.log({responseURI})
    // await WebBrowser.openAuthSessionAsync(responseURI, responseURI);
    // setLoading(false);

    const redirectUrl = AuthSession.getRedirectUrl();
    const authUrl = `https://${auth0.domain}/authorize?${toQueryString({
      client_id: auth0.clientId,
      code_challenge: await SecureStore.getItemAsync("codeChallenge"),
      code_challenge_method: 'S256',
      redirect_uri: redirectUrl,
      response_type: 'code',
      scope: auth0.scope,
      nonce: 'nonce',
      // returnUrl: "https://dev-agent.trudeed.com/auth/login"
    })}`;
    console.log("authUrl", authUrl)
    try {
      const result = await AuthSession.startAsync({ authUrl });
      if (result.type === 'success') {
        const { params: { code } } = result;
        await SecureStore.setItemAsync("code", code, {});
        await exchangeCodeForTokens();
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
  };



  React.useEffect(() => {
    console.log("Login Mount");
    generateCodeVerifier().then(verifier => generateCodeChallenge(verifier));
    // testing();
    return () => {console.log("Login UnMount");};
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    )
  };

  return (
    <View style={styles.container}>
      <Text>Please Login to get the estimate price.</Text>
      <Button title={strings.loginTitle} onPress={login} />
    </View>
  )
};

export default React.memo(Login);