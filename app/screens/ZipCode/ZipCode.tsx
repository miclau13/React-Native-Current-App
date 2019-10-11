import { useFormikContext, useField } from 'formik';
import React from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { TextInput as RNPTextInput, Button, Headline } from 'react-native-paper';
import { TextInput, HelperText, TextInputProps, useFieldToTextInputProps } from '../../components/Formik/TextInput';
import { NavigationStackScreenComponent } from "react-navigation-stack";

import styles from './styles';
import zipCodeList from './zipCodeList.json';
import { BathroomRemodelFormValues } from '../BathroomRemodel';

type Params = {};

type ScreenProps = {};

interface ZipCodeProps  {

}

const validate = (value: string) => {
  if (value.length === 5 && !zipCodeList.includes(value)) return 'Invalid Zip Code';
};

const ZipCodeInput = (props: TextInputProps) => {
  return <TextInput validate={validate} {...props} />;
};

const ZipCode: React.ComponentType<ZipCodeProps> = (props) => {
  const form = useFormikContext<BathroomRemodelFormValues>();
  const {  errors, submitForm, values } = form;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.viewBox1}/>
      <Headline>What's your project's Zip Code?</Headline>
      <View style={styles.viewBox1}/>
      <ZipCodeInput
        autoFocus
        error={errors && !!errors.zipCode} 
        keyboardType="number-pad"
        label="Zip Code"
        name="zipCode"
        maxLength={5}
        mode="outlined"
        textContentType="postalCode"
        validate={validate}
      />
      <HelperText name="zipCode" />
      <View style={styles.viewBox2}/>
      <Button 
        color={styles.nextButton.backgroundColor}
        mode="contained" 
        onPress={submitForm}
      >
        Next
      </Button>
      <View style={styles.viewBox3}/>
    </KeyboardAvoidingView>
  );
}
export default React.memo(ZipCode);