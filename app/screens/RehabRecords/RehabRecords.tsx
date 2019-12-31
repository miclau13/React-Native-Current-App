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
    }
  }
`;

const RehabRecords: NavigationStackScreenComponent<Params, ScreenProps> = (props) => {
  const { navigation } = props;
  const { data, loading, refetch } = useQuery(MY_REHAB_REQUESTS);
  // const [loading, setLoading] = React.useState(false);
  // console.log("RehabRecords data", data && data.myRehabRequests);

  const handleItemOnPress = index => (event) => {
    navigation.push("RehabRecordsDetailScreen", { detail: data.myRehabRequests[index]} );
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
      rehabRecords={data.myRehabRequests}
    />
  )
};

export default React.memo(RehabRecords);