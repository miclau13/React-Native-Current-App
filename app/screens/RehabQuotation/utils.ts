import { uniq } from 'lodash';
import { 
  MyRehabRequests_myRehabRequests, 
  MyRehabRequests_myRehabRequests_rehabItemsPackage_revisedRehabItems 
} from '../../generated/MyRehabRequests';

export const getItemAttributes = (key: string, order = 0) => {
  switch (key) {
    case "subTotal": 
      return {
        name: "Sub Total: ",
        order: order,
        prefix: '$'
      };
    case "salesTax": 
      return {
        name: "Sales tax: ",
        order: order,
        prefix: '$'
      };
    case "totalCost": 
      return {
        name: "Total Cost: ",
        order: order,
        prefix: '$'
      };
    case "numberOfItems": 
      return {
        name: "Number of Items: ",
        order: order,
      };
    default:
      return {
        name: "NA",
        order: -1,
      };
  };
};

export const getRehabItemAttributes = (item: MyRehabRequests_myRehabRequests_rehabItemsPackage_revisedRehabItems) => {
  return ({ name: item.name, value: item.cost });
};

export const getRehabItemCatergoriesMap = (items: MyRehabRequests_myRehabRequests['rehabItemsPackage']['revisedRehabItems']) => {
  const result = uniq(items.map(item => item.category)).reduce((_result, category) => {
    _result[category] = false;
    return _result;
  }, {});
  return result;
};
