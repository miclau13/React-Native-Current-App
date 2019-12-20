import React from 'react';
import { ButtonProps, TextInputProps } from 'react-native-paper';
import { NavigationStackScreenComponent } from "react-navigation-stack";

import TotalDebtsView from './TotalDebtsView';
import  { LoadingComponent } from '../InitialLoading';

type Params = {
  address: string;
  asIsEstimate: number;
};

type ScreenProps = {};

const TotalDebts: NavigationStackScreenComponent<Params, ScreenProps> = (props) => {
  const { navigation } = props;
  const address = navigation.getParam("address", null);
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
    navigation.navigate("PropertyInfoScreen", { address, asIsEstimate, totalDebts: +totalDebts });
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