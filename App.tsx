
import ApolloClient from 'apollo-boost';
import * as SecureStore from 'expo-secure-store';
import React from 'react';

import { ApolloProvider } from '@apollo/react-hooks';

import AppComponent from './app/App';
import { LoggedInProvider } from './app/common/LoggedInContext';

  const client = new ApolloClient({
    request: async (operation) => {
      const token = await SecureStore.getItemAsync("accessToken", {});
      operation.setContext({
        headers: {
          authorization: token ? `Bearer ${token}` : ''
        }
      })
    },
    uri: 'https://dev-agent.trudeed.com/graphql',
    // uri: 'http://192.168.100.89:3000/graphql',
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