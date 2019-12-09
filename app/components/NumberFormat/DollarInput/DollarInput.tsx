import React from 'react';
import { TextInput, TextInputProps } from 'react-native-paper';

const DollarInput = (props: any) => {
  console.log("DollarInput props", props)
  return <TextInput {...props} onChangeText={props.onValueChange} />;
};

export default DollarInput;