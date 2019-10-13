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
  const { multiple, onChange: onChangeText, ...inputProps  } = field;
  const disabled = form.isSubmitting;

  return { disabled, onChangeText, ...inputProps };
}

export type TextInputProps = RNPTextInputProps & FieldAttributes<any> & { name: string };

const TextInput = (props: TextInputProps) => {
  const textInputProps = useFieldToTextInputProps(props);
  return <RNPTextInput {...textInputProps} {...props} />;
}; 

export default TextInput;
