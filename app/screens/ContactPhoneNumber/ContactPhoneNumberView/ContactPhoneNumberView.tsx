import React from 'react';
import { KeyboardAvoidingView, SafeAreaView, View } from 'react-native';
import { Button, Headline, HelperText } from 'react-native-paper';

import styles from './styles';
import { ContactPhoneNumberViewProps } from '../ContactPhoneNumber';
import PhoneNumberInput from '../../../components/PhoneNumberInput';

const ContactPhoneNumberView: React.ComponentType<ContactPhoneNumberViewProps> = (props) => {
  const { 
    contactPhoneNumber, 
    handleButtonOnPress, 
    handleOnChange, 
    handleOnChangeText, 
    handleOnKeyPress,
    handleOnSelectionChange, 
    _selection 
  } = props;

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyBoardContainer}
        behavior={"padding"}
      >
        <View style={styles.viewBox1}/>
        <Headline>{`Enter your phone number for us to contact you: `}</Headline>
        <View style={styles.viewBox1}/>
        <PhoneNumberInput
          autoFocus
          countryCode="US"
          // error={false} 
          keyboardType="number-pad"
          label="Phone Number"
          mode="outlined"
          onChange={handleOnChange}
          onChangeText={handleOnChangeText}
          onKeyPress={handleOnKeyPress}
          onSelectionChange={handleOnSelectionChange}
          placeholder={contactPhoneNumber}
          selection={_selection}
          textContentType="telephoneNumber"
          value={contactPhoneNumber}
        />
        {/* <HelperText           
          type="error"
          // visible={true}
        >
          Error
        </HelperText> */}
        <View style={styles.viewBox1}/>
        <Button
          // disabled={!!!values[`${"contactPhoneNumber"}`]}
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