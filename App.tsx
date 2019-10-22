import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import * as SecureStore from 'expo-secure-store';
import React from 'react';
import AppComponent from './app/App';

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
  });

const App = () => {
  return (
    <ApolloProvider client={client}>
      <AppComponent />
    </ApolloProvider> 
  );
};

export default App;