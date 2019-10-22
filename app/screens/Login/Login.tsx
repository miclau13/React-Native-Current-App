import { encode as btoa } from 'base-64'
import { AuthSession } from 'expo';
import * as Crypto from 'expo-crypto';
import * as Random from 'expo-random';
import * as SecureStore from 'expo-secure-store';
import jwtDecode from 'jwt-decode';
import React from 'react';
import { Text, View } from 'react-native';
import config from '../../../config';
import { Button } from "react-native-elements";
import { NavigationStackScreenComponent } from 'react-navigation-stack';

import styles from "./styles";
import strings from "./strings";

type Params = {};

type ScreenProps = {};

function toQueryString(params: object) {
  return (
    Object.entries(params)
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
      )
      .join('&')
  );
}

function base64URLEncode(input: Uint8Array | string) {
  const result = typeof input === 'string' ? input : btoa(String.fromCharCode.apply(null, input));
  const output = result
                  .replace(/\+/g, '-')
                  .replace(/\//g, '_')
                  .replace(/=/g, '')
  return output;
}

const Login: NavigationStackScreenComponent<Params, ScreenProps> = (props) => {
  const auth0 = {
    domain: config.AUTH0_DOMAIN,
    clientId: config.AUTH0_CLIENT_ID,
    scope: config.AUTHO_SCOPE,
  };

  const { navigation } = props;

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
      SecureStore.setItemAsync("accessToken", access_token, {});
      SecureStore.setItemAsync("idToken", id_token, {});
      SecureStore.setItemAsync("refreshToken", refresh_token, {});
    } catch (error) {
      console.error(error);
    }
  }

  React.useEffect(() => {
    generateCodeVerifier().then(verifier => generateCodeChallenge(verifier));
    return () => {};
  }, []);

  const gotoHome = (data) => {
    navigation.navigate(
      "HomeScreen",
      {
        name: data.name,
        profilePictureUri: data.picture
      }
    );
  }

  const login = async () => {
    const redirectUrl = AuthSession.getRedirectUrl();
    const authUrl = `https://${auth0.domain}/authorize?${toQueryString({
      client_id: auth0.clientId,
      code_challenge: await SecureStore.getItemAsync("codeChallenge"),
      code_challenge_method: 'S256',
      redirect_uri: redirectUrl,
      response_type: 'code',
      scope: auth0.scope,
      nonce: 'nonce',
    })}`;
    try {
      const result = await AuthSession.startAsync({ authUrl });
      if (result.type === 'success') {

        const { params: { code } } = result;
        await SecureStore.setItemAsync("code", code, {});
        await exchangeCodeForTokens();
        const data = jwtDecode(await SecureStore.getItemAsync("idToken"));
        gotoHome(data);
      }
    }
    catch(err) {
      console.log("err: ");
      console.log(JSON.stringify(err));
    }
  }

  return (
    <View style={styles.container}>
      <Text>This is the Login.</Text>
      <Button title={strings.loginTitle} onPress={login} />
    </View>
  )
};

export default Login;