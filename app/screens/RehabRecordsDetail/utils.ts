export const getItemAttributes = (key, index = -1) => {
  switch (key) {
    case "address": 
      return {
        name: "Address: ",
        order: 0,
      };
    case "arv": 
      return {
        name: "Estimated After-Repair Value: ",
        order: 1,
      };
    case "asIs":
      return {
        name: "Estimated As-Is Value: ",
        order: 2,
      };
    case "remodelingCost":
      return {
        name: "Remodeling Budget: ",
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
        name: "Property Info: ",
        order: 7,
      };
    case "bedsInfo":
      return {
        name: `Beds: `,
        order: 10,
      };
    case "fullBathsInfo":
      return {
        name: `Full Baths: `,
        order: 11,
      };
    case "halfBathsInfo":      
      return {
        name: `Half Baths: `,
        order: 13,
      };
    case "threeQuarterBathsInfo":
      return {
        name: `3/4 Baths: `,
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

export const getPropertInfoNameList = () => [
  "bedsInfo", "fullBathsInfo", "halfBathsInfo", "threeQuarterBathsInfo"
]
