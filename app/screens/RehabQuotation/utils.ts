import { uniq } from 'lodash';
import { 
  MyRehabRequests_myRehabRequests, 
  MyRehabRequests_myRehabRequests_rehabItemsPackage_revisedRehabItems 
} from '../../generated/MyRehabRequests';

export const getItemAttributes = (key: string) => {
  switch (key) {
    case "totalCost": 
      return {
        name: "Total Cost: ",
        order: 0,
        prefix: '$'
      };
    case "numberOfItems": 
      return {
        name: "Number of Items: ",
        order: 1,
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
