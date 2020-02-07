import React from 'react';
import { ButtonProps, TextInputProps } from 'react-native-paper';
import { NavigationStackScreenComponent } from "react-navigation-stack";

import ArvEstimateView from './ArvEstimateView';
import  { LoadingComponent } from '../InitialLoading';

type Params = {
  address: string;
  postalCode: string;
  flow: string;
};

type ScreenProps = {};

export interface ArvEstimateViewProps {
  handleOnChangeText: TextInputProps['onChangeText'];
  handleOnPress: ButtonProps['onPress'];
  arvEstimate: string;
};

const ArvEstimate: NavigationStackScreenComponent<Params, ScreenProps> = (props) => {
  const { navigation } = props;
  const address = navigation.getParam("address", null);
  const postalCode = navigation.getParam("postalCode", null);
  const flow = navigation.getParam("flow", null);
  const [loading] = React.useState(false);
  const [arvEstimate, setArvEstimate] = React.useState("999");

  const handleOnChangeText: TextInputProps['onChangeText'] = (text) => {
    setArvEstimate(text);
  };

  const handleOnPress: ButtonProps['onPress'] = () => {
    if (arvEstimate.length < 1 || +arvEstimate < 0) {
      return;
    };
    navigation.navigate("AsIsEstimateScreen", { address, postalCode, flow, arvEstimate: +arvEstimate });
  };

  if (loading) {
    return (
      <LoadingComponent />
    )
  };

  return (
    <ArvEstimateView 
      handleOnChangeText={handleOnChangeText}
      handleOnPress={handleOnPress}
      arvEstimate={arvEstimate}
    />
  )
};

export default React.memo(ArvEstimate);