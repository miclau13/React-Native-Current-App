
import ApolloClient from 'apollo-boost';
import * as SecureStore from 'expo-secure-store';
import React from 'react';

import { ApolloProvider } from '@apollo/react-hooks';

import AppComponent from './app/App';
import { LoggedInProvider } from './app/common/LoggedInContext';

  const client = new ApolloClient({
    request: async (operation) => {
      const token = await SecureStore.getItemAsync("accessToken", {});
      const deviceId = await SecureStore.getItemAsync("deviceId", {});
      operation.setContext({
        headers: {
          deviceId,
          authorization: token ? `Bearer ${token}` : '',
        }
      })
    },
    // Connect to backend
    uri: 'https://',
  });

const App = () => {
  return (
    <LoggedInProvider>
      <ApolloProvider client={client}>
        <AppComponent />
      </ApolloProvider> 
    </LoggedInProvider>
  );
};

export default App;