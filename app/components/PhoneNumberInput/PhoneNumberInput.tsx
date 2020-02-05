import React from 'react';
// import NumberFormat from 'react-number-format';

import NumberInput, { TextInputProps } from '../Formik/NumberInput';

interface PhoneNumberInputProps extends TextInputProps {
  countryCode: "US",
};

// Support US only for now 
const PhoneNumberInput = (props: PhoneNumberInputProps) => {
  const { countryCode, ...inputProps } = props;

  return <NumberInput {...props} />;
};

export default PhoneNumberInput;