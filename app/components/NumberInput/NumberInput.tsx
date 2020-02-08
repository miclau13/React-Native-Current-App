import React from 'react';
import { TextInput, TextInputProps } from 'react-native-paper';

export interface NumberInputProps extends TextInputProps {};

const NumberInput = (props: NumberInputProps) => {
  return (
  <TextInput
    autoFocus
    keyboardType="number-pad"
    mode="outlined"
    textContentType="none"
    { ...props }
  />
  );
};

export default NumberInput;