import { gql } from 'apollo-boost';
import React from 'react';
import { NavigationStackScreenComponent } from "react-navigation-stack";

import { useQuery } from '@apollo/react-hooks';

import RehabRecordsView from './RehabRecordsView';
import { LoadingComponent } from '../InitialLoading';

type Params = {};

type ScreenProps = {};

const MY_REHAB_REQUESTS = gql`
  query MyRehabRequests {
    myRehabRequests {
      id
      address
      arv
      asIs
      propertyDetails
      vacant
      totalDebts
      rehabItemsPackage {
        id
        rehabItems {
          category
          cost
          name
        }
      }
    }
  }
`;

const RehabRecords: NavigationStackScreenComponent<Params, ScreenProps> = (props) => {
  const { navigation } = props;
  const { data, loading } = useQuery(MY_REHAB_REQUESTS);
  const myRehabRequests = data && data.myRehabRequests || [];

  const handleItemOnPress = index => (event) => {
    navigation.push("RehabRecordsDetailScreen", { detail: myRehabRequests[index]} );
  }

  React.useEffect(() => {
    console.log("RehabRecords Mount");
    return () => {
      console.log("RehabRecords UnMount");
    }
  }, []);

  if (loading) {
    return (
      <LoadingComponent />
    )
  };

  return (
    <RehabRecordsView 
      handleItemOnPress={handleItemOnPress}
      rehabRecords={myRehabRequests}
    />
  )
};

export default React.memo(RehabRecords);