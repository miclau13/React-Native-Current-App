import React from 'react';
import { ButtonProps, TextInputProps } from 'react-native-paper';
import { NavigationStackScreenComponent } from "react-navigation-stack";

import AsIsEstimateView from './AsIsEstimateView';
import  { LoadingComponent } from '../InitialLoading';

type Params = {
  address: string;
};

type ScreenProps = {};

const AsIsEstimate: NavigationStackScreenComponent<Params, ScreenProps> = (props) => {
  const { navigation } = props;
  const address = navigation.getParam("address", null);
  const [loading, setLoading] = React.useState(false);
  const [asIsEstimate, setAsIsEstimate] = React.useState("1");

  const handleOnChangeText: TextInputProps['onChangeText'] = (text) => {
    setAsIsEstimate(text);
  };

  const handleOnPress: ButtonProps['onPress'] = () => {
    if (asIsEstimate.length < 1 || +asIsEstimate < 0) {
      return;
    };
    navigation.navigate("TotalDebtsScreen", { address, asIsEstimate: +asIsEstimate });
  };

  React.useEffect(() => {
    console.log("AsIsEstimate Mount");
    return () => {
      console.log("AsIsEstimate UnMount");
    }
  }, []);

  if (loading) {
    return (
     <LoadingComponent />
    )
  };

  return (
    <AsIsEstimateView 
      handleOnChangeText={handleOnChangeText}
      handleOnPress={handleOnPress}
      asIsEstimate={asIsEstimate}
    />
  )
};

export default React.memo(AsIsEstimate);