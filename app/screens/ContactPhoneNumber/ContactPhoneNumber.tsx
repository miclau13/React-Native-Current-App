import { gql } from 'apollo-boost';
import React from 'react';
import { Keyboard } from 'react-native';
import { ButtonProps, TextInputProps } from 'react-native-paper';
import { NavigationStackScreenComponent } from "react-navigation-stack";

import { useQuery, useMutation } from '@apollo/react-hooks';

import ContactPhoneNumberView from './ContactPhoneNumberView';
import { checkIfFormatValid, checkIfEmailFormatValid, validateFormat } from './utils';
import { LoadingComponent } from '../InitialLoading';
import CheckEmailVerified, { CheckEmailVerifiedProps } from '../../components/CheckEmailVerified';
import { CreateRehabNoArvVariables } from '../../generated/CreateRehabNoArv';
import { Viewer } from '../../generated/Viewer';

const SEND_VERIFICATION_EMAIL = gql`
  mutation SendVerificationEmail {
    sendVerificationEmail
  }
`

const VIEWER = gql`
  query Viewer {
    viewer {
      id
      email
      emailVerified
    }
  }
`;

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
  handleOnChangeEmailText: TextInputProps['onChangeText'];
  _email: string;
  _emailIsValid: boolean;
};

const ContactPhoneNumber: NavigationStackScreenComponent<Params, ScreenProps> = (props) => {
  const { navigation } = props;
  const createRehabNoArvInput = navigation.getParam("createRehabNoArvInput", null);
  const rehabId = navigation.getParam("rehabId", null);
  const rehabItemPackageId = navigation.getParam("rehabItemPackageId", null);

  const { data: viewerQueryData, loading: viewerQueryLoading, refetch: viewerQueryRefetch } = useQuery<Viewer>(VIEWER);
  const [sendVerificationEmail, { loading: sendVerificationEmailMutationLoading }] = useMutation(SEND_VERIFICATION_EMAIL);
  const [contactPhoneNumber, setContactPhoneNumber] = React.useState((createRehabNoArvInput.contactPhoneNumber) || "+1 ");
  const [contactPhoneNumberIsValid, setContactPhoneNumberIsValid] = React.useState(true);
  const [_email, set_email] = React.useState(viewerQueryData?.viewer?.email || "");
  const [_emailIsValid, set_emailIsValid] = React.useState(true);
  const [modalVisible, setModalVisible] = React.useState(false);

  const moveToNextScreen = () => {
    const _createRehabNoArvInput = { ...createRehabNoArvInput, contactPhoneNumber };
    navigation.navigate("CreateRehabScreen", { rehabId, rehabItemPackageId, createRehabNoArvInput: _createRehabNoArvInput });
  };

  const handleButtonOnPress: ContactPhoneNumberViewProps['handleButtonOnPress'] = async () => {
    const valueIsValid = checkIfFormatValid(contactPhoneNumber);
    const valueEmailIsValid = checkIfEmailFormatValid(_email);
    if (!valueEmailIsValid) {
      set_emailIsValid(false);
    } else {
      set_emailIsValid(true);
    }
    if (!valueIsValid) {
      setContactPhoneNumberIsValid(false);
    } else {
      setContactPhoneNumberIsValid(true);
    }
    if (valueIsValid && valueEmailIsValid){
      Keyboard.dismiss();
      setContactPhoneNumberIsValid(true);
      set_emailIsValid(true);
      if (viewerQueryData?.viewer?.emailVerified) {
        // moveToNextScreen();
      } else {
        setModalVisible(true);
      };
    };
  };
  const handleOnChangeText: ContactPhoneNumberViewProps['handleOnChangeText'] = (value) => {
    const validValue = validateFormat(value);
    setContactPhoneNumber(validValue);
  };
  const handleOnChangeEmailText: ContactPhoneNumberViewProps['handleOnChangeEmailText'] = (value) => {
    // const validValue = validateFormat(value);
    set_email(value);
  };

  // For CheckEmailVerified
  const handleBackdropOnPress: CheckEmailVerifiedProps['handleBackdropOnPress'] = () => {
    setModalVisible(false);
  };
  const handleButtonOkOnPress: CheckEmailVerifiedProps['handleButtonOkOnPress'] = async () => {
    setModalVisible(false);
    moveToNextScreen();
  };
  const handleButtonVerifyOnPress: CheckEmailVerifiedProps['handleButtonVerifyOnPress'] = async () => {
    sendVerificationEmail();
    setModalVisible(false);
    moveToNextScreen();
  };

  if (viewerQueryLoading) {
    return (
      <LoadingComponent />
    );
  };

  return (
    <>
      <CheckEmailVerified
        handleBackdropOnPress={handleBackdropOnPress}
        handleButtonOkOnPress={handleButtonOkOnPress}
        handleButtonVerifyOnPress={handleButtonVerifyOnPress}
        loading={sendVerificationEmailMutationLoading}
        modalVisible={modalVisible}
      />
      <ContactPhoneNumberView 
        handleButtonOnPress={handleButtonOnPress}
        contactPhoneNumber={contactPhoneNumber}
        contactPhoneNumberIsValid={contactPhoneNumberIsValid}
        handleOnChangeText={handleOnChangeText}
        handleOnChangeEmailText={handleOnChangeEmailText}
        _email={_email}
        _emailIsValid={_emailIsValid}
      />
    </>
  );
}
export default React.memo(ContactPhoneNumber);