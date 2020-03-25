import { sortBy } from 'lodash';
import React from 'react';
import { TextStyle } from 'react-native';
import { ListItemProps } from 'react-native-elements'
import { NavigationStackScreenComponent } from "react-navigation-stack";

import RehabQuotationView from './RehabQuotationView';
import { LoadingComponent } from '../InitialLoading';
import { getItemAttributes, getRehabItemAttributes, getRehabItemCatergoriesMap } from './utils';
import { calculateRemodelingCost } from '../../common/utils/Calculator';
import { MyRehabRequests_myRehabRequests } from '../../generated/MyRehabRequests';

type Params = {
  detail: MyRehabRequests_myRehabRequests;
  loading?: boolean;
};

type ScreenProps = {};

export type RehabQuotationViewProps = {
  expandDetails: RehabQuotationState['expandDetails'];
  handleExpandOnPress(category: string): ListItemProps['onPress'];
  items: {
    name: string;
    order: number;
    value: string | number;
    bottomDivider?: ListItemProps['bottomDivider'];
    category?: string;
    prefix?: string;
    style?: TextStyle;
    subItemSize?: number;
    subTotal?: number;
    topDivider?: ListItemProps['topDivider'];
  }[];
};

export type RehabQuotationState = {
  expandDetails: { 
    [x: string]: boolean
  };
};

const RehabQuotation: NavigationStackScreenComponent<Params, ScreenProps> = (props) => {
  const { navigation } = props;
  const detail = navigation.getParam("detail", null);
  const loading = navigation.getParam("loading", false);

  const { revisedRehabItems } = detail.rehabItemsPackage;
  const [expandDetails, setExpandDetails] = React.useState(getRehabItemCatergoriesMap(revisedRehabItems));
  const _items = React.useMemo(() => {
    let result: RehabQuotationViewProps['items'] = [];
    let  categoriesOrderMap = {}, currentCategory = "", currentOrder = 0, previousOrder = 0, _subTotal = 0;
    revisedRehabItems.map(item => {
      if (currentCategory !== item.category) {
        currentOrder++;
        if (currentCategory) {
          categoriesOrderMap[currentCategory] = { 
            ...categoriesOrderMap[currentCategory], 
            subItemSize: currentOrder - previousOrder - 1,
            value: _subTotal,
          };
        };
        _subTotal = 0;
        currentCategory = item.category;
        previousOrder = currentOrder;
        categoriesOrderMap[currentCategory] = { ...categoriesOrderMap[currentCategory], order: currentOrder };
      };
      currentOrder++;
      _subTotal += item.cost;
      result.push({ ...getRehabItemAttributes(item), category: item.category, order: currentOrder, prefix: '$', style: { paddingLeft: 16 } });
    });
    categoriesOrderMap[currentCategory] = { 
      ...categoriesOrderMap[currentCategory], 
      subItemSize: currentOrder - previousOrder,
      value: _subTotal
    };
    for (let key in categoriesOrderMap) {
      result.push({ 
        name: key, 
        value: "", 
        order: categoriesOrderMap[key]['order'], 
        prefix: '$',
        subItemSize: categoriesOrderMap[key]['subItemSize'],
        subTotal: categoriesOrderMap[key]['value']
      })
    };

    // const numberOfItems = revisedRehabItems.length;
    const taxRate = detail?.rehabItemsPackage?.taxRate || 0;
    const subTotal = calculateRemodelingCost(revisedRehabItems);
    const salesTax = subTotal * taxRate;
    const totalCost = subTotal + salesTax;
    result.push({ ...getItemAttributes("subTotal"), value: subTotal, order: ++currentOrder, bottomDivider: true });
    result.push({ ...getItemAttributes("salesTax"), value: salesTax, order: ++currentOrder, bottomDivider: true });
    result.push({ ...getItemAttributes("totalCost"), value: totalCost, topDivider: true, bottomDivider: true, order: ++currentOrder, style: { fontWeight: 'bold' } });
    // result.push({ ...getItemAttributes("numberOfItems"), value: numberOfItems, order: ++currentOrder });
    return sortBy(result, ['order']);
  }, []);

  const handleExpandOnPress = React.useCallback<RehabQuotationViewProps['handleExpandOnPress']>(category => () => {
    setExpandDetails({ ...expandDetails, [category]: !expandDetails[category] });
  }, [expandDetails]);

  if (loading) {
    return (
      <LoadingComponent />
    )
  };

  return (
    <RehabQuotationView 
      expandDetails={expandDetails}
      handleExpandOnPress={handleExpandOnPress}
      items={_items}
    />
  )
};

export default React.memo(RehabQuotation);