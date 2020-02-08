import React from 'react';
import { TextInput, TextInputProps } from 'react-native-paper';
import NumberFormat from 'react-number-format';

export interface NumberInputProps extends TextInputProps {};

const NumberInput = (props: TextInputProps) => {
  const { value, ...inputProps } = props;
  return (
    <NumberFormat 
      alowNegative={false}
      isNumericString={true}
      displayType={'text'}
      renderText={_value => {
        return (
          <TextInput
            autoFocus
            keyboardType="number-pad"
            mode="outlined"
            value={_value}
            textContentType="none"
            { ...inputProps }
          />
        )
      }}
      value={value}
    />
  )
};

export default NumberInput;