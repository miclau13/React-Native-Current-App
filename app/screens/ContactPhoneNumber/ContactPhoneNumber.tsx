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
  handleOnChange: TextInputProps['onChange'];
  handleOnChangeText: TextInputProps['onChangeText'];
  handleOnKeyPress: TextInputProps['onKeyPress'];
  handleOnSelectionChange: TextInputProps['onSelectionChange'];
  _selection: TextInputProps['selection'];
};

// } else if (key === "contactPhoneNumber") {
//   const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
//   shape[key] = yup.string().matches(phoneRegExp, 'Phone number is not valid').required('This Field is Required');

const ContactPhoneNumber: NavigationStackScreenComponent<Params, ScreenProps> = (props) => {
  const { navigation } = props;

  const createRehabNoArvInput = navigation.getParam("createRehabNoArvInput", null);
  const createRehabInput = navigation.getParam("createRehabInput", null);
  const flow = navigation.getParam("flow", null);
  
  const [contactPhoneNumber, setContactPhoneNumber] = React.useState("+1 (___) ___-____");
  const [_selection, set_Selection] = React.useState({ start: 0, end: 0 });
  const [_key, set_Key] = React.useState("");

  const handleButtonOnPress: ContactPhoneNumberViewProps['handleButtonOnPress'] = () => {
  };
  const handleOnChange: ContactPhoneNumberViewProps['handleOnChange'] = (e) => {
    // console.log("ContactPhoneNumber handleOnChange e : ", e)
    // setContactPhoneNumber(value);
  };
  const handleOnChangeText: ContactPhoneNumberViewProps['handleOnChangeText'] = (value) => {
    console.log("ContactPhoneNumber handleOnChangeText value : ", value)
    setContactPhoneNumber(value);
  };
  const handleOnKeyPress: ContactPhoneNumberViewProps['handleOnKeyPress'] = (e) => {
    console.log("ContactPhoneNumber handleOnKeyPress e : ", e.nativeEvent);
    const { nativeEvent: { key } } = e;
    set_Key(key);
  };
  const handleOnSelectionChange: ContactPhoneNumberViewProps['handleOnSelectionChange'] = (e) => {
    console.log("ContactPhoneNumber handleOnSelectionChange e.nativeEvent : ", e.nativeEvent)
    console.log("ContactPhoneNumber handleOnSelectionChange _selection : ",_selection)
    console.log("ContactPhoneNumber handleOnSelectionChange _key : ",_key)
    const decreaseSelection = () => {
      set_Selection({ start: _selection.start - 1, end: _selection.end - 1 });
    };
    const increaseSelection = () => {
      set_Selection({ start: _selection.start + 1, end: _selection.end + 1 });
    };
    switch (_key) {
      case "Backspace":
        decreaseSelection();
        break;
      default:
        increaseSelection();
    };
  };

  return (
    <ContactPhoneNumberView 
      handleButtonOnPress={handleButtonOnPress}
      contactPhoneNumber={contactPhoneNumber}
      handleOnChange={handleOnChange}
      handleOnChangeText={handleOnChangeText}
      handleOnKeyPress={handleOnKeyPress}
      handleOnSelectionChange={handleOnSelectionChange}
      _selection={_selection}
    />
  );
}
export default React.memo(ContactPhoneNumber);