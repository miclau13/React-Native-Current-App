import React from 'react';
import { ButtonProps, TextInputProps } from 'react-native-paper';
import { NavigationStackScreenComponent } from "react-navigation-stack";

import TotalDebtsView from './TotalDebtsView';
import  { LoadingComponent } from '../InitialLoading';
import { FiximizeFlow } from '../FiximizeQuestions/Autocomplete';

type Params = {
  flow: FiximizeFlow;
  address: string;
  postalCode?: string;
  arvEstimate?: string;
  asIsEstimate: number;
};

type ScreenProps = {};

const TotalDebts: NavigationStackScreenComponent<Params, ScreenProps> = (props) => {
  const { navigation } = props;
  const flow = navigation.getParam("flow", null);
  const address = navigation.getParam("address", null);
  const postalCode = navigation.getParam("postalCode", null);
  const arvEstimate = navigation.getParam("arvEstimate");
  const asIsEstimate = navigation.getParam("asIsEstimate", null);
  const [loading, setLoading] = React.useState(false);
  const [totalDebts, setTotalDebts] = React.useState("0");

  const handleOnChangeText: TextInputProps['onChangeText'] = (text) => {
    setTotalDebts(text);
  };

  const handleOnPress: ButtonProps['onPress'] = () => {
    if (totalDebts.length < 1 || +totalDebts < 0) {
      return;
    };
    const stepDefaultValue = flow === FiximizeFlow.AutoCompleteAddress ? 'summary' : 'edit';
    navigation.navigate("PropertyInfoScreen", { flow, address, postalCode, arvEstimate, asIsEstimate, totalDebts: +totalDebts, step: stepDefaultValue });
  };

  React.useEffect(() => {
    console.log("TotalDebts Mount");
    return () => {
      console.log("TotalDebts UnMount");
    }
  }, []);

  if (loading) {
    return (
      <LoadingComponent />
    )
  };

  return (
    <TotalDebtsView 
      handleOnChangeText={handleOnChangeText}
      handleOnPress={handleOnPress}
      totalDebts={totalDebts}
    />
  )
};

export default React.memo(TotalDebts);