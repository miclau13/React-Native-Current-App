
import { isNil, isNumber, reduce, sortBy } from 'lodash';
import React from 'react';
import { NavigationStackScreenComponent } from "react-navigation-stack";

import RehabRecordsDetailView from './RehabRecordsDetailView';
import { LoadingComponent } from '../InitialLoading';
import { CalculateRemodelingCost } from '../../common/utils/Calculator';

type Params = {
  // TODO type
  detail: any
};

type ScreenProps = {};

const getItemAttributes = (key, index = -1) => {
  switch (key) {
    case "address": 
      return {
        name: "Address: ",
        order: 0,
      };
    case "arv": 
      return {
        name: "Est. ARV: ",
        order: 1,
      };
    case "asIs":
      return {
        name: "AS-IS: ",
        order: 2,
      };
    case "remodelingCost":
      return {
        name: "Remodeling Cost: ",
        order: 3,
      };
    case "profit":
      return {
        name: "Profit: ",
        order: 4,
      };
    case "totalDebts":
      return {
        name: "Total Debts: ",
        order: 5,
      };
    case "vacant":
      return {
        name: "Vacant: ",
        order: 6,
      };
    case "propertyDetails":
      return {
        name: "Property Details: ",
        order: 7,
      };
    case "bedsInfo":
      return {
        name: `Bed #${index} Size: `,
        order: 10,
      };
    case "fullBathsInfo":
      return {
        name: `Full Bath #${index} Size: `,
        order: 11,
      };
    case "halfBathsInfo":      
      return {
        name: `Half Bath #${index} Size: `,
        order: 13,
      };
    case "threeQuarterBathsInfo":
      return {
        name: `3/4 Bath #${index} Size: `,
        order: 12,
      };
    case "kitchenCabinetBaseLength":
      return {
        name: "Kitchen Cabinet Base Length: ",
        order: 14,
      };
    case "kitchenCabinetIslandLength":
      return {
        name: "Kitchen Cabinet Island Length: ",
        order: 15,
      };
    case "kitchenCabinetUpperLength":
      return {
        name: "Kitchen Cabinet Upper Length: ",
        order: 16,
      };
    default:
      return {};
  };
};

const RehabRecordsDetail: NavigationStackScreenComponent<Params, ScreenProps> = (props) => {
  const { navigation } = props;
  const [loading, setLoading] = React.useState(false);
  const [expandPropertyDetails, setExpandPropertyDetails] = React.useState(true);
  const detail = navigation.getParam("detail", null);

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
      } else {
        console.log("key", key)
        console.log("value", value)
        result.push({ name, order, value: isNil(value) ? "NA" : value });
      }
    };
    if (key === "rehabItemsPackage") {
      const { arv, asIs } = detail;
      const remodellingCost = CalculateRemodelingCost(value.rehabItems);
      const { name: nameForRemodelingCost, order: orderForRemodelingCost } = getItemAttributes("remodelingCost");
      result.push({ name: nameForRemodelingCost, order: orderForRemodelingCost, value: remodellingCost });
      const profit = arv - asIs - remodellingCost;
      let { name: nameForProfit, order: orderForProfit } = getItemAttributes("profit");
      result.push({ name: nameForProfit, order: orderForProfit, value: profit });
    }

    return result;
  }, []), ['order']), [detail]);

  const handlePropertyDetailsOnPress = React.useCallback(() => {
    setExpandPropertyDetails(!expandPropertyDetails);
  }, [expandPropertyDetails]);
  // console.log("expandPropertyDetails", expandPropertyDetails);
  // console.log("detail", detail);

  React.useEffect(() => {
    console.log("RehabRecordsDetail Mount");
    return () => {
      console.log("RehabRecordsDetail UnMount");
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