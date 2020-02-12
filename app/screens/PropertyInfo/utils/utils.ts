import _ from 'lodash';

const getKitchenDefaultVaues = () => {
  const values = {
    kitchenCabinetUpperLength: 0,
    kitchenCabinetBaseLength: 0,
    kitchenCabinetIslandLength: 0,
  };
  return values;
};

export const getDefaultPropertyDetails = (props) => {
  const { beds, fullBaths, halfBaths, threeQuarterBaths} = props;
  const { kitchenCabinetBaseLength, kitchenCabinetIslandLength, kitchenCabinetUpperLength } = getKitchenDefaultVaues();
  const bedsInfo = _.map(beds, (value, key) => {
    return { size: +value, order: +key[key.length - 1]};
  });
  const fullBathsInfo = _.map(fullBaths, (value, key) => {
    return { size: +value, order: +key[key.length - 1]};
  });
  const halfBathsInfo = _.map(halfBaths, (value, key) => {
    return { size: +value, order: +key[key.length - 1]};
  });
  const threeQuarterBathsInfo = _.map(threeQuarterBaths, (value, key) => {
    return { size: +value, order: +key[key.length - 1]};
  });
  const propertyDetails = {
    bedsInfo,
    fullBathsInfo,
    halfBathsInfo,
    kitchenCabinetBaseLength,
    kitchenCabinetIslandLength,
    kitchenCabinetUpperLength,
    threeQuarterBathsInfo,
  }
  return propertyDetails;
};

export const getValuesFromEditMode = (props) => {
  const {
    bedsInfo,
    fullBathsInfo,
    halfBathsInfo,
    threeQuarterBathsInfo,
  } = props.propertyDetails;
  let result = [];
  if (bedsInfo) result.push({ name: 'beds', value: bedsInfo.length })
  if (fullBathsInfo) result.push({ name: 'fullBaths', value: fullBathsInfo.length})
  if (halfBathsInfo) result.push({ name: 'halfBaths', value: halfBathsInfo.length})
  if (threeQuarterBathsInfo) result.push({ name: 'threeQuarterBaths', value: threeQuarterBathsInfo.length})
  return result;
}