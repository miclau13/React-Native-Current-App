import { FieldAttributes, useFormikContext  } from 'formik';
import React from 'react';
import {
  HelperText as RNPHelperText,
  HelperTextProps as RNPHelperTextProps,
} from 'react-native-paper';

export function useFieldToHelperTextProps(propsOrFieldName: string | FieldAttributes<any>): RNPHelperTextProps {
  const form = useFormikContext();
  const [, meta] = form.getFieldProps(propsOrFieldName);
  return { type: 'error', children: meta.error };
}

export type HelperTextProps = RNPHelperTextProps & FieldAttributes<any>;

const HelperText = (props: HelperTextProps) => {
  const helperTextProps = useFieldToHelperTextProps(props);
  return <RNPHelperText {...helperTextProps} {...props} />;
};

export default HelperText;

