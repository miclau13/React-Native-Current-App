import { MyRehabRequests_myRehabRequests } from '../../generated/MyRehabRequests';
import { primaryGreen, primaryRed, primaryYellow } from '../../styles/constants';

const LABELS = [
  { name: "Bad", labelColor: primaryRed, activeBarColor: primaryRed },
  { name: "Marginal", labelColor: primaryYellow, activeBarColor: primaryYellow },
  { name: "Good", labelColor: primaryGreen, activeBarColor: primaryGreen },
];

export const calculateRemodelingCost = (data: MyRehabRequests_myRehabRequests['rehabItemsPackage']['rehabItems'], taxRate = 0) => {
  const cost = (data || []).reduce((acc, item) => {
    const _cost = item.selected ? item.cost : 0;
    acc += _cost;
    return acc;
  }, 0);
  return cost;
};

export const findLabelAttributes = (value) => {
  const currentIndex = value < 0 ? 0 : value > 50 ? 2 : 1;
  const label = LABELS[currentIndex];
  return label;
};