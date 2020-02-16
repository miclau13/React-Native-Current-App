import React from 'react';
import { ButtonProps, TextInputProps } from 'react-native-paper';
import { NavigationStackScreenComponent } from "react-navigation-stack";

import TotalDebtsView from './TotalDebtsView';
import  { LoadingComponent } from '../InitialLoading';
import { FiximizeFlow } from '../Autocomplete';
import { eraseComma, validateFormat } from '../../components/NumberInput/utils';

type Params = {
  address: string;
  arvEstimate: number;
  asIsEstimate: number;
  flow: FiximizeFlow;
  postalCode?: string;
};

type ScreenProps = {};

export interface TotalDebtsViewProps {
  handleOnChangeText: TextInputProps['onChangeText'];
  handleOnPress: ButtonProps['onPress'];
  totalDebts: string;
};

const TotalDebts: NavigationStackScreenComponent<Params, ScreenProps> = (props) => {
  const { navigation } = props;
  const flow = navigation.getParam("flow", null);
  const address = navigation.getParam("address", null);
  const postalCode = navigation.getParam("postalCode", null);
  const arvEstimate = navigation.getParam("arvEstimate");
  const asIsEstimate = navigation.getParam("asIsEstimate", null);
  const [loading] = React.useState(false);
  const [totalDebts, setTotalDebts] = React.useState<TotalDebtsViewProps['totalDebts']>("0");

  const handleOnChangeText: TextInputProps['onChangeText'] = (value) => {
    const validValue = validateFormat(value);
    setTotalDebts(validValue);
  };
  const handleOnPress: ButtonProps['onPress'] = () => {
    const _totalDebts = +eraseComma(totalDebts);
    if (_totalDebts < 0) {
      return;
    };
    const stepDefaultValue = flow === FiximizeFlow.AutoCompleteAddress ? 'summary' : 'edit';
    navigation.navigate("PropertyInfoScreen", { flow, address, postalCode, arvEstimate, asIsEstimate, totalDebts: _totalDebts, step: stepDefaultValue });
  };

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