import { primaryGreen, primaryRed, primaryYellow } from '../../styles/constants';

const LABELS = [
  { name: "Bad", labelColor: primaryRed, activeBarColor: primaryRed },
  { name: "Marginal", labelColor: primaryYellow, activeBarColor: primaryYellow },
  { name: "Good", labelColor: primaryGreen, activeBarColor: primaryGreen },
];

export const CalculateRemodelingCost = (data) => {
  const cost = (data || []).reduce((acc, item) => {
    acc += item.cost;
    return acc;
  }, 0);
  return cost;
};

export const FindLabelAttributes = (value) => {
  const currentIndex = value < 0 ? 0 : value > 50 ? 2 : 1;
  const label = LABELS[currentIndex];
  return label;
};