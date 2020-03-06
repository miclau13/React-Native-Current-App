import React from 'react';
import { TextInput, TextInputProps } from 'react-native-paper';

import styles from './styles';

export interface NumberInputProps extends TextInputProps {};

const NumberInput = (props: NumberInputProps) => {
  return (
  <TextInput
    keyboardType="number-pad"
    mode="outlined"
    style={styles.input}
    textContentType="none"
    { ...props }
  />
  );
};

export default NumberInput;