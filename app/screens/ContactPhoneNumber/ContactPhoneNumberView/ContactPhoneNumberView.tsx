import React from 'react';
import { KeyboardAvoidingView, Platform, SafeAreaView, View } from 'react-native';
import { Button, Headline, HelperText, TextInput } from 'react-native-paper';

import styles from './styles';
import { ContactPhoneNumberViewProps } from '../ContactPhoneNumber';
import PhoneNumberInput from '../../../components/PhoneNumberInput';

const ContactPhoneNumberView: React.ComponentType<ContactPhoneNumberViewProps> = (props) => {
  const { 
    contactPhoneNumber, 
    contactPhoneNumberIsValid,
    handleButtonOnPress,
    handleOnChangeText,
    handleOnChangeEmailText,
    _email,
    _emailIsValid
  } = props;

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyBoardContainer}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.viewBox1}/>
        <Headline>{`We need to contact you by phone and email to schedule a free on-site estimate. `}</Headline>
        <View style={styles.viewBox1}/>
        <PhoneNumberInput
          // autoFocus
          countryCode="US"
          error={!contactPhoneNumberIsValid} 
          keyboardType="number-pad"
          label="Phone Number"
          maxLength={17}
          mode="outlined"
          onChangeText={handleOnChangeText}
          textContentType="telephoneNumber"
          value={contactPhoneNumber}
        />
        <HelperText           
          type="error"
          visible={!contactPhoneNumberIsValid} 
        >
          {`Invalid Phone Number. \nValid Phone Number : +1 XXX XXX XXXX`}
        </HelperText>
        <View style={styles.viewBox1}/>
        <TextInput
          // autoFocus
          error={!_emailIsValid} 
          keyboardType="email-address"
          label="Email"
          mode="outlined"
          onChangeText={handleOnChangeEmailText}
          textContentType="emailAddress"
          value={_email}
        />
        <HelperText           
          type="error"
          visible={!_emailIsValid} 
        >
          {`Invalid Email.`}
        </HelperText>
        <View style={styles.viewBox1}/>
        <Button
          mode="contained" 
          onPress={handleButtonOnPress}
          style={styles.buttonContainer}
        >
          Submit
        </Button>
        <View style={styles.viewBox3}/>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
export default React.memo(ContactPhoneNumberView);