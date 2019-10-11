import { FieldAttributes, useField, useFormikContext  } from 'formik';
import React from 'react';
import {
  HelperText as RNPHelperText,
  HelperTextProps as RNPHelperTextProps,
  TextInput as RNPTextInput,
  TextInputProps as RNPTextInputProps,
} from 'react-native-paper';

export function useNativeField(propsOrFieldName: string | FieldAttributes<any>) {
  const form = useFormikContext();
  const { handleBlur, handleChange } = form;
  const [field, meta] = useField(propsOrFieldName);
  const { name, onBlur, onChange, ...inputProps  } = field;
  const customField = { 
    ...inputProps,
    name,
    onChange: handleChange(name),
    onBlur: handleBlur(name),
  };
  return [customField, meta] as [typeof customField, typeof meta];
}

export function useFieldToTextInputProps(propsOrFieldName: string | FieldAttributes<any>): RNPTextInputProps {
  const form = useFormikContext();
  const [field] = useNativeField(propsOrFieldName);
  const { multiple, onChange: onChangeText, ...inputProps  } = field;
  const disabled = form.isSubmitting;

  return { disabled, onChangeText, ...inputProps };
}

export function useFieldToHelperTextProps(propsOrFieldName: string | FieldAttributes<any>): RNPHelperTextProps {
  const form = useFormikContext();
  const [, meta] = form.getFieldProps(propsOrFieldName);
  return { type: 'error', children: meta.error };
}

export type HelperTextProps = RNPHelperTextProps & FieldAttributes<any>;

export const HelperText = (props: HelperTextProps) => {
  const helperTextProps = useFieldToHelperTextProps(props);
  return <RNPHelperText {...helperTextProps} {...props} />;
};

export type TextInputProps = RNPTextInputProps & FieldAttributes<any> & { name: string };

export const TextInput = (props: TextInputProps) => {
  const textInputProps = useFieldToTextInputProps(props);
  return <RNPTextInput {...textInputProps} {...props} />;
}; 
