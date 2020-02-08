import React from 'react';
import { ButtonProps, TextInputProps } from 'react-native-paper';
import { NavigationStackScreenComponent } from "react-navigation-stack";

import ArvEstimateView from './ArvEstimateView';
import { LoadingComponent } from '../InitialLoading';
import { eraseComma, validateFormat } from '../../components/NumberInput/utils';

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
  const flow = navigation.getParam("flow", null);
  const postalCode = navigation.getParam("postalCode", null);

  const [loading] = React.useState(false);
  const [arvEstimate, setArvEstimate] = React.useState<ArvEstimateViewProps['arvEstimate']>("0");

  const handleOnChangeText: TextInputProps['onChangeText'] = (value) => {
    const validValue = validateFormat(value);
    setArvEstimate(validValue);
  };

  const handleOnPress: ButtonProps['onPress'] = () => {
    const _arvEstimate = +eraseComma(arvEstimate);
    if (_arvEstimate < 0) {
      return;
    };

    navigation.navigate("AsIsEstimateScreen", { address, postalCode, flow, arvEstimate: _arvEstimate });
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