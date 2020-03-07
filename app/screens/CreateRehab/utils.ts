import _ from 'lodash';

import { RehabItemCatergoriesMap } from './useCreateRehabState';
import { 
  MyRehabRequests_myRehabRequests,
} from '../../generated/MyRehabRequests';

export const getRehabItemCatergoriesMap = (items: MyRehabRequests_myRehabRequests['rehabItemsPackage']['rehabItems']) => {
  const result = items.reduce<RehabItemCatergoriesMap>((_result, item) => {
    if (!_result[item.category]) {
      _result[item.category] = {
        cost: item.cost,
        selected: item.selected,
      };
    } else {
      _result[item.category] = {
        cost: _result[item.category]['cost'] + item.cost,
        selected: item.selected,
      }; 
    }
    return _result;
  }, {});
  return result;
};
