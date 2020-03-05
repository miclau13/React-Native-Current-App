
import { isNil, isNumber, omit, reduce, sortBy } from 'lodash';
import React from 'react';
import { TextStyle } from 'react-native';
import { ListItemProps } from 'react-native-elements'
import { NavigationStackScreenComponent } from "react-navigation-stack";

import RehabRecordsDetailView from './RehabRecordsDetailView';
import { LoadingComponent } from '../InitialLoading';
import { getItemAttributes } from './utils';
import { calculateRemodelingCost } from '../../common/utils/Calculator';
import { MyRehabRequests_myRehabRequests } from '../../generated/MyRehabRequests';
import { RevisedRehabInfo } from '../PropertyInfo';

type Params = {
  detail: RehabRecordsDetail;
  loading?: boolean;
  rehabId?: string;
  rehabItemPackageId?: string;
  revisedRehabInfo?: RevisedRehabInfo;
};

type ScreenProps = {};

interface RehabRecordsDetail extends MyRehabRequests_myRehabRequests{
  contactPhoneNumber: string;
  postalCode: string;
};

export type RehabRecordsDetailProps = {
  expandPropertyDetails: RehabRecordsDetailState['expandPropertyDetails'];
  handlePropertyDetailsOnPress: ListItemProps['onPress'];
  items: {
    name: string;
    order: number;
    value: string | number;
    // TODO enum for below
    category?: string;
    style?: TextStyle;
    unit?: string;
    isRange?: boolean;
  }[];
};

export type RehabRecordsDetailState = {
  expandPropertyDetails: boolean;
  loading: boolean;
};

const RehabRecordsDetail: NavigationStackScreenComponent<Params, ScreenProps> = (props) => {
  const { navigation } = props;
  const detail = navigation.getParam("detail", null);

  const loading = navigation.getParam("loading", true);
  const [expandPropertyDetails, setExpandPropertyDetails] = React.useState<RehabRecordsDetailState['expandPropertyDetails']>(true);

  const items = React.useMemo(() => sortBy(reduce(detail, (result, value, key) => {
    const { name, order } = getItemAttributes(key);
    if (name) {
      if (key === "propertyDetails") {
        // result.push({ name, order, value: "" });
        // for (const property in value) {
        //   if (value[property].length > 0) {
        //     for (let i = 0 ; i < value[property].length; i++) {
        //       const { name, order } = getItemAttributes(property, value[property][i].order);
        //       result.push({ name, order, category: "propertyDetails", value: value[property][i].size, style: { paddingLeft: 16 }, unit: " sq. ft." });
        //     }
        //   } else if (isNumber(value[property])) {
        //     const { name, order } = getItemAttributes(property, value[property]);
        //     result.push({ name, order, category: "propertyDetails", value: value[property], style: { paddingLeft: 16 }, unit: " linear ft." });
        //   };
        // };
      } else if (key === "vacant") {
        result.push({ name, order, value: isNil(value) ? "NA" : value ? "Yes" : "No" });
      } else {
        result.push({ name, order, value: isNil(value) ? "NA" : value });
      }
    };
    if (key === "rehabItemsPackage") {
      const { arv, asIs } = detail;
      const isRevised = !!value?.revisedRehabItems;
      const remodelingCost = isRevised ? calculateRemodelingCost(value?.revisedRehabItems) : calculateRemodelingCost(value?.rehabItems);
      // const remodelingCost = calculateRemodelingCost(value?.rehabItems);
      let lowerLimitOfRemodelingCost = Math.ceil(remodelingCost * 0.7);
      let upperLimitOfRemodelingCost = Math.ceil(remodelingCost * 1.3);
      const { name: nameForRemodelingCost, order: orderForRemodelingCost } = getItemAttributes("remodelingCost");
      result.push({ isRange: !isRevised, name: isRevised ? "Fiximize Quotation" : nameForRemodelingCost, order: orderForRemodelingCost, value: isNil(remodelingCost) ? "NA" : remodelingCost, upperLimit: isNil(upperLimitOfRemodelingCost) ? "NA" : upperLimitOfRemodelingCost, lowerLimit: isNil(lowerLimitOfRemodelingCost) ? "NA" : lowerLimitOfRemodelingCost });
      const profit = arv - asIs - remodelingCost;
      let lowerLimitOfProfit = arv - asIs - upperLimitOfRemodelingCost;
      let upperLimitOfProfit = arv - asIs - lowerLimitOfRemodelingCost;
      let { name: nameForProfit, order: orderForProfit } = getItemAttributes("profit");
      result.push({ isRange: !isRevised, name: nameForProfit, order: orderForProfit, value: isNil(profit) ? "NA" : profit, upperLimit: isNil(upperLimitOfProfit) ? "NA" : upperLimitOfProfit, lowerLimit: isNil(lowerLimitOfProfit) ? "NA" : lowerLimitOfProfit });
    };

    return result;
  }, []), ['order']), [detail]);

  const handlePropertyDetailsOnPress = React.useCallback<RehabRecordsDetailProps['handlePropertyDetailsOnPress']>(() => {
    setExpandPropertyDetails(!expandPropertyDetails);
  }, [expandPropertyDetails]);

  const bootstrapAsync = async () => {
    // For revise flow
    const { address, arv, asIs, beds, contactPhoneNumber="+1 ", fullBaths, halfBaths, id, propertyDetails, postalCode, sqft, style, threeQuarterBaths, totalDebts, vacant, rehabItemsPackage: { id: rehabItemPackageId } } = detail;
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
      expandPropertyDetails={expandPropertyDetails}
      handlePropertyDetailsOnPress={handlePropertyDetailsOnPress}
      items={items}
    />
  )
};

export default React.memo(RehabRecordsDetail);