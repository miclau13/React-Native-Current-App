export const CheckIsQualified = (args: {
  arv: number;
  asIs: number;
  remodellingCost: number;
  totalDebts: number;
  vacant: boolean;
}) => {
  const { arv, asIs, remodellingCost, totalDebts, vacant } = args;

  let bannerMessagesArr = [];
  let isQualified = true;
  // First gate: 
  if (asIs + remodellingCost >= arv) {
    isQualified = false;
    bannerMessagesArr.push("- The sum of As-IS and Remodeling Cost is not smaller than Est. ARV!");
  };
  // Second gate:
  if (totalDebts + remodellingCost >= arv * 0.8 ) {
    isQualified = false;
    bannerMessagesArr.push("- The sum of Total Debts and Remodeling Cost is not smaller than 80% of Est. ARV!");
  };
  // Third gate:
  if (!vacant) {
    isQualified = false;
    bannerMessagesArr.push("- The property is not vacant!");
  };

  if (isQualified) {
    bannerMessagesArr.push("Qualified! Feel free to submit!");
  } else {
    bannerMessagesArr.unshift("Not Qualified due to these reasons: ");
    bannerMessagesArr.push("Please EDIT the values to retry.");
  };

  const bannerMessages = bannerMessagesArr.join("\n");

  return { bannerMessages, isQualified };
};