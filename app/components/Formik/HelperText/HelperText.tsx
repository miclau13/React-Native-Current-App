import { FieldAttributes, useField  } from 'formik';
import React from 'react';
import {
  HelperText as RNPHelperText,
  HelperTextProps as RNPHelperTextProps,
} from 'react-native-paper';

export function useFieldToHelperTextProps(propsOrFieldName: string | FieldAttributes<any>): RNPHelperTextProps {
  const [, meta] = useField(propsOrFieldName);
  return { type: 'error', children: meta.error };
}

export type HelperTextProps = RNPHelperTextProps & FieldAttributes<any>;

const HelperText = (props: HelperTextProps) => {
  const helperTextProps = useFieldToHelperTextProps(props);
  return <RNPHelperText {...helperTextProps} {...props} />;
};

export default HelperText;

