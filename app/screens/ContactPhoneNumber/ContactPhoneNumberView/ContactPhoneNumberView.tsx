import React from 'react';
import { KeyboardAvoidingView, Platform, SafeAreaView, View } from 'react-native';
import { Button, Headline, HelperText } from 'react-native-paper';

import styles from './styles';
import { ContactPhoneNumberViewProps } from '../ContactPhoneNumber';
import PhoneNumberInput from '../../../components/PhoneNumberInput';

const ContactPhoneNumberView: React.ComponentType<ContactPhoneNumberViewProps> = (props) => {
  const { 
    contactPhoneNumber, 
    contactPhoneNumberIsValid,
    handleButtonOnPress,
    handleOnChangeText, 
  } = props;

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyBoardContainer}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.viewBox1}/>
        <Headline>{`Enter your phone number for us to contact you: `}</Headline>
        <View style={styles.viewBox1}/>
        <PhoneNumberInput
          autoFocus
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