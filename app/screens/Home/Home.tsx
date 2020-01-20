import { gql } from 'apollo-boost';
import React from 'react';
import { View } from 'react-native';
import { CardProps } from 'react-native-paper';
import { NavigationStackScreenComponent } from "react-navigation-stack";
import { Headline, TextInput } from 'react-native-paper';
import { useQuery } from '@apollo/react-hooks';
import { LoadingComponent } from '../InitialLoading';

import styles from './styles';

import * as SecureStore from 'expo-secure-store';
import { StackActions, NavigationActions } from 'react-navigation';

type Params = {
  name?: string;
  profilePictureUri?: string;
};

type ScreenProps = {};

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
    // () => navigation.push("FiximizeQuestionsFormScreen", { step: "address", previousStep: "home" })
    // () => navigation.push("FullRemodelSummaryScreen", { step: "address", previousStep: "home" })
    // () => navigation.push("PropertyInfoScreen", { step: "address", previousStep: "home" })
    // () => navigation.push("AutoCompleteAddressScreen", { step: "autoCompleteAddress", previousStep: "home" })
    // () => navigation.push("ProfitSummaryScreen", { arv: 684171, asIs: 580000, remodellingCost: 71841, step: "summary" })
    () => navigation.push("AutocompleteScreen")
    // () => navigation.push("ProfitAdjustmentScreen", { arv: 100000 })
  , [navigation.push]);

  React.useEffect(() => {
    console.log("Home Mount");
    return () => {
      console.log("Home UnMount");
    }
  }, []);

  React.useEffect(() => {
    console.log('checking the authetication')
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
    <View style={styles.container}>
      <View style={styles.keyBoardContainer}>
        <View style={styles.viewBox1}/>
        <Headline>What's the address of your property?</Headline>
        <View style={styles.viewBox1}/>
        <TextInput
          keyboardType="default"
          label="Address"
          mode="outlined"
          onFocus={handleOnFocus}
          textContentType="fullStreetAddress"
        />
        <View style={styles.viewBox3}/>
      </View>
    </View>
  )
};

export default React.memo(Home);