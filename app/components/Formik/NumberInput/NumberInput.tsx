import { FieldAttributes, useFormikContext  } from 'formik';
import React from 'react';
import {
  TextInput as RNPTextInput,
  TextInputProps as RNPTextInputProps,
} from 'react-native-paper';

import useNativeField from '../useNativeField';

export function useFieldToTextInputProps(propsOrFieldName: string | FieldAttributes<any>): RNPTextInputProps {
  const form = useFormikContext();
  const [field] = useNativeField(propsOrFieldName);
  const { multiple, onChange: onChangeText, ...inputProps } = field;
  const disabled = form.isSubmitting;

  return { disabled, onChangeText, ...inputProps };
}

export type TextInputProps = RNPTextInputProps & FieldAttributes<any> & { name: string };

const NumberInput = (props: TextInputProps) => {
  // console.log("NumberInput props", props)
  const { onBlur, onChange, onFocus, onKeyDown, onMouseUp, type, value, ...inputProps } = props;
  console.log("NumberInput inputProps", inputProps)
  const textInputProps = useFieldToTextInputProps(inputProps);
  console.log("NumberInput textInputProps", textInputProps)
  return <RNPTextInput {...textInputProps} {...props} />;
}; 

export default NumberInput;
