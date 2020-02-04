import { gql } from 'apollo-boost';
import React from 'react';
import { CardProps } from 'react-native-paper';
import { NavigationStackScreenComponent } from "react-navigation-stack";
import { useQuery } from '@apollo/react-hooks';

import HomeView from './HomeView';
import { LoadingComponent } from '../InitialLoading';

type Params = {
  name?: string;
  profilePictureUri?: string;
};

type ScreenProps = {};

export interface HomeViewProps {
  handleOnFocus: CardProps['onPress'];
};

const VIEWER = gql`
  query Viewer {
    viewer {
      id
      givenName
      familyName
      picture
      email
      phoneNumber
      address
    }
  }
`;

const Home: NavigationStackScreenComponent<Params, ScreenProps> = (props) => {
  const { navigation } = props;
  const { data, error, loading } = useQuery(VIEWER);
  const handleOnFocus = React.useCallback<CardProps['onPress']>(
    () => navigation.push("AutocompleteScreen"), 
    [navigation.push]
  );

  React.useEffect(() => {
    console.log("Home Mount");
    return () => {
      console.log("Home UnMount");
    }
  }, []);

  React.useEffect(() => {
    if (!loading && error) {
      navigation.navigate("AuthTabs");
    }
  }, [error, data, loading]);

  if (loading) {
    return (
      <LoadingComponent />
    );
  };

  return (
    <HomeView handleOnFocus={handleOnFocus} />
  )
};

export default React.memo(Home);