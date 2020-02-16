import React from 'react';
import { ButtonProps, TextInputProps } from 'react-native-paper';
import { NavigationStackScreenComponent } from "react-navigation-stack";

import ContactPhoneNumberView from './ContactPhoneNumberView';
import { checkIfFormatValid, validateFormat } from './utils';
import { CreateRehabNoArvVariables } from '../../generated/CreateRehabNoArv';

export interface Params {
  createRehabNoArvInput: CreateRehabNoArvVariables['input'];
  rehabId?: string;
  rehabItemPackageId?: string;
};

type ScreenProps = {};

export interface ContactPhoneNumberViewProps {
  contactPhoneNumber: string;
  contactPhoneNumberIsValid: boolean;
  handleButtonOnPress: ButtonProps['onPress'];
  handleOnChangeText: TextInputProps['onChangeText'];
};

const ContactPhoneNumber: NavigationStackScreenComponent<Params, ScreenProps> = (props) => {
  const { navigation } = props;
  const createRehabNoArvInput = navigation.getParam("createRehabNoArvInput", null);
  const rehabId = navigation.getParam("rehabId", null);
  const rehabItemPackageId = navigation.getParam("rehabItemPackageId", null);
  
  const [contactPhoneNumber, setContactPhoneNumber] = React.useState((createRehabNoArvInput.contactPhoneNumber) || "+1 ");
  const [contactPhoneNumberIsValid, setContactPhoneNumberIsValid] = React.useState(true);

  const handleButtonOnPress: ContactPhoneNumberViewProps['handleButtonOnPress'] = () => {
    const valueIsValid = checkIfFormatValid(contactPhoneNumber);
    if (!valueIsValid) {
      setContactPhoneNumberIsValid(false);
    } else {
      setContactPhoneNumberIsValid(true);
      const _createRehabNoArvInput = { ...createRehabNoArvInput, contactPhoneNumber };
      navigation.navigate("FullRemodelSummaryScreen", { rehabId, rehabItemPackageId, createRehabNoArvInput: _createRehabNoArvInput });
    }
  };
  const handleOnChangeText: ContactPhoneNumberViewProps['handleOnChangeText'] = (value) => {
    const validValue = validateFormat(value);
    setContactPhoneNumber(validValue);
  };

  return (
    <ContactPhoneNumberView 
      handleButtonOnPress={handleButtonOnPress}
      contactPhoneNumber={contactPhoneNumber}
      contactPhoneNumberIsValid={contactPhoneNumberIsValid}
      handleOnChangeText={handleOnChangeText}
    />
  );
}
export default React.memo(ContactPhoneNumber);