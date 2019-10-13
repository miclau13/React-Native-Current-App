import { useFormikContext, useField } from 'formik';
import React from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { Button, ButtonProps, Headline } from 'react-native-paper';
import { NavigationStackScreenComponent } from "react-navigation-stack";

import styles from './styles';
import zipCodeList from './zipCodeList.json';
import { BathroomRemodelFormValues } from '../BathroomRemodel';
import { TextInput, HelperText, TextInputProps } from '../../components/Formik/TextInput';

type Params = {};

type ScreenProps = {};

interface ZipCodeProps  {

}

const validate = (value: string) => {
  if (!zipCodeList.includes(value)) return 'Invalid Zip Code';
};

const ZipCodeInput = (props: TextInputProps) => {
  return <TextInput validate={validate} {...props} />;
};

const ZipCode: React.ComponentType<ZipCodeProps> = (props) => {
  console.log({props})
  const form = useFormikContext<BathroomRemodelFormValues>();
  console.log({form})
  const { errors } = form;

  const nextButtonOnPress: ButtonProps['onPress'] = (event) => {
    console.log({errors})
  };
  console.log("hi Zip Code")
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
        onPress={nextButtonOnPress}
        // disabled={errors && !!errors.zipCode}
      >
        Next
      </Button>
      <View style={styles.viewBox3}/>
    </KeyboardAvoidingView>
  );
}
export default React.memo(ZipCode);