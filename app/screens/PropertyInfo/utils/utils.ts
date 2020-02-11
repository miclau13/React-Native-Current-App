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