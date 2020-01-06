import React from 'react';
import { ButtonGroupProps } from 'react-native-elements';
import { ButtonProps, TextInputProps } from 'react-native-paper';

import ProfitAdjustmentView from './ProfitAdjustmentView';
import { Params as ProfitSummaryParams, ProfitSummaryProps } from '../ProfitSummary';

export interface ProfitAdjustmentInnerProps {
  _arv: ProfitAdjustmentState['_arv'];
  _asIs: ProfitAdjustmentState['_asIs'];
  _vacant: ProfitAdjustmentState['_vacant'];
  buttons: ('NO' | 'YES')[];
  handleOnChangeText(key: string): TextInputProps['onChangeText'];
  handleOnPress: ButtonProps['onPress'];
  handleVacantOnPress: ButtonGroupProps['onPress'];
};
export interface ProfitAdjustmentOuterProps {
  arv: ProfitSummaryParams['arv'];
  asIs: ProfitSummaryParams['asIs'];
  handleStepNavigation: ProfitSummaryProps['handleStepNavigation'];
  vacant: ProfitSummaryParams['vacant'];
};

export type ProfitAdjustmentState = {
  _arv: string;
  _asIs: string;
  _handleStepNavigation: ProfitAdjustmentOuterProps['handleStepNavigation'];
  _vacant: number;
};

const ProfitAdjustment: React.ComponentType<ProfitAdjustmentOuterProps>  = (props) => {
  const { arv, asIs, handleStepNavigation, vacant } = props;
  const [_arv, set_arv] = React.useState<ProfitAdjustmentState['_arv']>(arv.toString());
  const [_asIs, set_asIs] = React.useState<ProfitAdjustmentState['_asIs']>(asIs.toString());
  const [_vacant, set_vacant] = React.useState<ProfitAdjustmentState['_vacant']>(vacant ? 1 : 0);

  const handleOnChangeText: ProfitAdjustmentInnerProps['handleOnChangeText'] = (key) => (text) => {
    if (key === "ARV") {
      set_arv(text);
    } else if (key === "ASIS"){
      set_asIs(text);
    }
  };

  const handleOnPress: ProfitAdjustmentInnerProps['handleOnPress'] = () => {
    if (_arv.length < 1 || _asIs.length < 1) {
      return;
    };
    console.log("ProfitAdjustment handleOnPress !!_vacant", !!_vacant)
    handleStepNavigation("summary", { arv: +_arv, asIs: +_asIs, vacant: !!_vacant });
  };

  const handleVacantOnPress: ProfitAdjustmentInnerProps['handleVacantOnPress'] = (index) => {
    set_vacant(index);
  };

  const buttons: ProfitAdjustmentInnerProps['buttons'] = ['NO', 'YES'];

  React.useEffect(() => {
    console.log("ProfitAdjustment Mount")
    return () => {console.log("ProfitAdjustment UnMount")}
  }, []);

  return (
    <ProfitAdjustmentView
      _arv={_arv}
      _asIs={_asIs}
      _vacant={_vacant}
      buttons={buttons} 
      handleOnChangeText={handleOnChangeText}
      handleOnPress={handleOnPress} 
      handleVacantOnPress={handleVacantOnPress}
    />
  );
}
export default React.memo(ProfitAdjustment);