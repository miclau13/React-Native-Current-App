import React from 'react';
import { ButtonProps, TextInputProps } from 'react-native-paper';
import { NavigationStackScreenComponent } from "react-navigation-stack";

import ContactPhoneNumberView from './ContactPhoneNumberView';
import { checkIfFormatValid, validateFormat } from './utils';
import { FiximizeFlow } from '../FiximizeQuestions/Autocomplete';
import { CreateRehabVariables } from '../../generated/CreateRehab';
import {CreateRehabNoArvVariables } from '../../generated/CreateRehabNoArv';

export interface Params {
  arvEstimate: number;
  createRehabInput: CreateRehabVariables['input'];
  createRehabNoArvInput: CreateRehabNoArvVariables['input'];
  flow: FiximizeFlow;
  postalCode?: string;
  propertyInfo?: object;
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

  const arvEstimate = navigation.getParam("arvEstimate", null);
  const createRehabNoArvInput = navigation.getParam("createRehabNoArvInput", null);
  const createRehabInput = navigation.getParam("createRehabInput", null);
  const flow = navigation.getParam("flow", null);
  const postalCode = navigation.getParam("postalCode", null);
  const propertyInfo = navigation.getParam("propertyInfo", {});

  console.log("ContactPhoneNumber arvEstimate,",arvEstimate)
  console.log("ContactPhoneNumber createRehabNoArvInput,",createRehabNoArvInput)
  console.log("ContactPhoneNumber createRehabInput,",createRehabInput)
  console.log("ContactPhoneNumber flow,",flow)
  console.log("ContactPhoneNumber postalCode,",postalCode)
  console.log("ContactPhoneNumber propertyInfo,",propertyInfo)
  
  const [contactPhoneNumber, setContactPhoneNumber] = React.useState("+1 ");
  const [contactPhoneNumberIsValid, setContactPhoneNumberIsValid] = React.useState(true);

  const handleButtonOnPress: ContactPhoneNumberViewProps['handleButtonOnPress'] = () => {
    const valueIsValid = checkIfFormatValid(contactPhoneNumber);
    if (!valueIsValid) {
      setContactPhoneNumberIsValid(false);
    } else {
      setContactPhoneNumberIsValid(true);
      navigation.navigate("FullRemodelSummaryScreen", { flow, createRehabInput, createRehabNoArvInput: { ...createRehabInput, ...propertyInfo, postalCode, arv: arvEstimate} });
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