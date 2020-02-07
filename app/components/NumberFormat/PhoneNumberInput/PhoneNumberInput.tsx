import React from 'react';
import { TextInput, TextInputProps } from 'react-native-paper';
import NumberFormat from 'react-number-format';

const PhoneNumberInput = (props: TextInputProps) => {
  return (
    // <NumberFormat 
    //   displayType={'text'}
    //   format="+1 (###) ###-####" 
    //   mask="_"
    //   renderText={value => {
    //     return (
    //       <TextInput
    //         {...props}
    //         value={value}
    //       />
    //     )
    //   }}
    //   value={props.value}
    // />
    <TextInput
      {...props}
    />
  )
};

export default PhoneNumberInput;