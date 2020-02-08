import React from 'react';
import { ButtonProps, TextInputProps } from 'react-native-paper';
import { NavigationStackScreenComponent } from "react-navigation-stack";

import AsIsEstimateView from './AsIsEstimateView';
import  { LoadingComponent } from '../InitialLoading';
import { eraseComma, validateFormat } from '../../components/NumberInput/utils';

type Params = {
  flow: string;
  address: string;
  arvEstimate: number;
  postalCode?: string;
};

type ScreenProps = {};

export interface AsIsEstimateViewProps {
  handleOnChangeText: TextInputProps['onChangeText'];
  handleOnPress: ButtonProps['onPress'];
  asIsEstimate: string;
};

const AsIsEstimate: NavigationStackScreenComponent<Params, ScreenProps> = (props) => {
  const { navigation } = props;
  const flow = navigation.getParam('flow')
  const address = navigation.getParam("address", null);
  const postalCode = navigation.getParam("postalCode", null);
  const arvEstimate = navigation.getParam("arvEstimate", null);
  const [loading] = React.useState(false);
  const [asIsEstimate, setAsIsEstimate] = React.useState<AsIsEstimateViewProps['asIsEstimate']>("0");

  const handleOnChangeText: TextInputProps['onChangeText'] = (value) => {
    const validValue = validateFormat(value);
    setAsIsEstimate(validValue);
  };
  const handleOnPress: ButtonProps['onPress'] = () => {
    const _asIsEstimate = +eraseComma(asIsEstimate);
    if (_asIsEstimate < 0) {
      return;
    };
    navigation.navigate("TotalDebtsScreen", { arvEstimate, flow, address, postalCode, asIsEstimate: +asIsEstimate });
  };

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