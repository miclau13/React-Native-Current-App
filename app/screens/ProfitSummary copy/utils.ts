import _ from 'lodash';

import { ProfitSummaryFields } from './ProfitSummary';

const profitSummaryViewOnlyFieldsMap = new Map([
  ["arv", { name: "Est. After-Repair Value", order: "4" }],
  ["asIs", { name: "Est. After-Repair Value", order: "5" }],
  ["profit", { name: "Est. Profit", order: "2" }],
  ["remodellingCost", { name: "Remodeling Budget", order: "3" }],
  ["roi", { name: "Est. ROI", order: "1" }],
  ["totalDebts", { name: "Total Debts", order: "6" }],
  ["vacant", { name: "Vacant", order: "7" }],
]);

export const getValuesInProfitSummaryViewOnlyFieldsFormat = (profitSummaryViewFields: ProfitSummaryFields) => {
  if (_.isNil(profitSummaryViewFields)) return [];
  const { arv, asIs, remodellingCost } = profitSummaryViewFields;
  const upperRemodellingCost = remodellingCost * 1.6;
  const lowerRemodellingCost = remodellingCost * 0.6;
  const upperProfit = arv - asIs - lowerRemodellingCost;
  const lowerProfit = arv - asIs - upperRemodellingCost;
  const upperRoi = upperProfit / lowerRemodellingCost * 100;
  const lowerRoi = lowerProfit / upperRemodellingCost * 100;

  const getUpperLimit = (key: string) => {
    switch (key) {
      case "remodellingCost":
        return upperRemodellingCost;
      case "profit":
        return upperProfit;
      case "roi":
        return upperRoi;
    };
  };
  const getLowerLimit = (key: string) => {
    switch (key) {
      case "remodellingCost":
        return lowerRemodellingCost;
      case "profit":
        return lowerProfit;
      case "roi":
        return lowerRoi;
    };
  };

  const result = _.map(profitSummaryViewFields, (value, key) => {
    const isVacant = key == "vacant";
    const isRange = key == "profit" || key == "roi" || key == "remodellingCost";
    const noValue = isRange || isVacant;
    return {
      color: isVacant ? value ? '#43a048' : '#e53935' : null,
      icon: isVacant ? value ? "check" : "close" : null, 
      lowerLimit: isRange ? getLowerLimit(key) : null,
      name: profitSummaryViewOnlyFieldsMap.get(key).name, 
      order: profitSummaryViewOnlyFieldsMap.get(key).order,
      upperLimit: isRange ? getUpperLimit(key) : null,
      value: noValue ? null : value,
    }
  });
  return _.sortBy(result, "order");
};