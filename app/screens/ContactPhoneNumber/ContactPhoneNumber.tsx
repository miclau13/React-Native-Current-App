import React from 'react';
import { ButtonProps, TextInputProps } from 'react-native-paper';
import { NavigationStackScreenComponent } from "react-navigation-stack";

import ContactPhoneNumberView from './ContactPhoneNumberView';
import { FiximizeFlow } from '../FiximizeQuestions/Autocomplete';
import { CreateRehabVariables } from '../../generated/CreateRehab';
import {CreateRehabNoArvVariables } from '../../generated/CreateRehabNoArv';

export interface Params {
  createRehabInput: CreateRehabVariables['input'];
  createRehabNoArvInput: CreateRehabNoArvVariables['input'];
  flow: FiximizeFlow;
};

type ScreenProps = {};

export interface ContactPhoneNumberViewProps {
  contactPhoneNumber: string;
  handleButtonOnPress: ButtonProps['onPress'];
  handleOnChangeText: TextInputProps['onChangeText'];
};

const checkIfPrefixIntlCodeExists = (value: string) => {
  // The input must contain intlCode = '+1 ' as prefix;
  if (value.length < 3) {
    return false;
  };
  return true;
};

const validateFormat = (value: string) => {
  const intlCode = "+1 ";
  const matchExtraOpenBracket = value.match(/^(\+1 )\($/);
  if (matchExtraOpenBracket) {
    const _value = intlCode;
    return _value;
  };

  const matchMissingClosingBracket = value.match(/^(\+1 )\((\d{4})$/);
  if (matchMissingClosingBracket) {
    const _value = [intlCode, '(', matchMissingClosingBracket[2].slice(0,3), ') ', matchMissingClosingBracket[2].slice(-1)].join('');
    return _value;
  };

  const matchMissingSpace = value.match(/^(\+1 )\((\d{3})\)(\d{1})$/);
  if (matchMissingSpace) {
    const _value = [intlCode, '(', matchMissingSpace[2], ') ', matchMissingSpace[3]].join('');
    return _value;
  };

  const matchMissingHyphen = value.match(/^(\+1 )\((\d{3})\) (\d{4})$/);
  if (matchMissingHyphen) {
    const _value = [intlCode, '(', matchMissingHyphen[2], ') ', matchMissingHyphen[3].slice(0,3), '-', matchMissingHyphen[3].slice(-1)].join('');
    return _value;
  };

  const matchValidFormat = value.match(/^(\+1 )(\d{3})(\d{3})(\d{4})$/);
  if (matchValidFormat) {
    const _value = [intlCode, '(', matchValidFormat[2], ') ', matchValidFormat[3], '-', matchValidFormat[4]].join('');
    return _value;
  };

  return value;
}

// } else if (key === "contactPhoneNumber") {
//   const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
//   shape[key] = yup.string().matches(phoneRegExp, 'Phone number is not valid').required('This Field is Required');

const ContactPhoneNumber: NavigationStackScreenComponent<Params, ScreenProps> = (props) => {
  const { navigation } = props;

  const createRehabNoArvInput = navigation.getParam("createRehabNoArvInput", null);
  const createRehabInput = navigation.getParam("createRehabInput", null);
  const flow = navigation.getParam("flow", null);
  const intlCode = "+1 ";
  
  const [contactPhoneNumber, setContactPhoneNumber] = React.useState(intlCode);
  const [_selection, set_Selection] = React.useState({ start: 0, end: 0 });
  const [_key, set_Key] = React.useState("");

  const handleButtonOnPress: ContactPhoneNumberViewProps['handleButtonOnPress'] = () => {
  };
  const handleOnChangeText: ContactPhoneNumberViewProps['handleOnChangeText'] = (value) => {
    const prefixIntlCode = checkIfPrefixIntlCodeExists(value);
    if (!prefixIntlCode) return;

    const validValue = validateFormat(value);
    setContactPhoneNumber(validValue);
  };

  return (
    <ContactPhoneNumberView 
      handleButtonOnPress={handleButtonOnPress}
      contactPhoneNumber={contactPhoneNumber}
      handleOnChangeText={handleOnChangeText}
    />
  );
}
export default React.memo(ContactPhoneNumber);