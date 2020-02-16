import _ from 'lodash';

import { PropertyInfoFields } from '../PropertyInfo';
import { eraseComma } from '../../../components/NumberInput/utils'; 
import { CreateRehabNoArvInput } from '../../../generated/globalTypes';

type PropertyDetailsBedsAndBaths = Omit<PropertyInfoFields, "sqft" |"style">

const getKitchenDefaultVaues = () => {
  const values = {
    kitchenCabinetUpperLength: 0,
    kitchenCabinetBaseLength: 0,
    kitchenCabinetIslandLength: 0,
  };
  return values;
};

const propertyDetailsMap = new Map([
  ["beds", { name: "bedsInfo", size: 132 }],
  ["fullBaths", { name: "fullBathsInfo", size: 60 }],
  ["halfBaths", { name: "halfBathsInfo", size: 40 }],
  ["threeQuarterBaths", { name: "threeQuarterBathsInfo", size: 20 }],
]);

const propertyInfoViewOnlyFieldsOrderMap = new Map([
  ["beds", "1"],
  ["fullBaths", "2"],
  ["halfBaths", "3"],
  ["sqft", "5"],
  ["style", "6"],
  ["threeQuarterBaths", "4"],
]);

const mapPropertyInfoToPropertyDetailsBedsAndBaths = (propertyInfo: PropertyDetailsBedsAndBaths) => {
  const _propertyInfo = _.pick(propertyInfo, Array.from(propertyDetailsMap.keys()));
  let propertyDetails: CreateRehabNoArvInput["propertyDetails"] = Object.create(Object.prototype);
  _.forEach(_propertyInfo, (value, key) => {
    const _value = +eraseComma(value);
    const obj = propertyDetailsMap.get(key);
    let arr = [];
    for(let i = 1; i < _value + 1; i++) {
      arr.push({ size: obj.size, order: i })
    };
    propertyDetails[obj.name] = arr;
  });
  propertyDetails = { ...propertyDetails, ...getKitchenDefaultVaues()};
  return propertyDetails;
}

export const getDefaultPropertyDetails = (propertyInfo: PropertyInfoFields) => {
  const propertyDetails = mapPropertyInfoToPropertyDetailsBedsAndBaths(propertyInfo);
  return propertyDetails;
};

export const getDefaultPropertyInfoFields = () => {
  const result = {
    beds: 0,
    fullBaths: 0,
    halfBaths: 0,
    sqft: 0,
    style: "NA",
    threeQuarterBaths: 0,
  }
  return result;
};

export const getDefaultRevisedPropertyInfoFields = () => {
  const _propertyDetails = mapPropertyInfoToPropertyDetailsBedsAndBaths(getDefaultPropertyInfoFields());
  const result = {
    address: "",
    arv: 0,
    asIs: 0,
    contactPhoneNumber: "+1 ",
    postalCode: "",
    totalDebts: 0,
    vacant: true,
    propertyDetails: _propertyDetails,
  }
  return result;
};

export const getPropertyInfoViewOnlyFieldsOrder = (name) => {
  return propertyInfoViewOnlyFieldsOrderMap.get(name);
};

export const getRequiredPropertyInfoFields = (propertyInfo) => {
  const result = _.pick(propertyInfo, Array.from(propertyInfoViewOnlyFieldsOrderMap.keys()));
  return result;
};

export const getValuesInPropertyInfoViewOnlyFieldsFormat = (object) => {
  if (_.isNil(object)) return;
  const result = _.transform(object, (_result, value, key) => {
    _result.push({ value, name: key, order: getPropertyInfoViewOnlyFieldsOrder(key) });
  }, []);
  return result;
};

export const mapPropertyDetailsToPropertyInfo = (object) => {
  const input = _.omit(object, ["kitchenCabinetBaseLength", "kitchenCabinetIslandLength", "kitchenCabinetUpperLength"]);
  const result = Object.keys(input).reduce((_result, item) => {
    switch (item) {
      case "bedsInfo":
        _result["beds"] = input["bedsInfo"].length;
        break;
      case "halfBathsInfo":
        _result["halfBaths"] = input["halfBathsInfo"].length;
        break;
      case "fullBathsInfo":
      _result["fullBaths"] = input["fullBathsInfo"].length;
        break;
      case "threeQuarterBathsInfo":
        _result["threeQuarterBaths"] = input["threeQuarterBathsInfo"].length;
        break;
    };
    return _result;
  }, {});
  return result;
};

// May be for futrue use
// export const getFiximizeQuestionsFormInitialValues = ({ propertyDataArr, requiredInput }) => {
//   let inputValues = {};
//   propertyDataArr.map(item => {
//     if (requiredInput.includes(item.name)) {
//       for (let i = 0 ; i < item.value; i++) {
//         inputValues[item.name] = {
//           ...inputValues[item.name],
//           [`${item.name}${i+1}`]: 
//             item.name === "beds" ? "132" : 
//             item.name === "fullBaths" ? "60" :
//             item.name === "threeQuarterBaths" ? "40" :
//             item.name === "halfBaths" ? "20" :
//             "0",
//         };
//       }
//     }
//   });
//   return inputValues;
// };