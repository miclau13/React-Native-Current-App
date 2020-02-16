import { isString } from 'lodash';
// From Number Format
const thousandsGroupRegex = /(\d)(?=(\d{3})+(?!\d))/g;
const thousandSeparator = ",";

export const eraseComma = (value) => {
  if (isString(value))  return value.replace(/,/g, '');
  return value;
};

export const applyThousandSeparator = (value: string) => {
  const _value = eraseComma(value);
  let index = _value.search(/[1-9]/);
  index = index === -1 ? _value.length : index;
  return _value.substring(0, index) + _value.substring(index, _value.length).replace(thousandsGroupRegex, '$1' + thousandSeparator);
};

// The input should not start with 0
const checkIfValueStartWithZero = (value: string) => {
  return (value.startsWith("0") && value.length > 1);
};
const removeStartingZero = (value: string) => {
  let _value = value;
  const isValueStartWithZero = checkIfValueStartWithZero(_value);
  if (isValueStartWithZero) {
    _value = value.slice(1);
  };
  return _value;
};

export const validateFormat = (value: string) => {
  if (!value) {
    return "0";
  };

  let _value = value;
  _value = removeStartingZero(value);
  _value = applyThousandSeparator(_value);

  return _value;
};