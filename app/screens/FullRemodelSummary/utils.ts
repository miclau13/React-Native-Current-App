import _ from 'lodash';

import { RehabItemCatergoriesMap } from '../CreateRehab/useCreateRehabState';


const rehabItemCatergoriesFieldsOrderMap = new Map([
  ["Kitchen", 0],
  ["Full Bath", 1],
  ["Half Bath", 2],
  ["Three Quarter Bath", 3],
  ["Flooring", 4],
  ["Interior Paint", 5],
  ["Paint - Walls", 5],
  ["Clean up", 6],
  ["Staging", 7],
])

export const getRehabItemCatergoriesFields = (map: RehabItemCatergoriesMap) => {
  const result = _.map(map, (value, key) => {
    return {
      name: key,
      order: rehabItemCatergoriesFieldsOrderMap.get(key),
      selected: value.selected,
    };
  })
  return _.sortBy(result, "order");;
};