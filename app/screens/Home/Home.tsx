import React from 'react';
import { View } from 'react-native';
import { CardProps } from 'react-native-paper';
import { NavigationStackScreenComponent } from "react-navigation-stack";
import { Headline, TextInput } from 'react-native-paper';

import styles from './styles';

type Params = {
  name?: string;
  profilePictureUri?: string;
};

type ScreenProps = {};

const Home: NavigationStackScreenComponent<Params, ScreenProps> = (props) => {
  const { navigation } = props;

  const handleOnFocus = React.useCallback<CardProps['onPress']>(
    // () => navigation.push("FiximizeQuestionsFormScreen", { step: "address", previousStep: "home" })
    // () => navigation.push("FullRemodelSummaryScreen", { step: "address", previousStep: "home" })
    // () => navigation.push("PropertyInfoScreen", { step: "address", previousStep: "home" })
    // () => navigation.push("AutoCompleteAddressScreen", { step: "autoCompleteAddress", previousStep: "home" })
    // () => navigation.push("ProfitSummaryScreen", { arv: 684171, asIs: 580000, remodellingCost: 71841 })
    () => navigation.push("AutocompleteScreen")
  , [navigation.push]);

  React.useEffect(() => {
    console.log("Home Mount");
    return () => {
      console.log("Home UnMount");
    }
  }, []);

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