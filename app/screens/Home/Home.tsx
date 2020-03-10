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

export const VIEWER_QUERY = gql`
  query Viewer {
    viewer {
      id
      address
      givenName
      email
      familyName
      picture
      phoneNumber
    }
  }
`;

const Home: NavigationStackScreenComponent<Params, ScreenProps> = (props) => {
  const { navigation } = props;
  const { data, error, loading } = useQuery(VIEWER_QUERY);
  const handleOnFocus = React.useCallback<CardProps['onPress']>(
    () => navigation.push("AutocompleteScreen")
    // () => navigation.push("ContactPhoneNumberScreen")
    // () => navigation.push("ArvEstimateScreen", { 
    //   address: "13807 SE Allen Rd, Bellevue, WA, 98006", 
    //   flow: 0, 
    // })
    // () => navigation.push("AsIsEstimateScreen")
    // () => navigation.push("PropertyInfoScreen", { 
    //   address: "13807 SE Allen Rd, Bellevue, WA, 98006", 
    //   flow: 0, 
    //   arvEstimate: 1,
    //   asIsEstimate: 1,
    //   totalDebts: 0,
    //   step: 'summary',
    //   postalCode: '13807'
    // })
    , [navigation.push]
  );

  React.useEffect(() => {
    if (!loading && error) {
      navigation.navigate("AuthNavigator");
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