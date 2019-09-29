import { AuthSession } from 'expo';
import * as SecureStore from 'expo-secure-store';
import jwtDecode from 'jwt-decode';
import React from 'react';
import { Text, View } from 'react-native';
import { AUTH0_DOMAIN, AUTH0_CLIENT_ID, AUTHO_SCOPE, AUTH0_AUDIENCE } from 'react-native-dotenv'
import { Button } from "react-native-elements";
import { NavigationStackScreenComponent } from 'react-navigation-stack';

import styles from "./styles";
import strings from "./strings";

type Params = {};

type ScreenProps = {};

function toQueryString(params: object) {
  return (
    '?' +
    Object.entries(params)
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
      )
      .join('&')
  );
}

const Login: NavigationStackScreenComponent<Params, ScreenProps> = (props) => {
  const auth0 = {
    domain: AUTH0_DOMAIN,
    clientId: AUTH0_CLIENT_ID,
    scope: AUTHO_SCOPE,
  };

  const { navigation } = props;

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
    const authUrl = `https://${auth0.domain}/authorize${toQueryString({
      client_id: auth0.clientId,
      redirect_uri: redirectUrl,
      response_type: 'id_token token',
      scope: auth0.scope,
      nonce: 'nonce',
    })}`;
    try {
      const result = await AuthSession.startAsync({ authUrl });
      if (result.type === 'success') {
        const { params: { access_token, id_token } } = result;
        const jwtToken = id_token;
        const data = jwtDecode(jwtToken);
        SecureStore.setItemAsync("accessToken", access_token, {});
        SecureStore.setItemAsync("idToken", id_token, {});
        // SecureStore.setItemAsync("refreshToken", res.refreshToken, {});
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