import React from 'react';
import { TextInput, TextInputProps } from 'react-native-paper';
import NumberFormat from 'react-number-format';

const PhoneNumberInput = (props: TextInputProps) => {
  return (
    // <NumberFormat 
    //   displayType={'text'}
    //   // format="+1 (###) ###-####" 
    //   // mask="_"
    //   prefix="+1 "
    //   renderText={value => {
    //     console.log("renderText value", value)
    //     return (
    //       <TextInput
    //         {...props}
    //         value={value}
    //       />
    //     )
    //   }}
    //   onValueChange={value => {
    //     console.log("onValueChange value", value)
    //   }}
    //   value={props.value}
    // />
    <TextInput
      {...props}
    />
  )
};

export default PhoneNumberInput;