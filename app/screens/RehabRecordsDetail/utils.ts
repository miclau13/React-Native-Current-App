export const getItemAttributes = (key, index = -1) => {
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
