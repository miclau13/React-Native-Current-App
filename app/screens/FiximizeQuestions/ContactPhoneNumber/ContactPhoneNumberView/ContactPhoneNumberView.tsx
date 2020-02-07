import React from 'react';
import { KeyboardAvoidingView, Platform, SafeAreaView, View } from 'react-native';
import { Button, Headline } from 'react-native-paper';

import styles from './styles';
import { ContactPhoneNumberViewProps } from '../ContactPhoneNumber';
import HelperText from '../../../../components/Formik/HelperText';
import PhoneNumberInput from '../../../../components/Formik/PhoneNumberInput';

const ContactPhoneNumberView: React.ComponentType<ContactPhoneNumberViewProps> = (props) => {

  const { errors, handleButtonOnPress, values } = props;
  // console.log("ContactPhoneNumberView values[contactPhoneNumber]",values["contactPhoneNumber"])
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.viewBox1}/>
        <Headline>{`Enter your phone number for us to contact you: `}</Headline>
        <View style={styles.viewBox1}/>
        <PhoneNumberInput
          autoFocus
          countryCode="US"
          error={errors && errors["contactPhoneNumber"]} 
          keyboardType="number-pad"
          label="Phone Number"
          mode="outlined"
          name={"contactPhoneNumber"}
          // textContentType="none"
          value={values["contactPhoneNumber"]}
        />
        <HelperText name={"contactPhoneNumber"}/>
        <View style={styles.viewBox2}/>
        <Button
          disabled={!!!values[`${"contactPhoneNumber"}`]}
          mode="contained" 
          onPress={handleButtonOnPress}
          style={styles.buttonContainer}
        >
          Submit
        </Button>
        <View style={styles.viewBox2}/>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
export default React.memo(ContactPhoneNumberView);