import { useFormikContext } from 'formik';
import React from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { Button, Headline, HelperText, TextInput, TextInputProps } from 'react-native-paper';
import { NavigationStackScreenComponent } from "react-navigation-stack";

import styles from './styles';
import zipCodeList from './zipCodeList.json';
import { BathroomRemodelFormValues } from '../BathroomRemodel';

type Params = {};

type ScreenProps = {};

interface ZipCodeProps  {

}

const ZipCode: React.ComponentType<ZipCodeProps> = (props) => {
  const form = useFormikContext<BathroomRemodelFormValues>();
  const { handleChange, errors, setErrors, setFieldError, submitForm, values } = form;

  const validateZipCode = (value) => {
    console.log("validateZipCode  vlaue",value);
    if (!zipCodeList.includes(value)) {
      console.log("not included")
      return false;
    } 
    return true;
  };

  const handleOnChangeText: (value: string) => TextInputProps['onChangeText'] = (value: string ) => (input) => {
    handleChange(value)(input);
    if (input.length >= 5) {
      console.log("length >5")
      // const validZipCode = validateZipCode(input.toString());
      const validZipCode = validateZipCode(form.values.zipCode);
      if(!validZipCode) {
        console.log("hihi")
        setFieldError("zipCode", 'Invalid Zip Code');
      }
    }
  }

  console.log("hi ZipCode")
  console.log("errors", JSON.stringify(errors))
  console.log({values})

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.viewBox1}/>
      <Headline>What's your project's Zip Code?</Headline>
      <View style={styles.viewBox1}/>
      <TextInput
        autoFocus
        error={errors && !!errors.zipCode} 
        keyboardType="number-pad"
        label="Zip Code"
        maxLength={5}
        mode="outlined"
        onChangeText={handleOnChangeText("zipCode")}
        textContentType="postalCode"
      />
      <HelperText
        type="error"
        // visible={touched.zipCode}
      >
        {errors && errors.zipCode}
      </HelperText>
      <View style={styles.viewBox2}/>
      <Button 
        color={styles.nextButton.backgroundColor}
        mode="contained" 
        onPress={submitForm}
        style={styles.nextButtonContainer}
      >
        Next
      </Button>
      <View style={styles.viewBox3}/>
    </KeyboardAvoidingView>
  );
}
export default React.memo(ZipCode);