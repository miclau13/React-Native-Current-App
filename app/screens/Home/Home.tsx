import React from 'react';
import { CardProps } from 'react-native-paper';
import { NavigationStackScreenComponent } from "react-navigation-stack";

import HomeView from './HomeView';

type Params = {};

type ScreenProps = {};

export type HomeProps = {
  handleOnFocus: CardProps['onPress'];
};

const Home: NavigationStackScreenComponent<Params, ScreenProps> = (props) => {
  const { navigation } = props;

  const handleOnFocus = React.useCallback<HomeProps['handleOnFocus']>(
    // () => navigation.push("FiximizeQuestionsFormScreen", { step: "address", previousStep: "home" })
    // () => navigation.push("FullRemodelSummaryScreen", { step: "address", previousStep: "home" })
    // () => navigation.push("PropertyInfoScreen", { step: "address", previousStep: "home" })
    // () => navigation.push("AutoCompleteAddressScreen", { step: "autoCompleteAddress", previousStep: "home" })
    // () => navigation.push("ProfitSummaryScreen", { arv: 684171, asIs: 580000, remodellingCost: 71841, step: "summary" })
    () => {
      navigation.push("AutocompleteScreen")
    }
    // () => navigation.push("ProfitAdjustmentScreen", { arv: 100000 })
  , [navigation.push]);

  React.useEffect(() => {
    // console.log("Home Mount");
    return () => {
      // console.log("Home UnMount");
    }
  }, []);

  return (
    <HomeView 
      handleOnFocus={handleOnFocus}
    />
  )
};

export default React.memo(Home);