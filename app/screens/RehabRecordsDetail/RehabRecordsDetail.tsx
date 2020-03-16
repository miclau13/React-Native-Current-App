
import { isNil, isNumber, reduce, sortBy } from 'lodash';
import React from 'react';
import { TextStyle } from 'react-native';
import { ListItemProps } from 'react-native-elements'
import { NavigationStackScreenComponent } from "react-navigation-stack";

import RehabRecordsDetailView from './RehabRecordsDetailView';
import { LoadingComponent } from '../InitialLoading';
import { getItemAttributes, getPropertInfoNameList } from './utils';
import { calculateRemodelingCost } from '../../common/utils/Calculator';
import { MyRehabRequests_myRehabRequests } from '../../generated/MyRehabRequests';
import { RevisedRehabInfo } from '../PropertyInfo';

type Params = {
  detail: RehabRecordsDetail;
  loading?: boolean;
  rehabId?: string;
  rehabItemPackageId?: string;
  revisedRehabInfo?: RevisedRehabInfo;
  submitted?: MyRehabRequests_myRehabRequests['rehabItemsPackage']['submitted'];
};

type ScreenProps = {};

interface RehabRecordsDetail extends MyRehabRequests_myRehabRequests{
  contactPhoneNumber: string;
  postalCode: string;
};

export type RehabRecordsDetailProps = {
  expandPropertyInfo: RehabRecordsDetailState['expandPropertyInfo'];
  handlePropertyInfoOnPress: ListItemProps['onPress'];
  items: {
    name: string;
    order: number;
    value: string | number;
    category?: "propertyInfo";
    isRange?: boolean;
    lowerLimit?: number;
    prefix?: string;
    suffix?: string;
    style?: TextStyle;
    upperLimit?: number;
  }[];
};

export type RehabRecordsDetailState = {
  expandPropertyInfo: boolean;
  loading: boolean;
};

const RehabRecordsDetail: NavigationStackScreenComponent<Params, ScreenProps> = (props) => {
  const { navigation } = props;
  const detail = navigation.getParam("detail", null);

  const loading = navigation.getParam("loading", true);
  const [expandPropertyInfo, setExpandPropertyInfo] = React.useState<RehabRecordsDetailState['expandPropertyInfo']>(true);

  const items = React.useMemo(() => sortBy(reduce(detail, (result, value, key) => {
    const { name, order } = getItemAttributes(key);
    if (name) {
      if (key === "propertyDetails") {
        result.push({ name, order, value: "" });
        for (const element of getPropertInfoNameList()) {
          const { name, order } = getItemAttributes(element);
          result.push({ name, order, category: "propertyInfo", value: !value[element] ? 0 : value[element].length, style: { paddingLeft: 16 } });
        };
      } else if (key === "vacant") {
        result.push({ name, order, value: isNil(value) ? "NA" : value ? "Yes" : "No" });
      } else {
        result.push({ name, order, prefix: "$", value: isNil(value) ? "NA" : value });
      }
    };
    if (key === "rehabItemsPackage") {
      const { arv, asIs } = detail;
      const isRevised = !!value?.revisedRehabItems;
      const taxRate = value?.taxRate;
      const remodelingCost = isRevised ? calculateRemodelingCost(value?.revisedRehabItems, taxRate) : calculateRemodelingCost(value?.rehabItems, taxRate);
      let lowerLimitOfRemodelingCost = Math.ceil(remodelingCost * 0.7);
      let upperLimitOfRemodelingCost = Math.ceil(remodelingCost * 1.3);
      const { name: nameForRemodelingCost, order: orderForRemodelingCost } = getItemAttributes("remodelingCost");
      result.push({ isRange: !isRevised, name: isRevised ? "Fiximize Quotation" : nameForRemodelingCost, order: orderForRemodelingCost, prefix: "$", value: isNil(remodelingCost) ? "NA" : remodelingCost, upperLimit: isNil(upperLimitOfRemodelingCost) ? "NA" : upperLimitOfRemodelingCost, lowerLimit: isNil(lowerLimitOfRemodelingCost) ? "NA" : lowerLimitOfRemodelingCost });
      const profit = arv - asIs - remodelingCost;
      let lowerLimitOfProfit = arv - asIs - upperLimitOfRemodelingCost;
      let upperLimitOfProfit = arv - asIs - lowerLimitOfRemodelingCost;
      let { name: nameForProfit, order: orderForProfit } = getItemAttributes("profit");
      result.push({ isRange: !isRevised, name: nameForProfit, order: orderForProfit, prefix: "$", value: isNil(profit) ? "NA" : profit, upperLimit: isNil(upperLimitOfProfit) ? "NA" : upperLimitOfProfit, lowerLimit: isNil(lowerLimitOfProfit) ? "NA" : lowerLimitOfProfit });
    };

    return result;
  }, []), ['order']), [detail]);

  const handlePropertyInfoOnPress = React.useCallback<RehabRecordsDetailProps['handlePropertyInfoOnPress']>(() => {
    setExpandPropertyInfo(!expandPropertyInfo);
  }, [expandPropertyInfo]);

  const bootstrapAsync = async () => {
    // For revise flow
    const { address, arv, asIs, beds, contactPhoneNumber="+1 ", fullBaths, halfBaths, id, propertyDetails, postalCode, sqft, style, threeQuarterBaths, totalDebts, vacant, rehabItemsPackage: { id: rehabItemPackageId, submitted } } = detail;
    const revisedRehabInfo = {
      address,
      arv,
      asIs,
      beds,
      contactPhoneNumber,
      fullBaths, 
      halfBaths,
      propertyDetails,
      postalCode,
      sqft, 
      style, 
      threeQuarterBaths,
      totalDebts,
      vacant,
    };
    navigation.setParams({ 
      rehabItemPackageId,
      revisedRehabInfo,
      submitted,
      loading: false,
      rehabId: id,
    });
  };

  React.useEffect(() => {
    // console.log("RehabRecordsDetail useEffect bootstrapAsync ")
    bootstrapAsync();
    return () => {
      // console.log("RehabRecordsDetail useEffect bootstrapAsync ")
    }
  }, []);

  if (loading) {
    return (
      <LoadingComponent />
    )
  };

  return (
    <RehabRecordsDetailView 
      expandPropertyInfo={expandPropertyInfo}
      handlePropertyInfoOnPress={handlePropertyInfoOnPress}
      items={items}
    />
  )
};

export default React.memo(RehabRecordsDetail);