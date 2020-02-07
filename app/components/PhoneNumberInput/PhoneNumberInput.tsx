import React from 'react';
import { TextInputProps } from 'react-native-paper';

import PhoneNumberInputWithNumberFormat from '../NumberFormat/PhoneNumberInput';

interface PhoneNumberInputProps extends TextInputProps {
  countryCode: "US",
};

// Support US only for now 
const PhoneNumberInput = (props: PhoneNumberInputProps) => {
  const { countryCode, ...inputProps } = props;

  return <PhoneNumberInputWithNumberFormat {...inputProps} />;
};

export default PhoneNumberInput;