import React from 'react';
import { ListItemProps } from 'react-native-elements';
import { ButtonProps } from 'react-native-paper';
import { NavigationStackScreenComponent } from "react-navigation-stack";

import { getRehabItemCatergoriesFields } from './utils';
import FullRemodelSummaryView  from './FullRemodelSummaryView';
import { useCreateRehabState } from '../CreateRehab/useCreateRehabState';

export interface Params {
  flow?: "revise" | 1,
};

type ScreenProps = {};

type RehabItemCatergoriesFields = {
  name: string;
  order: number;
  selected: boolean;
};
export interface FullRemodelSummaryViewProps {
  fields: RehabItemCatergoriesFields[];
  handleCheckBoxOnPress(category: string): ListItemProps['checkBox']['onPress'];
  handleButtonOnPress: ButtonProps['onPress'];
  remodellingCost: number;
};

const FullRemodelSummary: NavigationStackScreenComponent<Params, ScreenProps> = (props) => {
  const { navigation } = props;

  const [state, dispatch] = useCreateRehabState();
  const { remodellingCost, rehabItemCatergoriesMap, taxRate } = state;
  const totalCost = remodellingCost * (1 + taxRate);
  const fields = React.useMemo(() => getRehabItemCatergoriesFields(rehabItemCatergoriesMap), [rehabItemCatergoriesMap]);
  const handleCheckBoxOnPress: FullRemodelSummaryViewProps['handleCheckBoxOnPress'] = category => () => {
    dispatch({ category, type: 'UPDATE_FULL_REMODEL_SUMMARY_FIELDS' });
  };
  const handleButtonOnPress = React.useCallback<FullRemodelSummaryViewProps['handleButtonOnPress']>(() => {
    navigation.navigate("ProfitSummaryScreen", { step: 'summary' });
  }, [state]);

  return (
    <FullRemodelSummaryView 
      fields={fields}
      handleCheckBoxOnPress={handleCheckBoxOnPress}
      handleButtonOnPress={handleButtonOnPress}
      remodellingCost={totalCost}
    />
  )
};

export default React.memo(FullRemodelSummary);