
import { isNil, isNumber, reduce, sortBy } from 'lodash';
import React from 'react';
import { TextStyle } from 'react-native';
import { ListItemProps } from 'react-native-elements'
import { NavigationStackScreenComponent } from "react-navigation-stack";

import RehabRecordsDetailView from './RehabRecordsDetailView';
import { LoadingComponent } from '../InitialLoading';
import { getItemAttributes } from './utils';
import { CalculateRemodelingCost } from '../../common/utils/Calculator';
import { MyRehabRequests_myRehabRequests } from '../../generated/MyRehabRequests';
import { RevisedRehabInfo } from '../PropertyInfo';

interface RehabRecordsDetail extends MyRehabRequests_myRehabRequests{
  contactPhoneNumber: string;
  postalCode: string;
};

type Params = {
  detail: RehabRecordsDetail;
  loading?: boolean;
  rehabId?: string;
  revisedRehabInfo?: RevisedRehabInfo;
  revisedRehabItemPackageId?: string;
};

type ScreenProps = {};

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
        result.push({ name, order, value: "" });
        for (const property in value) {
          if (value[property].length > 0) {
            for (let i = 0 ; i < value[property].length; i++) {
              const { name, order } = getItemAttributes(property, value[property][i].order);
              result.push({ name, order, category: "propertyDetails", value: value[property][i].size, style: { paddingLeft: 16 }, unit: " sq. ft." });
            }
          } else if (isNumber(value[property])) {
            const { name, order } = getItemAttributes(property, value[property]);
            result.push({ name, order, category: "propertyDetails", value: value[property], style: { paddingLeft: 16 }, unit: " linear ft." });
          };
        };
      } else if (key === "vacant") {
        result.push({ name, order, value: isNil(value) ? "NA" : value ? "Yes" : "No" });
      } else {
        result.push({ name, order, value: isNil(value) ? "NA" : value });
      }
    };
    if (key === "rehabItemsPackage") {
      const { arv, asIs } = detail;
      const remodellingCost = CalculateRemodelingCost(value?.rehabItems);
      const { name: nameForRemodelingCost, order: orderForRemodelingCost } = getItemAttributes("remodelingCost");
      result.push({ name: nameForRemodelingCost, order: orderForRemodelingCost, value: remodellingCost });
      const profit = arv - asIs - remodellingCost;
      let { name: nameForProfit, order: orderForProfit } = getItemAttributes("profit");
      result.push({ name: nameForProfit, order: orderForProfit, value: profit });
    };

    return result;
  }, []), ['order']), [detail]);

  const handlePropertyDetailsOnPress = React.useCallback<RehabRecordsDetailProps['handlePropertyDetailsOnPress']>(() => {
    setExpandPropertyDetails(!expandPropertyDetails);
  }, [expandPropertyDetails]);

  const bootstrapAsync = async () => {
    // For revise flow
    const { address, arv, asIs, contactPhoneNumber="+1 ", id, propertyDetails, postalCode, totalDebts, vacant, rehabItemsPackage: { id: rehabItemPackageId } } = detail;
    const revisedRehabInfo = {
      address,
      arv,
      asIs,
      contactPhoneNumber,
      propertyDetails,
      postalCode,
      totalDebts,
      vacant,
    };
    navigation.setParams({ 
      revisedRehabInfo,
      loading: false,
      rehabId: id,
      revisedRehabItemPackageId: rehabItemPackageId,
    });
  };

  React.useEffect(() => {
    bootstrapAsync();
    return () => {}
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