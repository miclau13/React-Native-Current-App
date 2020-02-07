import { FieldAttributes, useFormikContext  } from 'formik';
import React from 'react';
import {
  TextInput as RNPTextInput,
  TextInputProps as RNPTextInputProps,
} from 'react-native-paper';

import useNativeField from '../useNativeField';

import NumberFormat from 'react-number-format';

export function useFieldToTextInputProps(propsOrFieldName: string | FieldAttributes<any>): RNPTextInputProps {
  const form = useFormikContext();
  const [field] = useNativeField(propsOrFieldName);
  const { multiple, onChange: onChangeText, ...inputProps  } = field;
  const disabled = form.isSubmitting;

  return { disabled, onChangeText, ...inputProps };
}

export type TextInputProps = RNPTextInputProps & FieldAttributes<any> & { name: string };

const PhoneNumberInput = (props: TextInputProps) => {
  const { countryCode, ...inputProps } = props;
  console.log("PhoneNumberInput inputProps", inputProps)
  // const [formattedValue, setFormattedValue] = React.useState(inputProps.value);
  const textInputProps = useFieldToTextInputProps(inputProps);
  console.log("PhoneNumberInput textInputProps", textInputProps)
  // const handleChange = React.useCallback(value => {
  //   console.log("PhoneNumberInput handleChange value", value)
  //   textInputProps.onChangeText(value);
  //   setValue({ value: value.formattedValue });
  // }, [value]);
  return (
    <NumberFormat 
      displayType={'text'}
      // format="+1 (###) ###-####" 
      // mask="_"
      // onValueChange={values => {
      //   console.log("PhoneNumberInput  onValueChange value : ", values)
      //   const {formattedValue, value} = values;
      //   // formattedValue = $2,223
      //   // value ie, 2223
      //   // this.setState({profit: formattedValue})
      //   setFormattedValue("1"+value)
      // }}
      renderText={value => {
        console.log("PhoneNumberInput  renderText value : ", value)
        return (
          <RNPTextInput
            {...textInputProps} 
            {...inputProps}
            // onChangeText={handleChange}
            value={value}
          />
        )
      }}
      value={inputProps.value}
    />
  )
  // return <RNPTextInput {...textInputProps} {...props} />;
};

export default PhoneNumberInput;
