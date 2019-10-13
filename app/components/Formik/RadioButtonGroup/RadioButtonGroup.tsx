import { FieldAttributes, useField, useFormikContext  } from 'formik';
import React from 'react';
import {
  RadioButton as RNPRadioButton,
  RadioButtonGroupProps as RNPRadioButtonGroupProps,
} from 'react-native-paper';

function useNativeField(propsOrFieldName: string | FieldAttributes<any>) {
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

export function useFieldToRadioButtonGroupProps(propsOrFieldName: string | FieldAttributes<any>): RNPRadioButtonGroupProps {
  const form = useFormikContext();
  const [field] = useNativeField(propsOrFieldName);
  const { multiple, onChange: onValueChange, ...inputProps  } = field;

  return { onValueChange, ...inputProps };
}

export type RadioButtonGroupProps = RNPRadioButtonGroupProps & FieldAttributes<any> & { name: string };

const RadioButtonGroup = (props: RadioButtonGroupProps) => {
  const radioButtonGroupProps = useFieldToRadioButtonGroupProps(props);
  return <RNPRadioButton.Group {...radioButtonGroupProps} {...props} />;
}; 

export default RadioButtonGroup;
