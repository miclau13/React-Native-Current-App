import { useFormikContext } from 'formik';
import React from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { Button, Headline, TextInput } from 'react-native-paper';
import { NavigationStackScreenComponent } from "react-navigation-stack";

import styles from './styles';

type Params = {};

type ScreenProps = {};

const ZipCode: NavigationStackScreenComponent<Params, ScreenProps> = (props) => {
  const form = useFormikContext();
  const { handleChange, submitForm } = form;
  console.log("hi ZipCode")
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Headline>What's your project's Zip Code?</Headline>
      <TextInput
        keyboardType="number-pad"
        label="Zip Code"
        maxLength={5}
        mode="outlined"
        onChangeText={handleChange("zipCode")}
        textContentType="postalCode"
      />
      <Button 
        color={styles.nextButton.backgroundColor}
        mode="contained" 
        onPress={submitForm}
        style={styles.nextButtonContainer}
      >
        Next
      </Button>
    </KeyboardAvoidingView>
  );
}
export default React.memo(ZipCode);